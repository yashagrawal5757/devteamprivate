import React from 'react';
import createDataContext from '@contexts/createDataContext';
import PaginationReducer from '@state/pagination/PaginationReducer';
import PaginationDefaults from '@state/pagination/PaginationDefaults';
import WatchlistsPaginationContext from './WatchlistsPaginationContext';

export const WatchlistsPaginationContextProvider = createDataContext(
    PaginationReducer,
    PaginationDefaults,
    WatchlistsPaginationContext
);

export default function useWatchlistsPaginationContext() {
    return React.useContext(WatchlistsPaginationContext);
}
