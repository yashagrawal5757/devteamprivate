import React from 'react';
import createDataContext from '@contexts/createDataContext';
import SFPinPointsContext from './SFPinPointsContext';
import SFPinPointsReducer from '@explore/state/sf-pin-points/SFPinPointsReducer';
import { SFPinPointsDefaults } from '@explore/state/sf-pin-points/SFPinPointsDefaults';

export const SFPinPointsContextProvider = createDataContext(
    SFPinPointsReducer,
    SFPinPointsDefaults,
    SFPinPointsContext
);

export default function useSFPinPointsContext() {
    return React.useContext(SFPinPointsContext);
}
