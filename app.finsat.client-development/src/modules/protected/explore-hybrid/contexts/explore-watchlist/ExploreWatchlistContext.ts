import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { ExploreWatchlist } from '../../state/explore-watchlist/ExploreWatchlistDefaults';

interface ExploreWatchlistContextType {
    state: ExploreWatchlist;
    dispatch: React.Dispatch<IReducerAction>;
}

const ExploreWatchlistContext =
    React.createContext<ExploreWatchlistContextType>(
        {} as ExploreWatchlistContextType
    );

export default ExploreWatchlistContext;
