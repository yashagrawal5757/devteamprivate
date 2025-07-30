import useSFPinPointsContext from '@explore/contexts/sf-pin-points/useSFPinPointsContext';
import { SFPinPointsActions } from '@explore/state/sf-pin-points/SFPinPointsActions';
import { SFPinPoint } from '@explore/state/sf-pin-points/SFPinPointsDefaults';
import React from 'react';

const useSFPinPoints = () => {
    const sfPinPointsContext = useSFPinPointsContext();

    const addSFPinPoint = (pinPoint: SFPinPoint) => {
        sfPinPointsContext.dispatch({
            type: SFPinPointsActions.ADD_SF_PIN_POINT,
            payload: pinPoint
        });
    };

    const setSFPinPoints = (pinPoints: Array<SFPinPoint>) => {
        sfPinPointsContext.dispatch({
            type: SFPinPointsActions.SET_SF_PIN_POINTS,
            payload: pinPoints
        });
    };

    return {
        sfPinPoints: sfPinPointsContext.state,
        setSFPinPoints,
        addSFPinPoint
    };
};

export default useSFPinPoints;
