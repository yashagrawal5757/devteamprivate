import React from 'react';
import createDataContext from '@contexts/createDataContext';
import PropertyDetailsWatchlistContext from './PropertyDetailsWatchlistContext';
import PropertyDetailsWatchlistReducer from '../../state/property-details-watchlist/PropertyDetailsWatchlistReducer';
import PropertyDetailsWatchlistDefaults from '../../state/property-details-watchlist/PropertyDetailsWatchlistDefaults';

export const PropertyDetailsWatchlistContextProvider = createDataContext(
    PropertyDetailsWatchlistReducer,
    PropertyDetailsWatchlistDefaults,
    PropertyDetailsWatchlistContext
);

export default function usePropertyDetailsWatchlistContext() {
    return React.useContext(PropertyDetailsWatchlistContext);
}
