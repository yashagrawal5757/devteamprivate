import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../shared/types/ReducerType';
import { PropertyDetailsWatchlist } from './PropertyDetailsWatchlistDefaults';
import { PropertyDetailsWatchlistActions } from './PropertyDetailsWatchlistActions';

const PropertyDetailsWatchlistReducer: ReducerType<
    PropertyDetailsWatchlist,
    IReducerAction
> = (state: PropertyDetailsWatchlist, action: IReducerAction) => {
    switch (action.type) {
        case PropertyDetailsWatchlistActions.ADD_TO_QUEUE:
            return { ...state, queue: [...state.queue, action.payload] };
        case PropertyDetailsWatchlistActions.EMPTY_QUEUE:
            return {
                ...state,
                queue: []
            };
        case PropertyDetailsWatchlistActions.TOGGLE_WATCHLIST_MODAL_VALUE:
            return {
                ...state,
                isWatchlistModalOpen: !state.isWatchlistModalOpen
            };
        default:
            return state;
    }
};

export default PropertyDetailsWatchlistReducer;
