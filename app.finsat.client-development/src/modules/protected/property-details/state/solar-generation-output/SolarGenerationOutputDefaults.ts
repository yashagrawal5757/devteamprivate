import { BuildingOrientationScore } from '@enums/BuildingOrientationScore';
import { BuildingRoofShapeScore } from '@enums/BuildingRoofShapeScore';
import { Month } from '@enums/Month';
import { SolarPanelPotential } from '@enums/SolarPanelPotential';
import { SolarPanelType } from '@enums/SolarPanelType';

export type CalculateSolarPanelMonthlyMetrics = {
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

export type CalculateSolarPanelAnnualMetrics = {
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

export type CalculateSolarPanelOverallMetrics = {
    sitePotential: SolarPanelPotential;
    orientationPotential: BuildingOrientationScore;
    roofStructurePotential: BuildingRoofShapeScore;
    wattPeakPower: number;
    totalWattPeakPower: number;
};

export type CalculateSolarPanelPredictedMetrics = {
    cashFlow: number;
};

export type SolarGenerationOutputType = {
    hmac: string;
    monthlyMetrics: Array<CalculateSolarPanelMonthlyMetrics>;
    annualMetrics: CalculateSolarPanelAnnualMetrics;
    overallMetrics: CalculateSolarPanelOverallMetrics;
    predictedMetrics: CalculateSolarPanelPredictedMetrics;
};

const SolarGenerationOutputDefaults: SolarGenerationOutputType | undefined =
    undefined;

export default SolarGenerationOutputDefaults;
