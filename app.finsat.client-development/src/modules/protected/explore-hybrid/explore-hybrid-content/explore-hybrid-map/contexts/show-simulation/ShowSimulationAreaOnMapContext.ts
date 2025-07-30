import React from 'react';
import { IReducerAction } from '@models/IReducerAction';

interface ShowSimulationAreaOnMapContextType {
    state: boolean;
    dispatch: React.Dispatch<IReducerAction>;
}

const ShowSimulationAreaOnMapContext =
    React.createContext<ShowSimulationAreaOnMapContextType>(
        {} as ShowSimulationAreaOnMapContextType
    );

export default ShowSimulationAreaOnMapContext;
