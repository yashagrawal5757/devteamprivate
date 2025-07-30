import React from 'react';
import createDataContext from '@contexts/createDataContext';
import SolarFinancialOutputReducer from '../../state/solar-financial-output/SolarFinancialOutputReducer';
import SolarFinancialOutputDefaults from '../../state/solar-financial-output/SolarFinancialOutputDefaults';
import SolarFinancialOutputContext from './SolarFinancialOutputContext';

export const SolarFinancialOutputContextProvider = createDataContext(
    SolarFinancialOutputReducer,
    SolarFinancialOutputDefaults,
    SolarFinancialOutputContext
);

export default function useSolarFinancialOutputContext() {
    return React.useContext(SolarFinancialOutputContext);
}
