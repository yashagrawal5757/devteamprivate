import React from 'react';
import client from '@core/api/client';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import { AxiosResponse } from 'axios';
import { SolarEstimateInputType } from '../../state/solar-estimate-input/SolarEstimateInputDefaults';
import { DetailedPropertyType } from '../../state/property/PropertyDefaults';
import { SolarGenerationOutputType } from '../../state/solar-generation-output/SolarGenerationOutputDefaults';
import { SolarFinancialOutputType } from '../../state/solar-financial-output/SolarFinancialOutputDefaults';

const useCalculatorReportApi = () => {
    const axiosClient = useAxiosClient();
    const endpoint = apiEndpoints[ApiEndpoints.CALCULATOR];

    const generateReport = (
        id: string,
        solarGenerationHMAC: string = '',
        solarFinancialHMAC: string = '',
        siteImageAsBase64: string = '',
        building: DetailedPropertyType,
        solarEstimateInput: SolarEstimateInputType,
        solarEstimateOutput: SolarGenerationOutputType,
        financialEstimateOutput: SolarFinancialOutputType
    ): Promise<AxiosResponse<BlobPart>> => {
        client.defaults.responseType = 'blob';

        const auth = axiosClient<BlobPart>({
            apiConfig: {
                method: ApiMethod.POST,
                uri: `${endpoint}/${id}/solar/report`,
                data: {
                    input: {
                        solarGenerationHMAC,
                        solarFinancialHMAC,
                        siteImageAsBase64,
                        buildingName: building.name,
                        buildingAddress: `${building.location.streetName} ${building.location.streetNumber}, ${building.location.zipCode}`,
                        latitude: building.location.position.latitude,
                        longitude: building.location.position.longitude,
                        // buildingSize: building.schematic.size, //TODO
                        // buildingRoofSize: building.schematic.roofSize,
                        // buildingLevels: building.schematic.levels,
                        // buildingYearBuilt: building.schematic.yearBuilt,
                        type: solarEstimateInput.solarPanelMetrics.type,
                        panelHorizontalLength:
                            solarEstimateInput.solarPanelMetrics
                                .panelHorizontalLength,
                        panelVerticalLength:
                            solarEstimateInput.solarPanelMetrics
                                .panelVerticalLength,
                        panelEfficiency:
                            solarEstimateInput.solarPanelMetrics
                                .panelEfficiency,
                        numberOfPanels:
                            solarEstimateInput.solarPanelMetrics
                                .areaConfigurationValue,
                        slope: solarEstimateInput.solarPanelMetrics.slope,
                        revenuePerKWh:
                            solarEstimateInput.solarPanelMetrics.revenuePerKWh,
                        electricityPrice:
                            solarEstimateInput.solarPanelMetrics
                                .electricityPrice,
                        maintenanceCost:
                            solarEstimateInput.solarPanelMetrics
                                .maintenanceCost,
                        cashFlows:
                            solarEstimateInput.financialMetrics.cashFlows,
                        discountRate:
                            solarEstimateInput.financialMetrics.discountRate,
                        projectLifetime:
                            solarEstimateInput.financialMetrics.projectLifetime,
                        systemCost:
                            solarEstimateInput.financialMetrics.systemCost
                    },
                    overall: solarEstimateOutput.overallMetrics,
                    annual: solarEstimateOutput.annualMetrics,
                    monthly: solarEstimateOutput.monthlyMetrics,
                    financial: financialEstimateOutput.predictions
                }
            },
            axiosClientConfig: client
        });

        client.defaults.responseType = undefined;

        return auth;
    };

    return { generateReport };
};

export default useCalculatorReportApi;
