import React from 'react';
import SimulationDataContext from './SimulationDataContext';
import createDataContext from '@contexts/createDataContext';
import SimulationDataReducer from '../../state/simulation-data/SimulationDataReducer';
import SimulationDataDefaults from '../../state/simulation-data/SimulationDataDefaults';

export const SimulationDataContextProvider = createDataContext(
    SimulationDataReducer,
    SimulationDataDefaults,
    SimulationDataContext
);

export default function useSimulationDataContext() {
    return React.useContext(SimulationDataContext);
}
