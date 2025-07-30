import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { WatchlistType } from '@watchlist/state/watchlists/WatchlistsDefaults';

interface WatchlistsContextType {
    state: WatchlistType[];
    dispatch: React.Dispatch<IReducerAction>;
}

const WatchlistsContext = React.createContext<WatchlistsContextType>(
    {} as WatchlistsContextType
);

export default WatchlistsContext;
