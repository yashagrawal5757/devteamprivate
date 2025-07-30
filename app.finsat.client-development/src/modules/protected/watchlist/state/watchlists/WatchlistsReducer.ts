import { IReducerAction } from '@models/IReducerAction';
import { WatchlistType } from './WatchlistsDefaults';
import ReducerType from '../../../../../shared/types/ReducerType';
import { WatchlistsActions } from './WatchlistsActions';

const WatchlistsReducer: ReducerType<WatchlistType[], IReducerAction> = (
    state: WatchlistType[],
    action: IReducerAction
) => {
    switch (action.type) {
        case WatchlistsActions.SET_WATCHLISTS:
            return action.payload;
        case WatchlistsActions.APPEND_WATCHLISTS:
            const combined = [...state, ...action.payload];
            const unique = Array.from(
                new Map(combined.map((item) => [item.id, item])).values()
            );
            return unique;
        case WatchlistsActions.SET_WATCHLIST_PROPERTIES:
            return state.map((watchlist) => {
                if (watchlist.id === action.payload.watchlistId) {
                    return {
                        ...watchlist,
                        properties: action.payload.properties
                    };
                }

                return watchlist;
            });
        case WatchlistsActions.APPEND_WATCHLIST_PROPERTIES:
            return state.map((watchlist) => {
                if (watchlist.id === action.payload.watchlistId) {
                    return {
                        ...watchlist,
                        properties: {
                            ...watchlist.properties,
                            ...action.payload.properties
                        }
                    };
                }

                return watchlist;
            });
        case WatchlistsActions.REMOVE_WATCHLISTS:
            return state.filter(
                (watchlist) => !action.payload.includes(watchlist.id)
            );
        case WatchlistsActions.EMPTY_WATCHLISTS:
            return [];
        case WatchlistsActions.REMOVE_WATCHLIST_PROPERTIES:
            return state.map((watchlist) => {
                if (watchlist.id !== action.payload.watchlistId) {
                    return watchlist;
                }

                return {
                    ...watchlist,
                    properties: watchlist.properties.filter(
                        (property) =>
                            !action.payload.variationIds.includes(
                                property.variationId
                            )
                    )
                };
            });
        case WatchlistsActions.EMPTY_WATCHLIST_PROPERTIES:
            return state.map((watchlist) => {
                if (watchlist.id !== action.payload) {
                    return watchlist;
                }

                return {
                    ...watchlist,
                    properties: []
                };
            });
        case WatchlistsActions.PREPEND_WATCHLISTS:
            return [action.payload, ...state];
        default:
            return state;
    }
};

export default WatchlistsReducer;
