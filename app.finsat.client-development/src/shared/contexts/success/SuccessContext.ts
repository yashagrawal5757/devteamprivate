import React from 'react';
import { IReducerAction } from '../../models/IReducerAction';
import { SuccessType } from '../../../state/success/SuccessDefaults';

interface SuccessContextType {
    state: SuccessType;
    dispatch: React.Dispatch<IReducerAction>;
}

const SuccessContext = React.createContext<SuccessContextType>(
    {} as SuccessContextType
);

export default SuccessContext;
