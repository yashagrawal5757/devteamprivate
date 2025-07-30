import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../shared/types/ReducerType';
import { VariationsType } from './VariationsDefaults';
import { VariationsActions } from './VariationsActions';

const VariationsReducer: ReducerType<VariationsType[], IReducerAction> = (
    state: VariationsType[],
    action: IReducerAction
) => {
    switch (action.type) {
        case VariationsActions.SET_VARIATIONS:
            return action.payload;
        case VariationsActions.PREPEND_VARIATIONS:
            return [action.payload, ...state];
        default:
            return state;
    }
};

export default VariationsReducer;
