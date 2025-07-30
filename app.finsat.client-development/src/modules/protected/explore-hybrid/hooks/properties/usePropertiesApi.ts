import client from '@core/api/client';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import { CartesianCoordinate } from '@hooks/useGeometry';
import axios, { AxiosResponse } from 'axios';
import osmtogeojson from 'osmtogeojson';

const usePropertiesApi = () => {
    const axiosClient = useAxiosClient();
    const buildingsEndpoint = apiEndpoints[ApiEndpoints.GET_BUILDINGS];
    const spatialFeaturesEndpoint = apiEndpoints[ApiEndpoints.SPATIAL_FEATURES];

    const fetchPropertiesFromInternalApi = (
        query: string
    ): Promise<AxiosResponse<Array<InternalApiPropertiesResponse>>> => {
        const auth = axiosClient<Array<InternalApiPropertiesResponse>>({
            apiConfig: {
                method: ApiMethod.GET,
                uri: `${buildingsEndpoint}?${query}`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const fetchSFPropertiesFromInternalApi = (
        query: string
    ): Promise<AxiosResponse<Array<InternalApiSFPropertiesResponse>>> => {
        const auth = axiosClient<Array<InternalApiSFPropertiesResponse>>({
            apiConfig: {
                method: ApiMethod.GET,
                uri: `${spatialFeaturesEndpoint}?${query}`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const createSFProperty = (name: string, type: any, position: CartesianCoordinate, footprints: Array<CartesianCoordinate>) => {
        const auth = axiosClient<InternalApiSFPropertiesResponse>({
            apiConfig: {
                method: ApiMethod.POST,
                uri: `${spatialFeaturesEndpoint}`,
                data: {
                    name,
                    type,
                    position,
                    footprints
                }
            },
            axiosClientConfig: client
        });

        return auth;
    }

    const fetchPropertiesFromOpenStreetMap = (
        overpassDataQuery: string
    ): Promise<Array<OsmApiPropertiesResponse>> => {
        const query = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassDataQuery)}`;

        return axios
            .get(query, { responseType: 'json' })
            .then(({ data }) => {
                let geojson = osmtogeojson(data);

                return geojson.features as unknown as Array<OsmApiPropertiesResponse>;
            })
            .catch(() => {
                return [];
            });
    };

    return {
        fetchSFPropertiesFromInternalApi,
        fetchPropertiesFromInternalApi,
        fetchPropertiesFromOpenStreetMap,
        createSFProperty
    };
};

export default usePropertiesApi;

export type InternalApiSFPropertiesResponse = {
    id: string;
    name: string;
    type: any;
    position: CartesianCoordinate;
};

export type InternalApiPropertiesResponse = {
    id: string;
    osmId: string;
    name: string;
    type: number;
    location: InternalApiPropertiesLocationResponse;
    schematics: InternalApiPropertiesSchematicResponse;
};

type InternalApiPropertiesLocationResponse = {
    streetName: string;
    streetNumber: string;
    zipCode: string;
    city: string;
    country: string;
    position: InternalApiPropertiesLocationPositionResponse;
};

type InternalApiPropertiesLocationPositionResponse = {
    latitude: number;
    longitude: number;
};

type InternalApiPropertiesSchematicResponse = {
    size: number;
};

export type OsmApiPropertiesResponse = {
    id: string;
    type: string;
    geometry: OsmApiPropertiesGeometryResponse;
    properties: OsmApiPropertiesTagsResponse;
};

type OsmApiPropertiesGeometryResponse = {
    type: string;
    coordinates: Array<Array<[number, number]>>;
};

type OsmApiPropertiesTagsResponse = {
    name?: string;
};
