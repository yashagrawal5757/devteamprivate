export type CalculateSolarPanelFinancialPredictionMetrics = {
    discountRate: number;
    netPresentValue: number;
    internalRateOfReturn: number;
    paybackPeriod: number;
};

export type CalculateSolarPanelFinancialInputData = {
    systemCost: number;
    discountRate: number;
    projectLifetime: number;
    cashFlows: Array<number>;
};

export type SolarFinancialOutputType = {
    predictions: Array<CalculateSolarPanelFinancialPredictionMetrics>;
    input: CalculateSolarPanelFinancialInputData;
};

const SolarFinancialOutputDefaults: SolarFinancialOutputType | undefined =
    undefined;

export default SolarFinancialOutputDefaults;
