import usePropertyContext from '../../contexts/property/usePropertyContext';
import { PropertyActions } from '../../state/property/PropertyActions';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Routes, RoutingKeys } from '@routes/router.keys';
import useGeocoder, { NominatimGeocoderApiResponse } from '@hooks/useGeocoder';
import { formatPromiseResponse } from '@services/promiseUtils';
import { reorderNodes } from '@services/fetchOSMNodes';
import { getPropertyType } from '@services/osmUtils';
import useLoading from '@hooks/useLoading';
import { DetailedPropertyType } from '../../state/property/PropertyDefaults';
import usePropertyApi, {
    CachedProperty,
    DetailedPropertyResponse,
    OsmApiNodeElementResponse,
    OsmApiPropertyResponse,
    OsmApiWayElementResponse,
    SpatialFeatureResponse
} from './usePropertyApi';
import { BuildingOrientationType } from '@enums/BuildingOrientationType';
import { BuildingRoofShape } from '@enums/BuildingRoofShape';
import useInitialFootprint from '../initial-footprint/useInitialFootprint';
import useGeometry from '@hooks/useGeometry';

const useProperty = () => {
    const property = usePropertyContext();

    const navigate = useNavigate();
    const { calculateFootprintCentroid, calculateFootprintArea } =
        useGeometry();
    const propertyApi = usePropertyApi();

    const { load, loaded } = useLoading();
    const { searchByCoordinatesViaNominatim, searchByCoordinatesViaGoogle } =
        useGeocoder();
    const { setInitialFootprint } = useInitialFootprint();

    const getPropertyPropsFromId = (id: string): [PropertyTypePrefix, string] => {
        const prefix = id.split('-')[0];

        switch (prefix) {
            case 'SFP':
                return [PropertyTypePrefix.SPATIAL_FEATURE, id.split('-').slice(1).join('-')];
            case 'BP':
                return [PropertyTypePrefix.BUILDING, id.split('-').slice(1).join('-')];
            default:
                return [PropertyTypePrefix.INVALID, id];
        }
    }

    const fetchSpatialFeatureProperty = async (id: string): Promise<void> => {
        load();

        const { response, error } = await formatPromiseResponse<
            AxiosResponse<SpatialFeatureResponse, any>
        >(propertyApi.fetchSpatialFeature(id));

        if (error) {
            navigate(RoutingKeys[Routes.EXPLORE]);
        }

        const parsedProperty = parseSpatialFeature(response!.data);

        const parsedFootprint = response!.data.footprint.map(
            ({ latitude, longitude }): [number, number] => [latitude, longitude]
        );

        setInitialFootprint(parsedFootprint);

        property.dispatch({
            type: PropertyActions.SET_PROPERTY,
            payload: parsedProperty
        });
    }

    const fetchProperty = async (id: string): Promise<void> => {
        load();

        const { response: internalApiResponse, error: internalApiError } =
            await formatPromiseResponse<
                AxiosResponse<DetailedPropertyResponse, any>
            >(propertyApi.fetchPropertyFromInternalApi(id));

        const { response: osmApiResponse, error: osmApiError } =
            await formatPromiseResponse<
                AxiosResponse<OsmApiPropertyResponse, any>
            >(propertyApi.fetchPropertyFromOsmApi(id));

        if (osmApiError || osmApiResponse?.data.elements.length === 0) {
            navigate(RoutingKeys[Routes.EXPLORE]);
        }

        let parsedProperty = parseFromOsmApi(osmApiResponse!.data);

        if (internalApiError === null) {
            const parsedInternalApi = parseFromInternalApi(
                internalApiResponse!.data
            );

            parsedProperty.id = parsedInternalApi.id;
            parsedProperty.location = parsedInternalApi.location;
        } else {
            parsedProperty = await addNominatimAddressesToOsmProperty(
                parsedProperty,
                false
            );
        }

        if (osmApiResponse && osmApiResponse?.data.elements.length > 0) {
            let [building, ...footprint] = osmApiResponse?.data.elements;

            let footprintNodes = footprint.filter(
                (footprintData) => footprintData.type === 'node'
            );

            const { nodes } = building as unknown as OsmApiWayElementResponse;

            const orderedFootprints = getOrderedFootprint(
                nodes,
                footprintNodes
            );

            // addFootprint('shape', orderedFootprints);
            setInitialFootprint(orderedFootprints);
        }

        // cacheProperty({
        //     osmId: parsedProperty.osmId,
        //     name: parsedProperty.name,
        //     location: parsedProperty.location,
        //     schematics: parsedProperty.schematic
        // }); // TODO

        property.dispatch({
            type: PropertyActions.SET_PROPERTY,
            payload: parsedProperty!
        });

        loaded();
    };

    const parseSpatialFeature = (property: SpatialFeatureResponse): DetailedPropertyType => {
        return {
            id: property.id,
            osmId: '',
            location: property.location,
            name: '',
            type: 0
        }
    }

    const parseFromInternalApi = (
        property: DetailedPropertyResponse
    ): DetailedPropertyType => {
        const { id, osmId, name, type, location } = property;

        const { streetName, streetNumber, zipCode, city, country, position } =
            location;
        const { latitude, longitude } = position;

        return {
            id,
            osmId,
            name,
            type,
            location: {
                streetName,
                streetNumber,
                zipCode,
                city,
                country,
                position: {
                    latitude,
                    longitude
                }
            }
        };
    };

    const parseFromOsmApi = (
        property: OsmApiPropertyResponse
    ): DetailedPropertyType => {
        const { elements } = property;

        let [building, ...footprint] = elements;

        let footprintNodes = footprint.filter(
            (footprintData) => footprintData.type === 'node'
        );

        const { tags } = building as unknown as OsmApiWayElementResponse;

        const parsedFootprint = footprintNodes.map(
            ({ lat, lon }): [number, number] => [lat, lon]
        );

        const osmId = building.id.toString();
        const type = getPropertyType(tags);
        const [latitude, longitude] =
            calculateFootprintCentroid(parsedFootprint);

        const name = tags['name'] || `Building ${osmId}`;

        return {
            id: undefined,
            osmId,
            name,
            type,
            location: {
                streetName: '',
                streetNumber: '',
                zipCode: '',
                city: '',
                country: '',
                position: {
                    latitude,
                    longitude
                }
            }
        };
    };

    const addNominatimAddressesToOsmProperty = async (
        property: DetailedPropertyType,
        fallbackToGoogle: boolean = true
    ): Promise<DetailedPropertyType> => {
        const { response: propertyAddress, error } =
            await formatPromiseResponse<
                AxiosResponse<NominatimGeocoderApiResponse, any>
            >(
                searchByCoordinatesViaNominatim(
                    property.location.position.latitude,
                    property.location.position.longitude
                )
            );

        if (propertyAddress === null || error != null) {
            if (!fallbackToGoogle) {
                return property;
            }

            property = await addGoogleAddressesToOsmProperties(property);

            return property;
        }

        const { address, name } = propertyAddress.data;

        if (name !== undefined && name !== null && name !== '') {
            property.name = name;
        }

        property.location.streetName = address.road || '';
        property.location.streetNumber = address.house_number || '';
        property.location.zipCode = address.postcode || '';
        property.location.city = address.city || '';
        property.location.country = address.country || '';

        return property;
    };

    const addGoogleAddressesToOsmProperties = async (
        property: DetailedPropertyType
    ): Promise<DetailedPropertyType> => {
        const address = await searchByCoordinatesViaGoogle(
            property.location.position.latitude,
            property.location.position.longitude
        );

        if (address === null) {
            return property;
        }

        const { results } = address.data;

        const addressParts: any = {
            streetName: '',
            streetNumber: '',
            zipCode: '',
            city: '',
            country: ''
        };

        const typesMap = {
            streetName: 'route',
            streetNumber: 'street_number',
            zipCode: 'postal_code',
            city: 'locality',
            country: 'country'
        };

        for (const result of results) {
            const { address_components } = result;

            for (const [part, type] of Object.entries(typesMap)) {
                if (!addressParts[part]) {
                    const component = address_components.find((c) =>
                        c.types.includes(type)
                    );

                    if (component) {
                        addressParts[part] = component.long_name;
                    }
                }
            }
        }

        property.location.streetName = addressParts.streetName;
        property.location.streetNumber = addressParts.streetNumber;
        property.location.zipCode = addressParts.zipCode;
        property.location.city = addressParts.city;
        property.location.country = addressParts.country;

        return property;
    };

    const getOrderedFootprint = (
        nodes: Array<number>,
        footprintNodes: Array<OsmApiNodeElementResponse>
    ): Array<[number, number]> => {
        const resolvedNodes = [];

        for (const node of nodes) {
            const { lat, lon } = footprintNodes.find(
                (element) => element.id === node
            )!;

            resolvedNodes.push({ id: node, lat, lon });
        }

        const ordered = reorderNodes(nodes, resolvedNodes);
        const orderedFootprints: Array<[number, number]> = [];

        for (const orderedNodeId of ordered) {
            const { lat, lon } = footprintNodes.find(
                (element: any) => element.id === orderedNodeId.id
            )!;

            orderedFootprints.push([lat, lon]);
        }

        return orderedFootprints;
    };

    const cacheProperty = (property: CachedProperty): void => {
        propertyApi.cacheProperty(property);
    };

    return {
        property: property.state,
        getPropertyPropsFromId,
        fetchSpatialFeatureProperty,
        fetchProperty,
        addNominatimAddressesToOsmProperty,
        addGoogleAddressesToOsmProperties
    };
};

export enum PropertyTypePrefix {
    INVALID = 0,
    BUILDING,
    SPATIAL_FEATURE
}

export default useProperty;
