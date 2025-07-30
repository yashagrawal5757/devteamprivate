import React from 'react';
import client from '@core/api/client';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import { BuildingOrientationType } from '@enums/BuildingOrientationType';
import { BuildingRoofShape } from '@enums/BuildingRoofShape';
import { BuildingType } from '@enums/BuildingType';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import axios, { AxiosResponse } from 'axios';
import { CartesianCoordinate } from '@hooks/useGeometry';

const usePropertyApi = () => {
    const axiosClient = useAxiosClient();
    const buildingsEndpoint = apiEndpoints[ApiEndpoints.GET_BUILDINGS];
    const spatialFeaturesEndpoint = apiEndpoints[ApiEndpoints.SPATIAL_FEATURES];

    const fetchSpatialFeature = (
        id: string
    ): Promise<AxiosResponse<SpatialFeatureResponse>> => {
        const auth = axiosClient<SpatialFeatureResponse>({
            apiConfig: {
                method: ApiMethod.GET,
                uri: `${spatialFeaturesEndpoint}/${id}`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    }

    const fetchPropertyFromInternalApi = (
        osmId: string
    ): Promise<AxiosResponse<DetailedPropertyResponse>> => {
        const auth = axiosClient<DetailedPropertyResponse>({
            apiConfig: {
                method: ApiMethod.GET,
                uri: `${buildingsEndpoint}/${osmId}`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const fetchPropertyFromOsmApi = (
        id: string
    ): Promise<AxiosResponse<OsmApiPropertyResponse>> => {
        const overpassQuery = `[out:json];(way(id:${id}););out body;>;out skel qt;`;

        const query = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

        return axios.get(query, { responseType: 'json' });
    };

    const cacheProperty = (
        property: CachedProperty
    ): Promise<AxiosResponse<void>> => {
        const auth = axiosClient<void>({
            apiConfig: {
                method: ApiMethod.POST,
                uri: `${buildingsEndpoint}/cache`,
                data: { properties: [property] }
            },
            axiosClientConfig: client
        });

        return auth;
    };

    return {
        fetchSpatialFeature,
        fetchPropertyFromInternalApi,
        fetchPropertyFromOsmApi,
        cacheProperty
    };
};

export type PropertyLocationCoordinateResponse = {
    latitude: number;
    longitude: number;
};

export type PropertyLocationResponse = {
    streetName: string;
    streetNumber: string;
    zipCode: string;
    city: string;
    country: string;
    position: CartesianCoordinate;
};

export type DetailedPropertyResponse = {
    id: string;
    osmId: string;
    name: string;
    type: BuildingType;
    location: PropertyLocationResponse;
};

export type OsmApiPropertyResponse = {
    elements: Array<OsmApiNodeElementResponse | OsmApiWayElementResponse>;
    generator: string;
    osm3s: OsmApiOsm3sResponse;
    version: number;
};

type OsmApiOsm3sResponse = {
    copyright: string;
    timestamp_osm_base: string;
};

export type OsmApiNodeElementResponse = {
    id: number;
    type: 'node';
    lat: number;
    lon: number;
};

export type OsmApiWayElementResponse = {
    id: number;
    nodes: Array<number>;
    tags: OsmApiWayTagsResponse;
    type: 'way';
};

type OsmApiWayTagsResponse = {
    name?: string;
    'building:levels'?: number;
    construction_date?: number;
    start_date?: number;
};

export type CachedProperty = {
    osmId: string;
    name: string;
    location: CachedPropertyLocation;
    schematics: CachedPropertySchematic;
};

type CachedPropertyLocation = {
    streetName: string;
    streetNumber: string;
    zipCode: string;
    city: string;
    country: string;
    position: CachedPropertyLocationPosition;
};

type CachedPropertyLocationPosition = {
    latitude: number;
    longitude: number;
};

type CachedPropertySchematic = {
    size: number;
};

export type SpatialFeatureResponse = {
    id: string;
    type: any;
    location: SpatialFeatureLocationResponse;
    footprint: Array<CartesianCoordinate>;
}

type SpatialFeatureLocationResponse = {
    streetName: string;
    streetNumber: string;
    zipCode: string;
    city: string;
    country: string;
    position: CartesianCoordinate;
}

export default usePropertyApi;
