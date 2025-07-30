import ReducerType from '@custom-types/ReducerType';
import { IReducerAction } from '@models/IReducerAction';
import { PinPoint } from './PinPointsDefaults';
import { PinPointsActions } from './PinPointsActions';

const PinPointsReducer: ReducerType<Array<PinPoint>, IReducerAction> = (
    state: Array<PinPoint>,
    action: IReducerAction
) => {
    switch (action.type) {
        case PinPointsActions.SET_PIN_POINTS:
            return action.payload;
        case PinPointsActions.CLEAR_PIN_POINTS:
            return [];
        case PinPointsActions.ADD_PIN_POINT:
            return [...state, action.payload];
        default:
            return state;
    }
};

export default PinPointsReducer;
