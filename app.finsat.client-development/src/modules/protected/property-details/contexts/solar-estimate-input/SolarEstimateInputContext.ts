import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { SolarEstimateInputType } from '../../state/solar-estimate-input/SolarEstimateInputDefaults';

interface SolarEstimateInputContextType {
    state: SolarEstimateInputType;
    dispatch: React.Dispatch<IReducerAction>;
}

const SolarEstimateInputContext =
    React.createContext<SolarEstimateInputContextType>(
        {} as SolarEstimateInputContextType
    );

export default SolarEstimateInputContext;
