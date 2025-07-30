import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../shared/types/ReducerType';
import PaginationDefaults, { PaginationType } from './PaginationDefaults';
import { PaginationActions } from './PaginationActions';

const PaginationReducer: ReducerType<PaginationType, IReducerAction> = (
    state: PaginationType,
    action: IReducerAction
) => {
    switch (action.type) {
        case PaginationActions.SET_PAGINATION:
            return action.payload;
        case PaginationActions.RESET_PAGINATION:
            return PaginationDefaults;
        default:
            return state;
    }
};

export default PaginationReducer;
