import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../shared/types/ReducerType';
import { SuccessActions } from './SuccessActions';
import { SuccessType } from './SuccessDefaults';

const SuccessReducer: ReducerType<SuccessType, IReducerAction> = (
    state: SuccessType,
    action: IReducerAction
) => {
    switch (action.type) {
        case SuccessActions.SET_SUCCESS:
            return { isSuccess: true, message: action.payload };
        case SuccessActions.CLEAR_SUCCESS:
            return { isSuccess: false, message: '' };
        default:
            return state;
    }
};

export default SuccessReducer;
