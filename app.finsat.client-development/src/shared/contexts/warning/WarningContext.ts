import React from 'react';
import { IReducerAction } from '../../models/IReducerAction';
import { WarningType } from '@state/warning/WarningDefaults';

interface WarningContextType {
    state: WarningType;
    dispatch: React.Dispatch<IReducerAction>;
}

const WarningContext = React.createContext<WarningContextType>(
    {} as WarningContextType
);

export default WarningContext;
