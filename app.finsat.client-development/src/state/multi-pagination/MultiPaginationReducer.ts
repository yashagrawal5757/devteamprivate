import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../shared/types/ReducerType';
import MultiPaginationDefaults, {
    MultiPaginationType,
    PaginationDefaults
} from './MultiPaginationDefaults';
import { MultiPaginationActions } from './MultiPaginationActions';

const MultiPaginationReducer: ReducerType<
    Array<MultiPaginationType>,
    IReducerAction
> = (state: Array<MultiPaginationType>, action: IReducerAction) => {
    switch (action.type) {
        case MultiPaginationActions.SET_PAGINATIONS:
            return action.payload;
        case MultiPaginationActions.ADD_PAGINATION:
            return [...state, action.payload];
        case MultiPaginationActions.INIT_PAGINATION:
            return [
                ...state,
                { id: action.payload, pagination: PaginationDefaults }
            ];
        case MultiPaginationActions.SET_WATCHLIST_PAGINATION:
            return state.map((stateValue) => {
                if (stateValue.id === action.payload.watchlistId) {
                    stateValue.pagination = action.payload.pagination;
                }

                return stateValue;
            });
        case MultiPaginationActions.RESET_PAGINATION:
            return MultiPaginationDefaults;
        default:
            return state;
    }
};

export default MultiPaginationReducer;
