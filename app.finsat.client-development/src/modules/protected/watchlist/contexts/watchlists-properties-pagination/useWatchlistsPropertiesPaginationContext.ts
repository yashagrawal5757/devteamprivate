import React from 'react';
import createDataContext from '@contexts/createDataContext';
import MultiPaginationReducer from '@state/multi-pagination/MultiPaginationReducer';
import MultiPaginationDefaults from '@state/multi-pagination/MultiPaginationDefaults';
import WatchlistsPropertiesPaginationContext from './WatchlistsPropertiesPaginationContext';

export const WatchlistsPropertiesPaginationContextProvider = createDataContext(
    MultiPaginationReducer,
    MultiPaginationDefaults,
    WatchlistsPropertiesPaginationContext
);

export default function useWatchlistsPropertiesPaginationContext() {
    return React.useContext(WatchlistsPropertiesPaginationContext);
}
