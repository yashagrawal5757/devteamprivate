import React from 'react';
import client from '@core/api/client';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import { AxiosResponse } from 'axios';

const useRegionSunHoursApi = () => {
    const axiosClient = useAxiosClient();
    const endpoint = apiEndpoints[ApiEndpoints.SOLAR];

    const getRegionSunHours = (
        latitude: number,
        longitude: number
    ): Promise<AxiosResponse<RegionSunHoursResponse>> => {
        const auth = axiosClient<RegionSunHoursResponse>({
            apiConfig: {
                method: ApiMethod.GET,
                uri: `${endpoint}/sun-hours?latitude=${latitude}&longitude=${longitude}`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    return { getRegionSunHours };
};

export default useRegionSunHoursApi;

export type RegionSunHoursResponse = {
    sunHours: number;
};
