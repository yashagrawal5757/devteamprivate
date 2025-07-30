import usePropertiesSelectQueueContext from '../contexts/properties-select-queue/usePropertiesSelectQueueContext';
import { PropertiesSelectQueueActions } from '../state/properties-select-queue/PropertiesSelectQueueActions';

const usePropertiesSelectQueue = () => {
    const propertiesSelectQueueContext = usePropertiesSelectQueueContext();

    const initPropertyQueueForWatchlist = (watchlistId: string) => {
        propertiesSelectQueueContext.dispatch({
            type: PropertiesSelectQueueActions.INSERT_WATCHLIST,
            payload: watchlistId
        });
    };

    const addToQueue = (watchlistId: string, variationId: string) => {
        propertiesSelectQueueContext.dispatch({
            type: PropertiesSelectQueueActions.ADD_TO_QUEUE,
            payload: { watchlistId, variationId }
        });
    };

    const addAllToQueue = (
        watchlistId: string,
        variationIds: Array<string>
    ) => {
        for (const variationId of variationIds) {
            addToQueue(watchlistId, variationId);
        }
    };

    const removeFromQueue = (watchlistId: string, variationId: string) => {
        propertiesSelectQueueContext.dispatch({
            type: PropertiesSelectQueueActions.REMOVE_FROM_QUEUE,
            payload: { watchlistId, variationId }
        });
    };

    const removeAllFromQueue = (watchlistId: string) => {
        propertiesSelectQueueContext.dispatch({
            type: PropertiesSelectQueueActions.EMPTY_QUEUE,
            payload: watchlistId
        });
    };

    const toggleSelectAll = (watchlistId: string) => {
        propertiesSelectQueueContext.dispatch({
            type: PropertiesSelectQueueActions.TOGGLE_SELECT_ALL_VALUE,
            payload: watchlistId
        });
    };

    const setSelectAllValue = (
        watchlistId: string,
        isSelectAllActive: boolean
    ) => {
        propertiesSelectQueueContext.dispatch({
            type: PropertiesSelectQueueActions.SET_SELECT_ALL_VALUE,
            payload: { watchlistId, isSelectAllActive }
        });
    };

    const removeWatchlist = (watchlistId: string) => {
        propertiesSelectQueueContext.dispatch({
            type: PropertiesSelectQueueActions.REMOVE_WATCHLIST,
            payload: watchlistId
        });
    };

    const removeAllWatchlists = () => {
        propertiesSelectQueueContext.dispatch({
            type: PropertiesSelectQueueActions.REMOVE_ALL_WATCHLISTS
        });
    };

    return {
        propertiesSelectQueue: propertiesSelectQueueContext.state,
        initPropertyQueueForWatchlist,
        addToQueue,
        addAllToQueue,
        removeFromQueue,
        removeAllFromQueue,
        toggleSelectAll,
        setSelectAllValue,
        removeWatchlist,
        removeAllWatchlists
    };
};

export default usePropertiesSelectQueue;
