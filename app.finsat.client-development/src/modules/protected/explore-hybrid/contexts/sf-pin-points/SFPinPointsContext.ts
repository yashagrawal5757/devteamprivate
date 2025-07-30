import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { SFPinPoint } from '@explore/state/sf-pin-points/SFPinPointsDefaults';

interface SFPinPointsContextType {
    state: Array<SFPinPoint>;
    dispatch: React.Dispatch<IReducerAction>;
}

const SFPinPointsContext = React.createContext<SFPinPointsContextType>(
    {} as SFPinPointsContextType
);

export default SFPinPointsContext;
