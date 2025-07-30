import axios from 'axios';
import osmtogeojson from 'osmtogeojson';
import useProperties from '../properties/useProperties';
import useHybridPagination from '../hybrid-pagination/useHybridPagination';
import useGeometry from '@hooks/useGeometry';
import { HybridPaginationType } from '../../state/hybrid-pagination/HybridPaginationDefaults';
import { Property } from '../../state/properties/PropertiesDefaults';
import useLocationFrame from '../location-frame/useLocationFrame';
import { PinPoint } from '../../state/pin-points/PinPointsDefaults';
import useLoading from '@hooks/useLoading';
import useHybridSolutionApi, { CachedProperty } from './useHybridSolutionApi';
import useWarning from '@hooks/useWarning';
import usePropertiesLookupLimit from './usePropertiesLookupLimit';

const useHybridSolution = () => {
    const hybridSolutionApi = useHybridSolutionApi();

    const {
        properties,
        setProperties,
        appendProperties,
        parseFromInternalApi,
        parseFromOsmApi,
        addGoogleAddressesToOsmProperties,
        addNominatimAddressesToOsmProperties,
        fetchFromInternalApi,
        fetchFromOsmApi
    } = useProperties();
    const { pagination, setPagination } = useHybridPagination();
    const { calculateFootprintCentroid, haversineDistanceMeters } =
        useGeometry();
    const { locationFrame } = useLocationFrame();
    const { load, loaded } = useLoading();
    const { setWarningMessage } = useWarning();
    const { setLookupLimit } = usePropertiesLookupLimit();

    const getInitialPaginationAndPoints = async (): Promise<
        [HybridPaginationType, Array<PinPoint>]
    > => {
        if (locationFrame === undefined) {
            return [pagination, []];
        }

        const {
            topLeft: { latitude: top, longitude: left },
            bottomRight: { latitude: bottom, longitude: right }
        } = locationFrame;

        const distance = haversineDistanceMeters(
            locationFrame.topLeft,
            locationFrame.bottomRight
        );

        if (distance >= 2000) {
            setWarningMessage('Too high to fetch buildings!');
            return [pagination, []];
        }

        const overpassDataQuery = `
            [out:json];
            (
                way["building"](${bottom},${left},${top},${right});
            );
            out body;
            >;
            out skel qt;
        `;

        const query = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassDataQuery)}`;

        try {
            const { data } = await axios.get(query, { responseType: 'json' });
            const geojson = osmtogeojson(data);

            const propertiesLocation = geojson.features.map((feature: any) => {
                let osmId = feature.id;

                if (osmId.startsWith('way/')) {
                    osmId = osmId.split('/')[1];
                }

                const [longitude, latitude] = calculateFootprintCentroid(
                    feature.geometry.coordinates[0]
                );

                return {
                    id: osmId,
                    name: feature.properties.name || `Building ${osmId}`,
                    latitude,
                    longitude
                };
            });

            const totalCount = geojson.features.length;
            const pageSize = 10;
            const currentPage = 1;
            const totalPages = Math.ceil(totalCount / pageSize);
            const hasNext = currentPage < totalPages;
            const hasPrevious = currentPage !== 1;
            const useInternalApi = true;

            const pagination: HybridPaginationType = {
                totalCount,
                pageSize,
                currentPage,
                totalPages,
                hasNext,
                hasPrevious,
                useInternalApi
            };

            return [pagination, propertiesLocation];
        } catch (error) {
            throw new Error('Failed to fetch pagination data');
        }
    };

    const hybridModelHandler = async (
        pagination: HybridPaginationType
    ): Promise<void> => {
        let leftovers = pagination.pageSize;

        let data: Array<Property> = [];

        if (pagination.useInternalApi) {
            const internalApiData = await fetchFromInternalApi(pagination);

            const parsedInternalApiData = parseFromInternalApi(internalApiData);

            data.push(...parsedInternalApiData);

            leftovers -= internalApiData.length;
        }

        if (leftovers !== 0) {
            const asd = properties
                .filter(
                    (property) =>
                        property.osmId !== undefined && property.osmId !== ''
                )
                .map((property) => property.osmId);

            const excludeIds = data
                .filter(
                    (property) =>
                        property.osmId !== undefined && property.osmId !== ''
                )
                .map((property) => property.osmId);

            const osmApiData = await fetchFromOsmApi(leftovers, [
                ...excludeIds,
                ...asd
            ]);

            const parsedOsmApiData = parseFromOsmApi(osmApiData);

            // const { data: lookup } = await registerBuildingLookup([]);

            // if (lookup.hasReachedLimit) {
            //     setLookupLimit();
            //     setWarningMessage('You have reached the limit!');
            // } // ACTIVE THIS

            const { data: completeParsedOsmApiData, googleFallbackOsmIds } =
                await addNominatimAddressesToOsmProperties(
                    parsedOsmApiData,
                    false // REPLACE WITH TRUE
                );

            data.push(...completeParsedOsmApiData);

            await registerBuildingLookup(googleFallbackOsmIds);
        }

        const totalCount = pagination.totalCount;
        const pageSize = pagination.pageSize;
        const currentPage = pagination.currentPage;
        const totalPages = pagination.totalPages;
        const hasNext = currentPage < totalPages;
        const hasPrevious = currentPage !== 1;
        const useInternalApi = !(leftovers > 0);

        let updatedPagination = {
            totalCount,
            pageSize,
            currentPage,
            totalPages,
            hasNext,
            hasPrevious,
            useInternalApi
        };

        setPagination(updatedPagination);

        const propertiesToCache = data
            .filter((property) => property.id === undefined)
            .map((property) => ({
                osmId: property.osmId,
                name: property.name,
                location: property.location,
                schematics: property.schematics
            }));

        cacheProperties(propertiesToCache);

        // sort data by distance

        if (updatedPagination.currentPage === 1) {
            setProperties(data);
        } else {
            appendProperties(data);
        }
    };

    const cacheProperties = (properties: Array<CachedProperty>): void => {
        hybridSolutionApi.cacheProperties(properties);
    };

    const registerBuildingLookup = (osmIds: Array<string>) => {
        return hybridSolutionApi.registerBuildingLookup(osmIds);
    };

    return {
        getInitialPaginationAndPoints,
        hybridModelHandler
    };
};

export default useHybridSolution;
