import client from '@core/api/client';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import { AxiosResponse } from 'axios';

const useHybridSolutionApi = () => {
    const axiosClient = useAxiosClient();
    const endpoint = apiEndpoints[ApiEndpoints.GET_BUILDINGS];

    const cacheProperties = (
        properties: Array<CachedProperty>
    ): Promise<AxiosResponse<void>> => {
        const auth = axiosClient<void>({
            apiConfig: {
                method: ApiMethod.POST,
                uri: `${endpoint}/cache`,
                data: { properties }
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const registerBuildingLookup = (
        osmIds: Array<string>
    ): Promise<AxiosResponse<RegisterPropertiesLookupLimitResponse>> => {
        const auth = axiosClient<RegisterPropertiesLookupLimitResponse>({
            apiConfig: {
                method: ApiMethod.PUT,
                uri: `${endpoint}/lookup`,
                data: { osmIds }
            },
            axiosClientConfig: client
        });

        return auth;
    };

    return { cacheProperties, registerBuildingLookup };
};

export default useHybridSolutionApi;

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

type RegisterPropertiesLookupLimitResponse = {
    hasReachedLimit: boolean;
};
