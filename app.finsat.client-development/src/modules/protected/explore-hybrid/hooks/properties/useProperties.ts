import usePropertiesContext from '../../contexts/properties/usePropertiesContext';
import { PropertiesActions } from '../../state/properties/PropertiesActions';
import { Property } from '../../state/properties/PropertiesDefaults';
import usePropertiesApi, {
    InternalApiPropertiesResponse,
    OsmApiPropertiesResponse
} from './usePropertiesApi';
import useLoading from '@hooks/useLoading';
import useHybridPagination from '../hybrid-pagination/useHybridPagination';
import useError from '@hooks/useError';
import useLocationFrame from '../location-frame/useLocationFrame';
import useGeometry, { CartesianCoordinate } from '@hooks/useGeometry';
import { HybridPaginationType } from '../../state/hybrid-pagination/HybridPaginationDefaults';
import useGeocoder, { NominatimGeocoderApiResponse } from '@hooks/useGeocoder';
import { AxiosResponse } from 'axios';
import { formatPromiseResponse } from '@services/promiseUtils';
import useSFPinPoints from '../sf-pin-points/useSFPinPoints';

const useProperties = () => {
    const propertiesContext = usePropertiesContext();

    const { locationFrame } = useLocationFrame();
    const { pagination } = useHybridPagination();
    const { calculateFootprintArea, calculateFootprintCentroid } =
        useGeometry();
    const { searchByCoordinatesViaGoogle, searchByCoordinatesViaNominatim } =
        useGeocoder();
    const loading = useLoading();
    const error = useError();
    const { setSFPinPoints, addSFPinPoint } = useSFPinPoints();

    const propertiesApi = usePropertiesApi();

    const setProperties = (properties: Array<Property>): void => {
        propertiesContext.dispatch({
            type: PropertiesActions.SET_PROPERTIES,
            payload: properties
        });
    };

    const appendProperties = (properties: Array<Property>): void => {
        propertiesContext.dispatch({
            type: PropertiesActions.APPEND_PROPERTIES,
            payload: properties
        });
    };

    const fetchSpatialFeatures = (): void => {
        if (locationFrame === undefined) {
            return;
        }

        const {
            topLeft: { latitude: top, longitude: left },
            bottomRight: { latitude: bottom, longitude: right }
        } = locationFrame;

        const query = `BoundingBox.NorthEast.Latitude=${top}&BoundingBox.NorthEast.Longitude=${right}&BoundingBox.NorthWest.Latitude=${top}&BoundingBox.NorthWest.Longitude=${left}&BoundingBox.SouthWest.Latitude=${bottom}&BoundingBox.SouthWest.Longitude=${left}&BoundingBox.SouthEast.Latitude=${bottom}&BoundingBox.SouthEast.Longitude=${right}&BoundingBox.DetailLevel=2`;

        propertiesApi
            .fetchSFPropertiesFromInternalApi(query)
            .then(({ data }) => {
                const parsedData = data.map((feature) => ({
                    id: feature.id,
                    name: feature.name,
                    latitude: feature.position.latitude,
                    longitude: feature.position.longitude
                }));

                setSFPinPoints(parsedData);
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            });
    }

    const fetchFromInternalApi = async (
        pagination: HybridPaginationType
    ): Promise<Array<InternalApiPropertiesResponse>> => {
        if (locationFrame === undefined) {
            return [];
        }

        const {
            topLeft: { latitude: top, longitude: left },
            bottomRight: { latitude: bottom, longitude: right }
        } = locationFrame;
        const { currentPage: pageNumber, pageSize } = pagination;

        const query = `BoundingBox.NorthEast.Latitude=${top}&BoundingBox.NorthEast.Longitude=${right}&BoundingBox.NorthWest.Latitude=${top}&BoundingBox.NorthWest.Longitude=${left}&BoundingBox.SouthWest.Latitude=${bottom}&BoundingBox.SouthWest.Longitude=${left}&BoundingBox.SouthEast.Latitude=${bottom}&BoundingBox.SouthEast.Longitude=${right}&BoundingBox.DetailLevel=2&PageSize=${pageSize}&PageNumber=${pageNumber}`;

        return propertiesApi
            .fetchPropertiesFromInternalApi(query)
            .then(({ data }) => {
                return data;
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);

                return [];
            });
    };

    const fetchFromOsmApi = async (
        chunkSize: number = 10,
        excludeIds: Array<string>
    ): Promise<Array<OsmApiPropertiesResponse>> => {
        if (locationFrame === undefined) {
            return [];
        }

        const {
            topLeft: { latitude: top, longitude: left },
            bottomRight: { latitude: bottom, longitude: right }
        } = locationFrame;

        const overpassDataQuery = `
            [out:json];
            (
                way["building"](${bottom},${left},${top},${right});
                ${excludeIds.length > 0
                ? `
                        -
                        way(id: ${excludeIds.join(', ')});
                    `
                : ''
            }
            );
            out geom meta ${chunkSize};
        `;

        return propertiesApi.fetchPropertiesFromOpenStreetMap(
            overpassDataQuery
        );
    };

    const createSpatialFeature = (name: string, type: any, position: CartesianCoordinate, footprints: Array<CartesianCoordinate>): void => {
        loading.load();
        propertiesApi
            .createSFProperty(name, type, position, footprints)
            .then(({ data }) => {
                const parsedPinpoint = {
                    id: data.id,
                    name: data.name,
                    latitude: data.position.latitude,
                    longitude: data.position.longitude
                }

                addSFPinPoint(parsedPinpoint);
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    }

    const parseFromInternalApi = (
        properties: Array<InternalApiPropertiesResponse>
    ): Array<Property> => {
        return properties.map((property) => ({
            id: property.id,
            osmId: property.osmId,
            name: property.name,
            type: property.type,
            location: {
                streetName: property.location.streetName,
                streetNumber: property.location.streetNumber,
                zipCode: property.location.zipCode,
                city: property.location.city,
                country: property.location.country,
                position: {
                    latitude: property.location.position.latitude,
                    longitude: property.location.position.longitude
                }
            },
            schematics: {
                size: property.schematics.size
            }
        }));
    };

    const parseFromOsmApi = (
        properties: Array<OsmApiPropertiesResponse>
    ): Array<Property> => {
        const parsedProperties: Array<Property> = [];

        for (var property of properties) {
            const [longitude, latitude] = calculateFootprintCentroid(
                property.geometry.coordinates[0]
            );

            let osmId = property.id;

            if (osmId.startsWith('way/')) {
                osmId = osmId.split('/')[1];
            }

            const parsedProperty = {
                id: undefined,
                osmId: osmId,
                name: property.properties.name ?? `Building ${osmId}`,
                type: '',
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
                },
                schematics: {
                    size: calculateFootprintArea(
                        (property.geometry as any).coordinates[0]
                    )
                }
            };

            parsedProperties.push(parsedProperty);
        }

        return parsedProperties;
    };

    const addGoogleAddressesToOsmProperties = async (
        properties: Array<Property>
    ): Promise<Array<Property>> => {
        for (var property of properties) {
            const address = await searchByCoordinatesViaGoogle(
                property.location.position.latitude,
                property.location.position.longitude
            );

            if (address === null) {
                continue;
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
        }

        return properties;
    };

    const addNominatimAddressesToOsmProperties = async (
        properties: Array<Property>,
        fallbackToGoogle: boolean = true
    ): Promise<{
        data: Array<Property>;
        googleFallbackOsmIds: Array<string>;
    }> => {
        let googleFallbackOsmIds = [];

        for (var property of properties) {
            const { response: propertyAddress, error } =
                await formatPromiseResponse<
                    AxiosResponse<NominatimGeocoderApiResponse, any>
                >(
                    searchByCoordinatesViaNominatim(
                        property.location.position.latitude,
                        property.location.position.longitude
                    )
                );

            // const propertyAddress = await searchByCoordinatesViaNominatim(
            //     property.location.position.latitude,
            //     property.location.position.longitude
            // );

            if (propertyAddress === null || error != null) {
                if (!fallbackToGoogle) {
                    continue;
                }

                let fallbackProperty = await addGoogleAddressesToOsmProperties([
                    property
                ]);

                property = fallbackProperty[0];
                googleFallbackOsmIds.push(property.osmId);

                continue;
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
        }

        return { data: properties, googleFallbackOsmIds };
    };

    return {
        properties: propertiesContext.state,
        setProperties,
        appendProperties,
        fetchSpatialFeatures,
        createSpatialFeature,
        fetchFromInternalApi,
        fetchFromOsmApi,
        parseFromInternalApi,
        parseFromOsmApi,
        addGoogleAddressesToOsmProperties,
        addNominatimAddressesToOsmProperties
    };
};

export default useProperties;
