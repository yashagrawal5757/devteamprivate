import React from 'react';
import client from '@core/api/client';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import { Month } from '@enums/Month';
import { AxiosResponse } from 'axios';

const useDashboardApi = () => {
    const axiosClient = useAxiosClient();
    const endpoint = apiEndpoints[ApiEndpoints.WATCHLISTS];

    const getDashboardData = (
        id: string,
        pdf: boolean
    ): Promise<AxiosResponse<DashboardDataResponse | BlobPart>> => {
        client.defaults.responseType = pdf ? 'blob' : undefined;

        const auth = axiosClient<DashboardDataResponse | BlobPart>({
            apiConfig: {
                method: ApiMethod.GET,
                uri: `${endpoint}/${id}/kpi?pdf=${pdf}`,
                data: {}
            },
            axiosClientConfig: client
        });

        client.defaults.responseType = undefined;

        return auth;
    };

    return { getDashboardData };
};

export type AnnualPredictionsResponse = {
    energyGeneration: number;
    energyRevenue: number;
};

export type MonthlyPredictionsResponse = {
    month: Month;
    energyGeneration: number;
    energyRevenue: number;
};

export type CashFlowPredictionsResponse = {
    year: number;
    cashFlow: number;
};

export type DashboardDataResponse = {
    annualPredictions: AnnualPredictionsResponse;
    monthlyPredictions: Array<MonthlyPredictionsResponse>;
    cashFlowPredictions: Array<CashFlowPredictionsResponse>;
};

export default useDashboardApi;
