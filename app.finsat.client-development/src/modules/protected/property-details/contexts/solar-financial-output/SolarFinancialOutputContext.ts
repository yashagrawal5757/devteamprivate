import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { SolarFinancialOutputType } from '../../state/solar-financial-output/SolarFinancialOutputDefaults';

interface SolarFinancialOutputContextType {
    state: SolarFinancialOutputType | undefined;
    dispatch: React.Dispatch<IReducerAction>;
}

const SolarFinancialOutputContext =
    React.createContext<SolarFinancialOutputContextType>(
        {} as SolarFinancialOutputContextType
    );

export default SolarFinancialOutputContext;
