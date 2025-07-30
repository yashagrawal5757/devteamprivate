import ReducerType from '@custom-types/ReducerType';
import { IReducerAction } from '@models/IReducerAction';
import { SFPinPoint } from './SFPinPointsDefaults';
import { SFPinPointsActions } from './SFPinPointsActions';

const SFPinPointsReducer: ReducerType<Array<SFPinPoint>, IReducerAction> = (
    state: Array<SFPinPoint>,
    action: IReducerAction
) => {
    switch (action.type) {
        case SFPinPointsActions.SET_SF_PIN_POINTS:
            return action.payload;
        case SFPinPointsActions.ADD_SF_PIN_POINT:
            return [...state, action.payload];
        case SFPinPointsActions.CLEAR_SF_PIN_POINTS:
            return [];
        default:
            return state;
    }
};

export default SFPinPointsReducer;
