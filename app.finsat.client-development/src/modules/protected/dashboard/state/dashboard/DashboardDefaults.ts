import { Month } from '@enums/Month';

export type AnnualPredictionsType = {
    energyGeneration: number;
    energyRevenue: number;
};

export type MonthlyPredictionsType = {
    month: Month;
    energyGeneration: number;
    energyRevenue: number;
    coefficient: number;
};

export type CashFlowPredictionsType = {
    year: number;
    cashFlow: number;
};

export type DashboardDataType = {
    annualPredictions: AnnualPredictionsType;
    monthlyPredictions: Array<MonthlyPredictionsType>;
    cashFlowPredictions: Array<CashFlowPredictionsType>;
};

const DashboardDefaults: DashboardDataType = {
    annualPredictions: {
        energyGeneration: 0,
        energyRevenue: 0
    },
    monthlyPredictions: [],
    cashFlowPredictions: []
};

export default DashboardDefaults;
