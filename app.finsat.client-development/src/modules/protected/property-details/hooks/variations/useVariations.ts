import useVariationsApi, { FootprintMetrics } from './useVariationsApi';
import useVariationsContext from '../../contexts/variations/useVariationsContext';
import { VariationsActions } from '../../state/variations/VariationsActions';
import useLoading from '@hooks/useLoading';
import useError from '@hooks/useError';
import useSuccess from '@hooks/useSuccess';
import useSolarCalculationEstimate from '../solar-calculation-estimate/useSolarCalculationEstimate';
import { AreaConfigurationType } from '@enums/AreaConfigurationType';
import usePropertyEditor from '../property-editor/usePropertyEditor';
import { PropertyMapMode } from '../../state/property-editor/PropertyEditorDefaults';
import { getDisplayAngle, getRadianAngle } from '@services/unitConversionUtils';
import { AddToWatchlistType } from '@enums/AddToWatchlistType';
import useWarning from '@hooks/useWarning';
import FootprintType from '@enums/FootprintType';
import usePropertyFootprint from '../property-footprint/usePropertyFootprint';
import { CartesianCoordinate } from '@hooks/useGeometry';
import concaveman from 'concaveman';

const useVariations = () => {
    const loading = useLoading();
    const error = useError();
    const success = useSuccess();
    const warning = useWarning();
    const variationsApi = useVariationsApi();
    const variations = useVariationsContext();
    const {
        solarEstimateInput,
        solarGenerationOutput,
        solarFinancialOutput,
        setSolarGenerationCalculations,
        setSolarFinancialCalculations,
        setSolarPanelInputs,
        setFinancialInputs
    } = useSolarCalculationEstimate();
    const { setMapMode } = usePropertyEditor();
    const { setFootprints, footprint } = usePropertyFootprint();

    const fetchVariations = (id: string): void => {
        loading.load();

        variationsApi
            .getVariations(id)
            .then((variationsResponse) => {
                const { data: variationsData } = variationsResponse;

                const parsedVariationsData = variationsData.map(
                    (variationData) => {
                        return {
                            id: variationData.id,
                            createdAt: variationData.createdAt
                        };
                    }
                );

                variations.dispatch({
                    type: VariationsActions.SET_VARIATIONS,
                    payload: parsedVariationsData
                });
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const fetchVariationById = (id: string, variationId: string): void => {
        loading.load();

        variationsApi
            .getVariationById(id, variationId)
            .then((response) => {
                const { data: variation } = response;

                const { financialMetrics, cashFlows, input, footprints } = variation;
                const {
                    systemCost,
                    discountRate,
                    projectLifetime,
                    ...solarGenerationInput
                } = input;

                const cashFlowSum = cashFlows.reduce(
                    (acc, val) => acc + val,
                    0
                );

                const variationGenerationData = {
                    hmac: '',
                    monthlyMetrics: variation.monthlyMetrics,
                    annualMetrics: variation.annualMetrics,
                    overallMetrics: variation.overallMetrics,
                    predictedMetrics: {
                        cashFlow: cashFlowSum / cashFlows.length
                    },
                    input: solarGenerationInput
                };

                const variationFinancialData = {
                    predictions: financialMetrics,
                    input: {
                        systemCost,
                        discountRate,
                        projectLifetime,
                        cashFlows
                    }
                };

                const solarPanelInputs = {
                    type: variation.input.panelType,
                    panelHorizontalLength:
                        variation.input.panelHorizontalLength,
                    panelVerticalLength: variation.input.panelVerticalLength,
                    panelEfficiency: variation.input.panelEfficiency,
                    areaConfigurationType: AreaConfigurationType.BY_PANELS,
                    areaConfigurationValue: variation.input.numberOfPanels,
                    slope: getDisplayAngle(variation.input.slope),
                    revenuePerKWh: variation.input.revenuePerKWh,
                    electricityPrice: variation.input.electricityPrice,
                    maintenanceCost: variation.input.maintenanceCost,
                    totalAvailableSpace: variation.input.totalAvailableSpace
                };

                const financialInputs = {
                    systemCost,
                    discountRate,
                    projectLifetime,
                    cashFlows
                };

                setSolarGenerationCalculations(variationGenerationData);
                setSolarFinancialCalculations(variationFinancialData);
                setSolarPanelInputs(solarPanelInputs);
                setFinancialInputs(financialInputs);
                setMapMode(PropertyMapMode.DETAILS);

                if (footprints.length === 0) {
                    warning.setWarningMessage(
                        'No footprint available for default configuration'
                    );

                    return;
                }

                const parsedFootprints: Array<Array<[number, number]>> = footprints
                    .filter((footprintData) => footprintData.type === FootprintType.FOOTPRINT)
                    .map((footprintData) => {
                        const points = footprintData.coordinates.map(
                            ({ latitude, longitude }) => [longitude, latitude] as [number, number]
                        );
                        const ordered = concaveman(points);
                        return ordered.map(([lon, lat]) => [lat, lon]);
                    });

                const parsedObstructions: Array<Array<[number, number]>> = footprints
                    .filter((footprintData) => footprintData.type === FootprintType.OBSTRUCTION)
                    .map((footprintData) => {
                        const points = footprintData.coordinates.map(
                            ({ latitude, longitude }) => [longitude, latitude] as [number, number]
                        );
                        const ordered = concaveman(points);
                        return ordered.map(([lon, lat]) => [lat, lon]);
                    });

                setFootprints('shape', parsedFootprints);
                setFootprints('obsticle', parsedObstructions);
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const saveVariation = (
        id: string,
        watchlistId: string,
        name: string,
        type: AddToWatchlistType,
        base64Image: string
    ): void => {
        loading.load();

        if (solarGenerationOutput === undefined) {
            return;
        }

        if (solarFinancialOutput === undefined) {
            return;
        }

        const input = {
            panelType: solarEstimateInput.solarPanelMetrics.type!,
            panelHorizontalLength:
                solarEstimateInput.solarPanelMetrics.panelHorizontalLength!,
            panelVerticalLength:
                solarEstimateInput.solarPanelMetrics.panelVerticalLength!,
            panelSize:
                solarEstimateInput.solarPanelMetrics.panelHorizontalLength! *
                solarEstimateInput.solarPanelMetrics.panelVerticalLength!,
            panelEfficiency:
                solarEstimateInput.solarPanelMetrics.panelEfficiency!,
            numberOfPanels:
                solarEstimateInput.solarPanelMetrics.areaConfigurationValue!,
            slope: getRadianAngle(solarEstimateInput.solarPanelMetrics.slope!),
            revenuePerKWh: solarEstimateInput.solarPanelMetrics.revenuePerKWh!,
            electricityPrice:
                solarEstimateInput.solarPanelMetrics.electricityPrice!,
            maintenanceCost:
                solarEstimateInput.solarPanelMetrics.maintenanceCost!,
            totalAvailableSpace:
                solarEstimateInput.solarPanelMetrics.totalAvailableSpace,
            systemCost: solarEstimateInput.financialMetrics.systemCost!,
            discountRate: solarEstimateInput.financialMetrics.discountRate!,
            projectLifetime:
                solarEstimateInput.financialMetrics.projectLifetime!
        };

        const overallMetrics = {
            sitePotential: solarGenerationOutput.overallMetrics.sitePotential,
            orientationPotential:
                solarGenerationOutput.overallMetrics.orientationPotential,
            roofStructurePotential:
                solarGenerationOutput.overallMetrics.roofStructurePotential,
            wattPeakPower: solarGenerationOutput.overallMetrics.wattPeakPower,
            totalWattPeakPower:
                solarGenerationOutput.overallMetrics.totalWattPeakPower
        };

        const predictionMetrics = {
            cashFlow: solarGenerationOutput.predictedMetrics.cashFlow
        };

        const annualMetrics = {
            powerOutput: solarGenerationOutput.annualMetrics.powerOutput,
            totalPowerOutput:
                solarGenerationOutput.annualMetrics.totalPowerOutput,
            energyProduction:
                solarGenerationOutput.annualMetrics.energyProduction,
            netPowerOutput: solarGenerationOutput.annualMetrics.netPowerOutput,
            netTotalPowerOutput:
                solarGenerationOutput.annualMetrics.netTotalPowerOutput,
            netEnergyProduction:
                solarGenerationOutput.annualMetrics.netEnergyProduction,
            producableEnergyPercentage:
                solarGenerationOutput.annualMetrics.producableEnergyPercentage,
            energySavings: solarGenerationOutput.annualMetrics.energySavings,
            costReduction: solarGenerationOutput.annualMetrics.costReduction,
            energyRevenue: solarGenerationOutput.annualMetrics.energyRevenue,
            netEnergyRevenue:
                solarGenerationOutput.annualMetrics.netEnergyRevenue
        };

        const monthlyMetrics = solarGenerationOutput.monthlyMetrics.map(
            (monthlyMetrics) => ({
                month: monthlyMetrics.month,
                powerOutput: monthlyMetrics.powerOutput,
                totalPowerOutput: monthlyMetrics.totalPowerOutput,
                energyProduction: monthlyMetrics.energyProduction,
                netPowerOutput: monthlyMetrics.netPowerOutput,
                netTotalPowerOutput: monthlyMetrics.netTotalPowerOutput,
                netEnergyProduction: monthlyMetrics.netEnergyProduction,
                energySavings: monthlyMetrics.energySavings,
                costReduction: monthlyMetrics.costReduction,
                energyRevenue: monthlyMetrics.energyRevenue,
                netEnergyRevenue: monthlyMetrics.netEnergyRevenue
            })
        );

        const cashFlows = solarEstimateInput.financialMetrics.cashFlows.map(
            (cashFlow) => ({
                cashFlow: cashFlow as number
            })
        );

        const financialMetrics = solarFinancialOutput.predictions.map(
            (prediction) => ({
                discountRate: prediction.discountRate,
                netPresentValue: prediction.netPresentValue,
                internalRateOfReturn: prediction.internalRateOfReturn,
                paybackPeriod: prediction.paybackPeriod
            })
        );

        variationsApi
            .putVariation(
                id,
                solarGenerationOutput.hmac,
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
            )
            .then((response) => {
                const { data: variation } = response;

                variations.dispatch({
                    type: VariationsActions.PREPEND_VARIATIONS,
                    payload: variation
                });

                success.setSuccessMessage('Variation has been saved');
                
                saveVariationFootprint(id, variation.id, base64Image);
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const saveVariationFootprint = async (
        id: string,
        variationId: string,
        base64Image: string
    ) => {
        loading.load();

        if (footprint === undefined) {
            console.log('Footprints are not defined');
            return;
        }

        if (footprint.shapes === undefined) {
            console.log('Footprint shapes are not defined');
            return;
        }

        if (!variationId) {
            console.log('Variation footprint could not be saved, variation undefined');
            return;
        }

        const footprintsArray: FootprintMetrics[] = [];
        if (footprint.shapes && Array.isArray(footprint.shapes)) {
            footprintsArray.push(
                ...footprint.shapes.map((shape: any) => ({
                    type: FootprintType.FOOTPRINT,
                    coordinates: shape.data.map(([latitude, longitude]: [number, number]) => ({
                        latitude,
                        longitude
                    }))
                }))
            );
        }

        if (footprint.obsticles && Array.isArray(footprint.obsticles)) {
            footprintsArray.push(
                ...footprint.obsticles.map((obsticle: any) => ({
                    type: FootprintType.OBSTRUCTION,
                    coordinates: obsticle.data.map(([latitude, longitude]: [number, number]) => ({
                        latitude,
                        longitude
                    }))
                }))
            );
        }

        const boundingBoxArray: CartesianCoordinate[] = footprint.shapes.map(shape => shape.data).flat().map(([latitude, longitude]: [number, number]) => ({
            latitude,
            longitude
        }));

        variationsApi
            .putVariationFootprint(
                id,
                variationId,
                base64Image,
                footprintsArray,
                boundingBoxArray
            )
            .then((response) => {
                const { data: variation } = response;

                variations.dispatch({
                    type: VariationsActions.PREPEND_VARIATIONS,
                    payload: variation
                });

                success.setSuccessMessage('Variation has been saved');
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    return {
        variations: variations.state,
        fetchVariations,
        fetchVariationById,
        saveVariation,
        saveVariationFootprint,
    };
};

export default useVariations;
