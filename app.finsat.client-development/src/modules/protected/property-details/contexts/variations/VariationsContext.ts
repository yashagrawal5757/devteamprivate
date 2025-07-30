import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { VariationsType } from '../../state/variations/VariationsDefaults';

interface VariationsContextType {
    state: VariationsType[];
    dispatch: React.Dispatch<IReducerAction>;
}

const VariationsContext = React.createContext<VariationsContextType>(
    {} as VariationsContextType
);

export default VariationsContext;
