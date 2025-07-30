import React from 'react';
import { LoadingType } from '../../../state/loading/LoadingDefaults';
import { IReducerAction } from '../../models/IReducerAction';

interface LoadingContextType {
    state: LoadingType;
    dispatch: React.Dispatch<IReducerAction>;
}

const LoadingContext = React.createContext<LoadingContextType>(
    {} as LoadingContextType
);

export default LoadingContext;
