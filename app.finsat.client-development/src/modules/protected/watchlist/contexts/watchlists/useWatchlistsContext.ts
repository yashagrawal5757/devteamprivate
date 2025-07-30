import React from 'react';
import createDataContext from '@contexts/createDataContext';
import WatchlistsReducer from '@watchlist/state/watchlists/WatchlistsReducer';
import WatchlistsDefaults from '@watchlist/state/watchlists/WatchlistsDefaults';
import WatchlistsContext from './WatchlistsContext';

export const WatchlistsContextProvider = createDataContext(
    WatchlistsReducer,
    WatchlistsDefaults,
    WatchlistsContext
);

export default function useWatchlistsContext() {
    return React.useContext(WatchlistsContext);
}
