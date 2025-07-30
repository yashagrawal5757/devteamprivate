import React from 'react';
import createDataContext from '@contexts/createDataContext';
import ExistingWatchlistsReducer from '../../state/existing-watchlists/ExistingWatchlistsReducer';
import ExistingWatchlistDefaults from '../../state/existing-watchlists/ExistingWatchlistsDefaults';
import ExistingWatchlistsContext from './ExistingWatchlistsContext';

export const ExistingWatchlistsContextProvider = createDataContext(
    ExistingWatchlistsReducer,
    ExistingWatchlistDefaults,
    ExistingWatchlistsContext
);

export default function useExistingWatchlistsContext() {
    return React.useContext(ExistingWatchlistsContext);
}
