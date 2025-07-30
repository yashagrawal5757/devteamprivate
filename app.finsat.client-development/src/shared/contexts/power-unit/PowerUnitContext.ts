import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { PowerUnitType } from '@state/power-unit/PowerUnitDefaults';

interface PowerUnitContextType {
    state: PowerUnitType;
    dispatch: React.Dispatch<IReducerAction>;
}

const PowerUnitContext = React.createContext<PowerUnitContextType>(
    {} as PowerUnitContextType
);

export default PowerUnitContext;
