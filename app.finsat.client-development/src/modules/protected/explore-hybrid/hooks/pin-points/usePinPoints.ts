import React from 'react';
import usePinPointsContext from '../../contexts/pin-points/usePinPointsContext';
import { PinPoint } from '../../state/pin-points/PinPointsDefaults';
import { PinPointsActions } from '../../state/pin-points/PinPointsActions';

const usePinPoints = () => {
    const pinPointsContext = usePinPointsContext();

    const setPinPoints = (pinPoints: Array<PinPoint>) => {
        pinPointsContext.dispatch({
            type: PinPointsActions.SET_PIN_POINTS,
            payload: pinPoints
        });
    };

    const addPinPoint = (pinPoint: PinPoint) => {
        pinPointsContext.dispatch({
            type: PinPointsActions.ADD_PIN_POINT,
            payload: pinPoint
        });
    };

    return {
        pinPoints: pinPointsContext.state,
        setPinPoints,
        addPinPoint
    };
};

export default usePinPoints;
