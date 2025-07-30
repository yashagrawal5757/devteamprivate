import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../shared/types/ReducerType';
import { ExploreWatchlist } from './ExploreWatchlistDefaults';
import { ExploreWatchlistActions } from './ExploreWatchlistActions';

const ExploreWatchlistReducer: ReducerType<ExploreWatchlist, IReducerAction> = (
    state: ExploreWatchlist,
    action: IReducerAction
) => {
    switch (action.type) {
        case ExploreWatchlistActions.ADD_TO_QUEUE:
            return { ...state, queue: [...state.queue, action.payload] };
        case ExploreWatchlistActions.REMOVE_FROM_QUEUE:
            return {
                ...state,
                queue: state.queue.filter(
                    (propertyId) => propertyId !== action.payload
                )
            };
        case ExploreWatchlistActions.EMPTY_QUEUE:
            return {
                ...state,
                queue: []
            };
        case ExploreWatchlistActions.TOGGLE_WATCHLIST_MODAL_VALUE:
            return {
                ...state,
                isWatchlistModalOpen: !state.isWatchlistModalOpen
            };
        case ExploreWatchlistActions.TOGGLE_MULTI_SELECT_VALUE:
            return {
                ...state,
                isMultiSelectActive: !state.isMultiSelectActive
            };
        case ExploreWatchlistActions.TOGGLE_SELECT_ALL_VALUE:
            return {
                ...state,
                isSelectAllActive: !state.isSelectAllActive
            };
        case ExploreWatchlistActions.SET_SELECT_ALL_VALUE:
            return {
                ...state,
                isSelectAllActive: action.payload
            };
        default:
            return state;
    }
};

export default ExploreWatchlistReducer;
