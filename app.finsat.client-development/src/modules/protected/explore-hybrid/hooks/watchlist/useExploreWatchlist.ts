import React from 'react';
import useExploreWatchlistContext from '../../contexts/explore-watchlist/useExploreWatchlistContext';
import { ExploreWatchlistActions } from '../../state/explore-watchlist/ExploreWatchlistActions';
import useProperties from '../properties/useProperties';
import usePinPoints from '../pin-points/usePinPoints';

const useExploreWatchlist = () => {
    const exploreWatchlistContext = useExploreWatchlistContext();
    const { properties } = useProperties();
    const { pinPoints } = usePinPoints();

    const addToWatchlistQueue = (id: string) => {
        exploreWatchlistContext.dispatch({
            type: ExploreWatchlistActions.ADD_TO_QUEUE,
            payload: id
        });
    };

    const addAllToWatchlistQueue = () => {
        const ids = pinPoints.map((property) => property.id);

        for (const id of ids) {
            if (id === undefined) {
                return;
            }

            addToWatchlistQueue(id);
        }
    };

    const removeFromWatchlistQueue = (id: string) => {
        exploreWatchlistContext.dispatch({
            type: ExploreWatchlistActions.REMOVE_FROM_QUEUE,
            payload: id
        });
    };

    const removeAllFromWatchlistQueue = () => {
        exploreWatchlistContext.dispatch({
            type: ExploreWatchlistActions.EMPTY_QUEUE
        });
    };

    const toggleWatchlistModal = () => {
        exploreWatchlistContext.dispatch({
            type: ExploreWatchlistActions.TOGGLE_WATCHLIST_MODAL_VALUE
        });
    };

    const togglePropertiesMultiSelect = () => {
        exploreWatchlistContext.dispatch({
            type: ExploreWatchlistActions.TOGGLE_MULTI_SELECT_VALUE
        });

        removeAllFromWatchlistQueue();
    };

    const emptyQueueAndToggleWatchlistModal = () => {
        removeAllFromWatchlistQueue();
        toggleWatchlistModal();
    };

    const toggleSelectAll = () => {
        exploreWatchlistContext.dispatch({
            type: ExploreWatchlistActions.TOGGLE_SELECT_ALL_VALUE
        });
    };

    const setSelectAllValue = (selectAll: boolean) => {
        exploreWatchlistContext.dispatch({
            type: ExploreWatchlistActions.SET_SELECT_ALL_VALUE,
            payload: selectAll
        });
    };

    return {
        exploreWatchlist: exploreWatchlistContext.state,
        addToWatchlistQueue,
        addAllToWatchlistQueue,
        removeFromWatchlistQueue,
        removeAllFromWatchlistQueue,
        toggleWatchlistModal,
        togglePropertiesMultiSelect,
        emptyQueueAndToggleWatchlistModal,
        toggleSelectAll,
        setSelectAllValue
    };
};

export default useExploreWatchlist;
