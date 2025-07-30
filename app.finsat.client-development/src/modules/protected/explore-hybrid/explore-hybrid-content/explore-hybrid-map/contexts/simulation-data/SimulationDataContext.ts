import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { SimulationData } from '../../state/simulation-data/SimulationDataDefaults';

interface SimulationDataContextType {
    state: Array<SimulationData>;
    dispatch: React.Dispatch<IReducerAction>;
}

const SimulationDataContext = React.createContext<SimulationDataContextType>(
    {} as SimulationDataContextType
);

export default SimulationDataContext;
