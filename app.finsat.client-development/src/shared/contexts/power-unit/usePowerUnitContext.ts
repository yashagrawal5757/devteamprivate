import React from 'react';
import createDataContext from '@contexts/createDataContext';
import PowerUnitContext from './PowerUnitContext';
import PowerUnitReducer from '@state/power-unit/PowerUnitReducer';
import PowerUnitDefaults from '@state/power-unit/PowerUnitDefaults';

export const PowerUnitContextProvider = createDataContext(
    PowerUnitReducer,
    PowerUnitDefaults,
    PowerUnitContext
);

export default function usePowerUnitContext() {
    return React.useContext(PowerUnitContext);
}
