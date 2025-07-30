import React from 'react';
import createDataContext from '@contexts/createDataContext';
import ExploreWatchlistContext from './ExploreWatchlistContext';
import ExploreWatchlistReducer from '../../state/explore-watchlist/ExploreWatchlistReducer';
import ExploreWatchlistDefaults from '../../state/explore-watchlist/ExploreWatchlistDefaults';

export const ExploreWatchlistContextProvider = createDataContext(
    ExploreWatchlistReducer,
    ExploreWatchlistDefaults,
    ExploreWatchlistContext
);

export default function useExploreWatchlistContext() {
    return React.useContext(ExploreWatchlistContext);
}
