import React, { useRef, useState } from 'react';
import useError from '@hooks/useError';
import useLoading from '@hooks/useLoading';
import useProperty from '../property/useProperty';
import { SolarPanelType } from '@enums/SolarPanelType';
import { Month } from '@enums/Month';
import { solarPanelTypeMetadata } from '@metadata/SolarPanelType.metadata';
import {
    FinancialMetrics,
    SolarPanelMetrics
} from '../../state/solar-estimate-input/SolarEstimateInputDefaults';
import useSolarEstimateInputContext from '../../contexts/solar-estimate-input/useSolarEstimateInputContext';
import { AxiosResponse } from 'axios';
import { SolarEstimateInputActions } from '../../state/solar-estimate-input/SolarEstimateInputActions';
import useSolarCalculationEstimateApi, {
    CalculateSolarFinancialResponse,
    CalculateSolarGenerationResponse
} from './useSolarCalculationEstimateApi';
import {
    CalculateSolarPanelAnnualMetrics,
    CalculateSolarPanelMonthlyMetrics,
    SolarGenerationOutputType
} from '../../state/solar-generation-output/SolarGenerationOutputDefaults';
import { SolarGenerationOutputActions } from '../../state/solar-generation-output/SolarGenerationOutputActions';
import useSolarGenerationOutputContext from '../../contexts/solar-generation-output/useSolarGenerationOutputContext';
import useSolarFinancialOutputContext from '../../contexts/solar-financial-output/useSolarFinancialOutputContext';
import { SolarFinancialOutputType } from '../../state/solar-financial-output/SolarFinancialOutputDefaults';
import { SolarFinancialOutputActions } from '../../state/solar-financial-output/SolarFinancialOutputActions';
import { AreaConfigurationType } from '@enums/AreaConfigurationType';
import { SolarPanelForm } from '../../property-details-content/property-calculator/calculator/solar-calculator-input/SolarCalculatorInput';
import usePropertyEditor from '../property-editor/usePropertyEditor';
import { PropertyMapMode } from '../../state/property-editor/PropertyEditorDefaults';
import { FinancialForm } from '../../property-details-content/property-calculator/calculator/financial-calculator-input/FinancialCalculatorInput';
import usePropertyEditorApi from '../property-editor/usePropertyEditorApi';
import { getDisplayAngle, getRadianAngle } from '@services/unitConversionUtils';
import { usePropertyPolygonContext } from '../../contexts/property-editor/PropertyPolygonRefContext';
import usePropertyFootprint from '../property-footprint/usePropertyFootprint';

