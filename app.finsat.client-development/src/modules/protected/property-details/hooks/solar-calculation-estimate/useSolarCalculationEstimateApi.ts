import React from 'react';
import client from '@core/api/client';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import { AreaConfigurationType } from '@enums/AreaConfigurationType';
import { SolarPanelType } from '@enums/SolarPanelType';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import { AxiosResponse } from 'axios';
import {
    CalculateSolarPanelAnnualMetrics,
    CalculateSolarPanelMonthlyMetrics,
    CalculateSolarPanelOverallMetrics,
    CalculateSolarPanelPredictedMetrics
} from '../../state/solar-generation-output/SolarGenerationOutputDefaults';
import {
    CalculateSolarPanelFinancialInputData,
    CalculateSolarPanelFinancialPredictionMetrics
} from '../../state/solar-financial-output/SolarFinancialOutputDefaults';

const useSolarCalculationEstimateApi = () => {
    const axiosClient = useAxiosClient();
    const endpoint = apiEndpoints[ApiEndpoints.CALCULATOR];

    const calculateSolarGeneration = (
        buildingId: string,
        latitude: number,
        longitude: number,
        type: SolarPanelType | null | undefined,
        panelHorizontalLength: number | null | undefined,
        panelVerticalLength: number | null | undefined,
        panelEfficiency: number | null | undefined,
        areaConfigurationType: AreaConfigurationType | null | undefined,
        areaConfigurationValue: number | null | undefined,
        slope: number | null | undefined,
        revenuePerKWh: number | null | undefined,
        electricityPrice: number | null | undefined,
        maintenanceCost: number | null | undefined,
        pdf: boolean,
        maximumArea: number
    ): Promise<AxiosResponse<CalculateSolarGenerationResponse | BlobPart>> => {
        client.defaults.responseType = pdf ? 'blob' : undefined;

        const auth = axiosClient<CalculateSolarGenerationResponse | BlobPart>({
            apiConfig: {
                method: ApiMethod.POST,
                uri: `${endpoint}/${buildingId}/solar/generation`,
                data: {
                    type,
                    latitude,
                    longitude,
                    panelHorizontalLength,
                    panelVerticalLength,
                    panelEfficiency,
                    areaConfigurationType,
                    areaConfigurationValue,
                    slope,
                    revenuePerKWh,
                    electricityPrice,
                    maintenanceCost,
                    pdf,
                    maximumArea
                }
            },
            axiosClientConfig: client
        });

        client.defaults.responseType = undefined;

        return auth;
    };

    const calculateSolarFinancial = (
        buildingId: string,
        systemCost: number | null | undefined,
        discountRate: number | null | undefined,
        projectLifetime: number | null | undefined,
        cashFlows: Array<number | null | undefined>,
        pdf: boolean
    ): Promise<AxiosResponse<CalculateSolarFinancialResponse | BlobPart>> => {
        client.defaults.responseType = pdf ? 'blob' : undefined;

        const auth = axiosClient<CalculateSolarFinancialResponse | BlobPart>({
            apiConfig: {
                method: ApiMethod.POST,
                uri: `${endpoint}/${buildingId}/solar/financial`,
                data: {
                    systemCost,
                    discountRate,
                    projectLifetime,
                    cashFlows,
                    pdf
                }
            },
            axiosClientConfig: client
        });

        client.defaults.responseType = undefined;

        return auth;
    };

    return { calculateSolarGeneration, calculateSolarFinancial };
};

export type CalculateSolarPanelGenerationInputResponse = {
    panelType: SolarPanelType;
    panelHorizontalLength: number;
    panelVerticalLength: number;
    panelSize: number;
    panelEfficiency: number;
    numberOfPanels: number;
    slope: number;
    revenuePerKWh: number;
    electricityPrice: number;
    maintenanceCost: number;
    totalAvailableSpace: number;
};

export type CalculateSolarGenerationResponse = {
    hmac: string;
    monthlyMetrics: Array<CalculateSolarPanelMonthlyMetrics>;
    annualMetrics: CalculateSolarPanelAnnualMetrics;
    overallMetrics: CalculateSolarPanelOverallMetrics;
    predictedMetrics: CalculateSolarPanelPredictedMetrics;
    input: CalculateSolarPanelGenerationInputResponse;
};

export type CalculateSolarFinancialResponse = {
    predictions: Array<CalculateSolarPanelFinancialPredictionMetrics>;
    input: CalculateSolarPanelFinancialInputData;
};

export default useSolarCalculationEstimateApi;
