import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { PinPoint } from '../../state/pin-points/PinPointsDefaults';

interface PinPointsContextType {
    state: Array<PinPoint>;
    dispatch: React.Dispatch<IReducerAction>;
}

const PinPointsContext = React.createContext<PinPointsContextType>(
    {} as PinPointsContextType
);

export default PinPointsContext;
