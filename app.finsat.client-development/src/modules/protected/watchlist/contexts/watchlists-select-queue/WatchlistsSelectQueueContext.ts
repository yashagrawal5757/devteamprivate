import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { WatchlistsSelectQueue } from '@watchlist/state/watchlists-select-queue/WatchlistsSelectQueueDefaults';

interface WatchlistsSelectQueueContextType {
    state: WatchlistsSelectQueue;
    dispatch: React.Dispatch<IReducerAction>;
}

const WatchlistsSelectQueueContext =
    React.createContext<WatchlistsSelectQueueContextType>(
        {} as WatchlistsSelectQueueContextType
    );

export default WatchlistsSelectQueueContext;
