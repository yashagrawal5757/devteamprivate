import useWatchlistsSelectQueueContext from '@watchlist/contexts/watchlists-select-queue/useWatchlistsSelectQueueContext';
import { WatchlistsSelectQueueActions } from '@watchlist/state/watchlists-select-queue/WatchlistsSelectQueueActions';

const useWatchlistsSelectQueue = () => {
    const watchlistsSelectQueueContext = useWatchlistsSelectQueueContext();

    const addToQueue = (id: string) => {
        watchlistsSelectQueueContext.dispatch({
            type: WatchlistsSelectQueueActions.ADD_TO_QUEUE,
            payload: id
        });
    };

    const addAllToQueue = (watchlistIds: Array<string>) => {
        for (const id of watchlistIds) {
            addToQueue(id);
        }
    };

    const removeFromQueue = (id: string) => {
        watchlistsSelectQueueContext.dispatch({
            type: WatchlistsSelectQueueActions.REMOVE_FROM_QUEUE,
            payload: id
        });
    };

    const removeAllFromQueue = () => {
        watchlistsSelectQueueContext.dispatch({
            type: WatchlistsSelectQueueActions.EMPTY_QUEUE
        });
    };

    const toggleWatchlistsMultiSelect = () => {
        watchlistsSelectQueueContext.dispatch({
            type: WatchlistsSelectQueueActions.TOGGLE_MULTI_SELECT_VALUE
        });

        removeAllFromQueue();
    };

    const toggleSelectAll = () => {
        watchlistsSelectQueueContext.dispatch({
            type: WatchlistsSelectQueueActions.TOGGLE_SELECT_ALL_VALUE
        });
    };

    const setSelectAllValue = (selectAll: boolean) => {
        watchlistsSelectQueueContext.dispatch({
            type: WatchlistsSelectQueueActions.SET_SELECT_ALL_VALUE,
            payload: selectAll
        });
    };

    return {
        watchlistsSelectQueue: watchlistsSelectQueueContext.state,
        addToQueue,
        addAllToQueue,
        removeFromQueue,
        removeAllFromQueue,
        toggleWatchlistsMultiSelect,
        toggleSelectAll,
        setSelectAllValue
    };
};

export default useWatchlistsSelectQueue;
