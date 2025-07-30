import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../shared/types/ReducerType';
import { LoadingActions } from './LoadingActions';
import { LoadingType } from './LoadingDefaults';

const LoadingReducer: ReducerType<LoadingType, IReducerAction> = (
    state: LoadingType,
    action: IReducerAction
) => {
    switch (action.type) {
        case LoadingActions.LOADING:
            return { isLoading: true };
        case LoadingActions.LOADED:
            return { isLoading: false };
        default:
            return state;
    }
};

export default LoadingReducer;
