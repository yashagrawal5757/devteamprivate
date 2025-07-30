import client from '@core/api/client';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import { AddToWatchlistType } from '@enums/AddToWatchlistType';
import { BuildingOrientationScore } from '@enums/BuildingOrientationScore';
import { BuildingRoofShapeScore } from '@enums/BuildingRoofShapeScore';
import { Month } from '@enums/Month';
import { SolarPanelPotential } from '@enums/SolarPanelPotential';
import { SolarPanelType } from '@enums/SolarPanelType';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import { CartesianCoordinate } from '@hooks/useGeometry';
import { AxiosResponse } from 'axios';

const useVariationsApi = () => {
    const axiosClient = useAxiosClient();
    const endpoint = apiEndpoints[ApiEndpoints.CALCULATOR];

    const getVariations = (
        id: string
    ): Promise<AxiosResponse<VariationsResponse>> => {
        let queries: Array<string> = [];

        queries.push(`pageNumber=${1}&pageSize=${100}`);

        const query = queries.join('&');

        const auth = axiosClient<VariationsResponse>({
            apiConfig: {
                method: ApiMethod.GET,
                uri: `${endpoint}/${id}/solar/generation/variations?${query}`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const getVariationById = (
        id: string,
        variationId: string
    ): Promise<AxiosResponse<VariationByIdResponse>> => {
        const auth = axiosClient<VariationByIdResponse>({
            apiConfig: {
                method: ApiMethod.GET,
                uri: `${endpoint}/${id}/solar/generation/variations/${variationId}`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const putVariation = (
        id: string,
        hmac: string,
        watchlistId: string,
        name: string,
        type: AddToWatchlistType,
        input: InputGenerationData,
        overallMetrics: OverallMetrics,
        predictionMetrics: PredictedMetrics,
        annualMetrics: AnnualMetrics,
        monthlyMetrics: Array<MonthlyMetrics>,
        cashFlows: Array<CashFlowMetrics>,
        financialMetrics: Array<FinancialMetrics>
    ): Promise<AxiosResponse<VariationResponse>> => {
        const auth = axiosClient<VariationResponse>({
            apiConfig: {
                method: ApiMethod.PUT,
                uri: `${endpoint}/${id}/solar/save`,
                data: {
                    hmac,
                    watchlistId,
                    name,
                    type,
                    input,
                    overallMetrics,
                    predictionMetrics,
                    annualMetrics,
                    monthlyMetrics,
                    cashFlows,
                    financialMetrics
                }
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const putVariationFootprint = (
        id: string,
        variationId: string,
        buildingImage: string,
        footprints: Array<FootprintMetrics>,
        boundingBox: Array<CartesianCoordinate>
    ): Promise<AxiosResponse<VariationResponse>> => {
        const payload = {
            Base64BuildingImage: buildingImage,
            BoundingBox: boundingBox,
            Footprints: footprints
        };

        const auth = axiosClient<VariationResponse>({
            apiConfig: {
                method: ApiMethod.PUT,
                uri: `${endpoint}/${id}/solar/generation/variations/${variationId}/footprint`,
                data: payload,
            },
            axiosClientConfig: client
        });

        return auth;
    };

    return { getVariations, getVariationById, putVariation, putVariationFootprint };
};

export type VariationResponse = {
    id: string;
    createdAt: string;
};

export type VariationsResponse = Array<VariationResponse>;

export type InputGenerationData = {
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
    systemCost: number;
    discountRate: number;
    projectLifetime: number;
    totalAvailableSpace: number;
};

export type InputFinancialData = {
    systemCost: number;
    discountRate: number;
    projectLifetime: number;
    cashFlows: Array<number>;
};

export type OverallMetrics = {
    sitePotential: SolarPanelPotential;
    orientationPotential: BuildingOrientationScore;
    roofStructurePotential: BuildingRoofShapeScore;
    wattPeakPower: number;
    totalWattPeakPower: number;
};

export type PredictedMetrics = {
    cashFlow: number;
};

export type FinancialMetrics = {
    discountRate: number;
    netPresentValue: number;
    internalRateOfReturn: number;
    paybackPeriod: number;
};

export type AnnualMetrics = {
    powerOutput: number;
    totalPowerOutput: number;
    energyProduction: number;
    netPowerOutput: number;
    netTotalPowerOutput: number;
    netEnergyProduction: number;
    producableEnergyPercentage: number;
    energySavings: number;
    costReduction: number;
    energyRevenue: number;
    netEnergyRevenue: number;
};

export type MonthlyMetrics = {
    month: Month;
    powerOutput: number;
    totalPowerOutput: number;
    energyProduction: number;
    netPowerOutput: number;
    netTotalPowerOutput: number;
    netEnergyProduction: number;
    energySavings: number;
    costReduction: number;
    energyRevenue: number;
    netEnergyRevenue: number;
};

export type CashFlowMetrics = {
    cashFlow: number;
};

export type FootprintMetrics = {
    type: any;
    coordinates: Array<CartesianCoordinate>;
};

export type VariationByIdResponse = {
    monthlyMetrics: Array<MonthlyMetrics>;
    annualMetrics: AnnualMetrics;
    overallMetrics: OverallMetrics;
    financialMetrics: Array<FinancialMetrics>;
    input: InputGenerationData;
    cashFlows: Array<number>;
    footprints: Array<FootprintMetrics>;
};

export default useVariationsApi;
