import React from 'react';
import createDataContext from '@contexts/createDataContext';
import WatchlistsSelectQueueDefaults from '@watchlist/state/watchlists-select-queue/WatchlistsSelectQueueDefaults';
import WatchlistsSelectQueueContext from './WatchlistsSelectQueueContext';
import WatchlistsSelectQueueReducer from '@watchlist/state/watchlists-select-queue/WatchlistsSelectQueueReducer';

export const WatchlistsSelectQueueContextProvider = createDataContext(
    WatchlistsSelectQueueReducer,
    WatchlistsSelectQueueDefaults,
    WatchlistsSelectQueueContext
);

export default function useWatchlistsSelectQueueContext() {
    return React.useContext(WatchlistsSelectQueueContext);
}
