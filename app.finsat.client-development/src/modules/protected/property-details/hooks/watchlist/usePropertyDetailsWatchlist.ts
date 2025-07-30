import React from 'react';
import { PropertyDetailsWatchlistActions } from '../../state/property-details-watchlist/PropertyDetailsWatchlistActions';
import usePropertyDetailsWatchlistContext from '../../contexts/property-details-watchlist/usePropertyDetailsWatchlistContext';

const usePropertyDetailsWatchlist = () => {
    const propertyDetailsWatchlistContext =
        usePropertyDetailsWatchlistContext();

    const addToWatchlistQueue = (id: string) => {
        propertyDetailsWatchlistContext.dispatch({
            type: PropertyDetailsWatchlistActions.ADD_TO_QUEUE,
            payload: id
        });
    };

    const removeAllFromWatchlistQueue = () => {
        propertyDetailsWatchlistContext.dispatch({
            type: PropertyDetailsWatchlistActions.EMPTY_QUEUE
        });
    };

    const toggleWatchlistModal = () => {
        propertyDetailsWatchlistContext.dispatch({
            type: PropertyDetailsWatchlistActions.TOGGLE_WATCHLIST_MODAL_VALUE
        });
    };

    const emptyQueueAndToggleWatchlistModal = () => {
        removeAllFromWatchlistQueue();
        toggleWatchlistModal();
    };

    return {
        exploreWatchlist: propertyDetailsWatchlistContext.state,
        addToWatchlistQueue,
        toggleWatchlistModal,
        emptyQueueAndToggleWatchlistModal
    };
};

export default usePropertyDetailsWatchlist;
