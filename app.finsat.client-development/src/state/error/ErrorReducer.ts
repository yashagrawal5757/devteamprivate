import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../shared/types/ReducerType';
import { ErrorActions } from './ErrorActions';
import { ErrorType } from './ErrorDefaults';

const ErrorReducer: ReducerType<ErrorType, IReducerAction> = (
    state: ErrorType,
    action: IReducerAction
) => {
    switch (action.type) {
        case ErrorActions.SET_ERROR:
            return { isError: true, message: action.payload };
        case ErrorActions.CLEAR_ERROR:
            return { isError: false, message: '' };
        default:
            return state;
    }
};

export default ErrorReducer;
