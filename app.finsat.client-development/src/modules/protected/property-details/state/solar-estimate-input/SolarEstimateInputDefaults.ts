import { AreaConfigurationType } from '@enums/AreaConfigurationType';
import { SolarPanelType } from '@enums/SolarPanelType';

export type SolarPanelMetrics = {
    type: SolarPanelType | null | undefined;
    panelHorizontalLength: number | null | undefined;
    panelVerticalLength: number | null | undefined;
    panelEfficiency: number | null | undefined;
    areaConfigurationType: AreaConfigurationType | null | undefined;
    areaConfigurationValue: number | null | undefined;
    slope: number | null | undefined;
    revenuePerKWh: number | null | undefined;
    electricityPrice: number | null | undefined;
    maintenanceCost: number | null | undefined;
    totalAvailableSpace: number;
};

export type FinancialMetrics = {
    systemCost: number | null | undefined;
    discountRate: number | null | undefined;
    projectLifetime: number | null | undefined;
    cashFlows: Array<number | null | undefined>;
};

export type SolarEstimateInputType = {
    solarPanelMetrics: SolarPanelMetrics;
    financialMetrics: FinancialMetrics;
};

const SolarEstimateInputDefaults: SolarEstimateInputType = {
    solarPanelMetrics: {
        type: SolarPanelType.MONOCRYSTALLINE,
        panelHorizontalLength: 0.99,
        panelVerticalLength: 1.65,
        panelEfficiency: 20,
        areaConfigurationType: AreaConfigurationType.BY_PANELS,
        areaConfigurationValue: 1,
        slope: 10,
        revenuePerKWh: 1,
        electricityPrice: 1,
        maintenanceCost: 1,
        totalAvailableSpace: 1
    },
    financialMetrics: {
        systemCost: 1,
        discountRate: 1,
        projectLifetime: 1,
        cashFlows: [1]
    }
};

export default SolarEstimateInputDefaults;
