import React from 'react';
import createDataContext from '@contexts/createDataContext';
import SolarEstimateInputReducer from '../../state/solar-estimate-input/SolarEstimateInputReducer';
import SolarEstimateInputDefaults from '../../state/solar-estimate-input/SolarEstimateInputDefaults';
import SolarEstimateInputContext from './SolarEstimateInputContext';

export const SolarEstimateInputContextProvider = createDataContext(
    SolarEstimateInputReducer,
    SolarEstimateInputDefaults,
    SolarEstimateInputContext
);

export default function useSolarEstimateInputContext() {
    return React.useContext(SolarEstimateInputContext);
}
