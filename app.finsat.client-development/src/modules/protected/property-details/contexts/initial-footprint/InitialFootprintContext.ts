import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { InitialFootprintType } from '../../state/initial-footprint/InitialFootprintDefaults';

interface InitialFootprintContextType {
    state: InitialFootprintType;
    dispatch: React.Dispatch<IReducerAction>;
}

const InitialFootprintContext =
    React.createContext<InitialFootprintContextType>(
        {} as InitialFootprintContextType
    );

export default InitialFootprintContext;
