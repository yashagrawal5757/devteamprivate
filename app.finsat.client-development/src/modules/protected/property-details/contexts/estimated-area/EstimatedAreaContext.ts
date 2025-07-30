import React from 'react';
import { IReducerAction } from '@models/IReducerAction';

interface EstimatedAreaContextType {
    state: number | undefined;
    dispatch: React.Dispatch<IReducerAction>;
}

const EstimatedAreaContext =
    React.createContext<EstimatedAreaContextType>(
        {} as EstimatedAreaContextType
    );

export default EstimatedAreaContext;
