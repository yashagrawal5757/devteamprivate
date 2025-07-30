import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../shared/types/ReducerType';
import { WatchlistsSelectQueue } from './WatchlistsSelectQueueDefaults';
import { WatchlistsSelectQueueActions } from './WatchlistsSelectQueueActions';

const WatchlistsSelectQueueReducer: ReducerType<
    WatchlistsSelectQueue,
    IReducerAction
> = (state: WatchlistsSelectQueue, action: IReducerAction) => {
    switch (action.type) {
        case WatchlistsSelectQueueActions.ADD_TO_QUEUE:
            return { ...state, queue: [...state.queue, action.payload] };
        case WatchlistsSelectQueueActions.REMOVE_FROM_QUEUE:
            return {
                ...state,
                queue: state.queue.filter(
                    (propertyId) => propertyId !== action.payload
                )
            };
        case WatchlistsSelectQueueActions.EMPTY_QUEUE:
            return {
                ...state,
                queue: []
            };
        case WatchlistsSelectQueueActions.TOGGLE_MULTI_SELECT_VALUE:
            return {
                ...state,
                isMultiSelectActive: !state.isMultiSelectActive
            };
        case WatchlistsSelectQueueActions.TOGGLE_SELECT_ALL_VALUE:
            return {
                ...state,
                isSelectAllActive: !state.isSelectAllActive
            };
        case WatchlistsSelectQueueActions.SET_SELECT_ALL_VALUE:
            return {
                ...state,
                isSelectAllActive: action.payload
            };
        default:
            return state;
    }
};

export default WatchlistsSelectQueueReducer;