const useSolarCalculationEstimate = () => {
    const error = useError();
    const loading = useLoading();
    const { property } = useProperty();
    const { setMapMode } = usePropertyEditor();
    const { footprint } = usePropertyFootprint();

    const solarCalculationEstimateApi = useSolarCalculationEstimateApi();

    const solarEstimateInputContext = useSolarEstimateInputContext();
    const solarGenerationOutputContext = useSolarGenerationOutputContext();
    const solarFinancialOutputContext = useSolarFinancialOutputContext();
    const propertyEditorApi = usePropertyEditorApi();

    const solarEstimateInput = solarEstimateInputContext.state;
    const solarGenerationOutput = solarGenerationOutputContext.state;

    const [selectedOutputDataOption, setSelectedOutputDataOption] = useState<
        Month | 'Annual'
    >('Annual');

    const solarPanelTypeOptions = Object.keys(SolarPanelType)
        .filter((key) => isNaN(Number(key)))
        .map((key) => ({
            value: SolarPanelType[key as keyof typeof SolarPanelType],
            label: solarPanelTypeMetadata[
                SolarPanelType[key as keyof typeof SolarPanelType]
            ]
        }));

    const handleSelectChange = (event: any) => {
        const selectedValue = event.target.value;

        if (selectedValue === 'Annual') {
            setSelectedOutputDataOption(selectedValue);
            return;
        }

        setSelectedOutputDataOption(parseInt(selectedValue));
    };

    const calculateOrGeneratePdfForSolarGeneration = (
        values: SolarPanelMetrics,
        generateAsPdf: boolean = false
    ) => {
        if (property === undefined) {
            return;
        }

        const {shapes, obsticles} = footprint;

        loading.load();

        propertyEditorApi
            .calculateAvailableSpace({ shapes, obsticles })
            .then((response) => {
                const { data } = response;
                const { availableSpace } = data;

                if (values.slope !== undefined && values.slope !== null) {
                    values.slope = getRadianAngle(values.slope);
                }

                solarCalculationEstimateApi
                    .calculateSolarGeneration(
                        property.osmId === '' ? `${property.id}` : property.osmId, //FIX THIS
                        property.location.position.latitude,
                        property.location.position.longitude,
                        values.type,
                        values.panelHorizontalLength,
                        values.panelVerticalLength,
                        values.panelEfficiency,
                        values.areaConfigurationType,
                        values.areaConfigurationValue,
                        values.slope,
                        values.revenuePerKWh,
                        values.electricityPrice,
                        values.maintenanceCost,
                        generateAsPdf,
                        availableSpace
                    )
                    .then(
                        (
                            response: AxiosResponse<
                                CalculateSolarGenerationResponse | BlobPart,
                                any
                            >
                        ) => {
                            const { data } = response;

                            if (generateAsPdf) {
                                const contentType =
                                    response.headers['content-type'] ||
                                    'application/octet-stream';
                                const content = data as BlobPart;
                                const filename = 'Solar_Panel_Report.pdf';

                                openSolarPanelsPdfReport(
                                    content,
                                    filename,
                                    contentType
                                );
                            } else {
                                const {
                                    hmac,
                                    monthlyMetrics,
                                    annualMetrics,
                                    overallMetrics,
                                    predictedMetrics,
                                    input
                                } = data as CalculateSolarGenerationResponse;

                                solarGenerationOutputContext.dispatch({
                                    type: SolarGenerationOutputActions.SET_SOLAR_GENERATION_CALCULATIONS,
                                    payload: {
                                        hmac: hmac,
                                        monthlyMetrics: monthlyMetrics,
                                        annualMetrics: annualMetrics,
                                        overallMetrics: overallMetrics,
                                        predictedMetrics: predictedMetrics
                                    }
                                });

                                solarEstimateInputContext.dispatch({
                                    type: SolarEstimateInputActions.SET_SOLAR_PANEL_INPUTS,
                                    payload: {
                                        ...solarEstimateInput.solarPanelMetrics,
                                        type: input.panelType,
                                        panelHorizontalLength:
                                            input.panelHorizontalLength,
                                        panelVerticalLength:
                                            input.panelVerticalLength,
                                        panelEfficiency: input.panelEfficiency,
                                        areaConfigurationType:
                                            AreaConfigurationType.BY_PANELS,
                                        areaConfigurationValue:
                                            input.numberOfPanels,
                                        slope: getDisplayAngle(input.slope),
                                        revenuePerKWh: input.revenuePerKWh,
                                        electricityPrice:
                                            input.electricityPrice,
                                        maintenanceCost: input.maintenanceCost,
                                        totalAvailableSpace:
                                            input.totalAvailableSpace
                                    }
                                });
                            }
                        }
                    )
                    .catch((e) => {
                        error.parseAndSetErrorMessage(e);
                    })
                    .finally(() => {
                        loading.loaded();
                    });
            })
            .catch((e) => {
                console.error('ERROR ON CALCULATING', e);
            });
    };

    const calculateOrGeneratePdfForSolarFinancial = (
        values: FinancialMetrics,
        generateAsPdf: boolean = false
    ) => {
        if (property === undefined) {
            return;
        }

        loading.load();
        solarCalculationEstimateApi
            .calculateSolarFinancial(
                property.osmId === '' ? `${property.id}` : property.osmId, //FIX THIS
                values.systemCost,
                values.discountRate,
                values.projectLifetime,
                values.cashFlows,
                generateAsPdf
            )
            .then(
                (
                    response: AxiosResponse<
                        CalculateSolarFinancialResponse | BlobPart,
                        any
                    >
                ) => {
                    const { data } = response;

                    if (generateAsPdf) {
                        const contentType =
                            response.headers['content-type'] ||
                            'application/octet-stream';
                        const content = data as BlobPart;
                        const filename = 'Solar_Panel_Report.pdf';

                        openSolarPanelsPdfReport(
                            content,
                            filename,
                            contentType
                        );
                    } else {
                        const { predictions, input } =
                            data as CalculateSolarFinancialResponse;

                        solarFinancialOutputContext.dispatch({
                            type: SolarFinancialOutputActions.SET_SOLAR_FINANCIAL_CALCULATIONS,
                            payload: {
                                predictions: predictions,
                                input: input
                            }
                        });

                        solarEstimateInputContext.dispatch({
                            type: SolarEstimateInputActions.SET_FINANCIAL_INPUTS,
                            payload: {
                                ...solarEstimateInput.financialMetrics,
                                systemCost: input.systemCost,
                                discountRate: input.discountRate,
                                projectLifetime: input.projectLifetime,
                                cashFlows: input.cashFlows
                            }
                        });
                    }
                }
            )
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const onSubmitSolarGeneration = (values: SolarPanelForm) => {
        let type: SolarPanelType | null | undefined = values.type!.value;
        let panelHorizontalLength: number | null | undefined =
            values.panelHorizontalLength!.value;
        let panelVerticalLength: number | null | undefined =
            values.panelVerticalLength!.value;
        let panelEfficiency: number | null | undefined =
            values.panelEfficiency!.value;
        let areaConfigurationType: AreaConfigurationType | null | undefined =
            values.areaConfigurationType!.value;
        let areaConfigurationValue: number | null | undefined =
            values.areaConfigurationValue!.value;
        let slope: number | null | undefined = values.slope!.value;
        let revenuePerKWh: number | null | undefined =
            values.revenuePerKWh!.value;
        let electricityPrice: number | null | undefined =
            values.electricityPrice!.value;
        let maintenanceCost: number | null | undefined =
            values.maintenanceCost!.value;

        if (values.type?.value == SolarPanelType.CUSTOM) {
            type = null;
        }

        if (values.panelHorizontalLength?.isDefaultValue) {
            panelHorizontalLength = null;
        }

        if (values.panelVerticalLength?.isDefaultValue) {
            panelVerticalLength = null;
        }

        if (values.panelEfficiency?.isDefaultValue) {
            panelEfficiency = null;
        }

        if (values.areaConfigurationValue?.isNull) {
            areaConfigurationValue = null;
        }

        if (values.slope?.isDefaultValue) {
            slope = null;
        }

        if (values.revenuePerKWh?.isDefaultValue) {
            revenuePerKWh = null;
        }

        if (values.electricityPrice?.isDefaultValue) {
            electricityPrice = null;
        }

        if (values.maintenanceCost?.isDefaultValue) {
            maintenanceCost = null;
        }

        const updatedValues = {
            type: parseFloat(`${type}`),
            panelHorizontalLength: parseFloat(`${panelHorizontalLength}`),
            panelVerticalLength: parseFloat(`${panelVerticalLength}`),
            panelEfficiency: parseFloat(`${panelEfficiency}`),
            areaConfigurationType: parseFloat(`${areaConfigurationType}`),
            areaConfigurationValue:
                areaConfigurationValue === null
                    ? null
                    : parseFloat(`${areaConfigurationValue}`),
            slope: parseFloat(`${slope}`),
            revenuePerKWh: parseFloat(`${revenuePerKWh}`),
            electricityPrice: parseFloat(`${electricityPrice}`),
            maintenanceCost: parseFloat(`${maintenanceCost}`),
            totalAvailableSpace: 0
        };

        calculateOrGeneratePdfForSolarGeneration(updatedValues);
        setMapMode(PropertyMapMode.DETAILS);
    };

    const onSubmitPdfSolarGeneration = (values: SolarPanelForm) => {
        let type: SolarPanelType | null | undefined = values.type!.value;
        let panelHorizontalLength: number | null | undefined =
            values.panelHorizontalLength!.value;
        let panelVerticalLength: number | null | undefined =
            values.panelVerticalLength!.value;
        let panelEfficiency: number | null | undefined =
            values.panelEfficiency!.value;
        let areaConfigurationType: AreaConfigurationType | null | undefined =
            values.areaConfigurationType!.value;
        let areaConfigurationValue: number | null | undefined =
            values.areaConfigurationValue!.value;
        let slope: number | null | undefined = values.slope!.value;
        let revenuePerKWh: number | null | undefined =
            values.revenuePerKWh!.value;
        let electricityPrice: number | null | undefined =
            values.electricityPrice!.value;
        let maintenanceCost: number | null | undefined =
            values.maintenanceCost!.value;

        if (values.type?.value == SolarPanelType.CUSTOM) {
            type = null;
        }

        if (values.panelHorizontalLength?.isDefaultValue) {
            panelHorizontalLength = null;
        }

        if (values.panelVerticalLength?.isDefaultValue) {
            panelVerticalLength = null;
        }

        if (values.panelEfficiency?.isDefaultValue) {
            panelEfficiency = null;
        }

        if (values.areaConfigurationValue?.isNull) {
            areaConfigurationValue = null;
        }

        if (values.slope?.isDefaultValue) {
            slope = null;
        }

        if (values.revenuePerKWh?.isDefaultValue) {
            revenuePerKWh = null;
        }

        if (values.electricityPrice?.isDefaultValue) {
            electricityPrice = null;
        }

        if (values.maintenanceCost?.isDefaultValue) {
            maintenanceCost = null;
        }

        const updatedValues = {
            type: parseFloat(`${type}`),
            panelHorizontalLength: parseFloat(`${panelHorizontalLength}`),
            panelVerticalLength: parseFloat(`${panelVerticalLength}`),
            panelEfficiency: parseFloat(`${panelEfficiency}`),
            areaConfigurationType: parseFloat(`${areaConfigurationType}`),
            areaConfigurationValue:
                areaConfigurationValue === null
                    ? null
                    : parseFloat(`${areaConfigurationValue}`),
            slope: parseFloat(`${slope}`),
            revenuePerKWh: parseFloat(`${revenuePerKWh}`),
            electricityPrice: parseFloat(`${electricityPrice}`),
            maintenanceCost: parseFloat(`${maintenanceCost}`),
            totalAvailableSpace: 0
        };

        calculateOrGeneratePdfForSolarGeneration(updatedValues, true);
        setMapMode(PropertyMapMode.DETAILS);
    };

    const onSubmitSolarFinancial = (values: FinancialForm) => {
        let systemCost: number | null | undefined = values.systemCost!.value;
        let discountRate: number | null | undefined =
            values.discountRate!.value;
        let projectLifetime: number | null | undefined =
            values.projectLifetime!.value;
        let cashFlows: Array<number | null | undefined> = values.cashFlows!.map(
            (cashFlowValue) => cashFlowValue?.value
        );

        if (values.systemCost?.isDefaultValue) {
            systemCost = null;
        }

        if (values.discountRate?.isDefaultValue) {
            discountRate = null;
        }

        if (values.projectLifetime?.isDefaultValue) {
            projectLifetime = null;
        }

        const updatedValues = {
            systemCost: parseFloat(`${systemCost}`),
            discountRate: parseFloat(`${discountRate}`),
            projectLifetime: parseFloat(`${projectLifetime}`),
            cashFlows: cashFlows.map((cash) => parseFloat(`${cash}`))
        };

        calculateOrGeneratePdfForSolarFinancial(updatedValues);
        setMapMode(PropertyMapMode.DETAILS);
    };

    const onSubmitPdfSolarFinancial = (values: FinancialForm) => {
        let systemCost: number | null | undefined = values.systemCost!.value;
        let discountRate: number | null | undefined =
            values.discountRate!.value;
        let projectLifetime: number | null | undefined =
            values.projectLifetime!.value;
        let cashFlows: Array<number | null | undefined> = values.cashFlows!.map(
            (cashFlowValue) => cashFlowValue?.value
        );

        if (values.systemCost?.isDefaultValue) {
            systemCost = null;
        }

        if (values.discountRate?.isDefaultValue) {
            discountRate = null;
        }

        if (values.projectLifetime?.isDefaultValue) {
            projectLifetime = null;
        }

        const updatedValues = {
            systemCost: parseFloat(`${systemCost}`),
            discountRate: parseFloat(`${discountRate}`),
            projectLifetime: parseFloat(`${projectLifetime}`),
            cashFlows: cashFlows.map((cash) => parseFloat(`${cash}`))
        };

        calculateOrGeneratePdfForSolarFinancial(updatedValues, true);
        setMapMode(PropertyMapMode.DETAILS);
    };

    const openSolarPanelsPdfReport = (
        content: BlobPart,
        filename: string,
        contentType: string
    ): void => {
        if (!contentType) {
            contentType = 'application/octet-stream';
        }

        const newBlob = new Blob([content], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(newBlob);
        // const mapWin = window.open(fileURL, '_blank')!;

        // if (!mapWin || mapWin.closed || typeof mapWin.closed === 'undefined') {
        //     alert(
        //         'The report could not be opened. Please disable your pop-up blocker or allow pop-ups for this site.'
        //     );
        //     return;
        // }

        // mapWin.onload = (): void => {
        //     setTimeout(() => {
        //         mapWin.document.title = filename;
        //     }, 800);
        // };
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = filename || 'download.file';
        document.body.appendChild(a);
        a.click();
        a.remove();

        // Clean up object URL
        URL.revokeObjectURL(fileURL);
    };

    const filterDataByOption = (
        option: Month | 'Annual'
    ):
        | CalculateSolarPanelAnnualMetrics
        | CalculateSolarPanelMonthlyMetrics
        | undefined => {
        if (option === 'Annual') {
            return solarGenerationOutput?.annualMetrics;
        }

        return solarGenerationOutput?.monthlyMetrics.find(
            (monthData) => monthData.month === option
        );
    };

    const convertToPercentage = (value: number) => {
        const valuePercentage = value * 100;

        return valuePercentage;
    };

    const setSolarGenerationCalculations = (
        calculationsData: SolarGenerationOutputType
    ) => {
        solarGenerationOutputContext.dispatch({
            type: SolarGenerationOutputActions.SET_SOLAR_GENERATION_CALCULATIONS,
            payload: calculationsData
        });
    };

    const setSolarFinancialCalculations = (
        calculationsData: SolarFinancialOutputType
    ) => {
        solarFinancialOutputContext.dispatch({
            type: SolarFinancialOutputActions.SET_SOLAR_FINANCIAL_CALCULATIONS,
            payload: calculationsData
        });
    };

    const setSolarPanelInputs = (solarPanelData: SolarPanelMetrics) => {
        solarEstimateInputContext.dispatch({
            type: SolarEstimateInputActions.SET_SOLAR_PANEL_INPUTS,
            payload: solarPanelData
        });
    };

    const setFinancialInputs = (financialData: FinancialMetrics) => {
        solarEstimateInputContext.dispatch({
            type: SolarEstimateInputActions.SET_FINANCIAL_INPUTS,
            payload: financialData
        });
    };

    return {
        solarEstimateInput: solarEstimateInputContext.state,
        solarGenerationOutput: solarGenerationOutputContext.state,
        solarFinancialOutput: solarFinancialOutputContext.state,
        solarPanelTypeOptions,
        selectedOutputDataOption,
        handleSelectChange,
        filterDataByOption,
        convertToPercentage,
        onSubmitSolarGeneration,
        onSubmitPdfSolarGeneration,
        onSubmitSolarFinancial,
        onSubmitPdfSolarFinancial,
        setSolarGenerationCalculations,
        setSolarFinancialCalculations,
        setSolarPanelInputs,
        setFinancialInputs
    };
};

export default useSolarCalculationEstimate;
