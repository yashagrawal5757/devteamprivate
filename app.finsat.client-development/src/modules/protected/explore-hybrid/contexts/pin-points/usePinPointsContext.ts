import React from 'react';
import createDataContext from '@contexts/createDataContext';
import PinPointsContext from './PinPointsContext';
import PinPointsReducer from '../../state/pin-points/PinPointsReducer';
import { PinPointsDefaults } from '../../state/pin-points/PinPointsDefaults';

export const PinPointsContextProvider = createDataContext(
    PinPointsReducer,
    PinPointsDefaults,
    PinPointsContext
);

export default function usePinPointsContext() {
    return React.useContext(PinPointsContext);
}
