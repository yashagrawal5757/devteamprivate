import React from 'react';
import createDataContext from '@contexts/createDataContext';
import ExistingWatchlistsContext from './ExistingWatchlistsContext';
import ExistingWatchlistsReducer from '../../state/existing-watchlists/ExistingWatchlistsReducer';
import ExistingWatchlistDefaults from '../../state/existing-watchlists/ExistingWatchlistsDefaults';

export const ExistingWatchlistsContextProvider = createDataContext(
    ExistingWatchlistsReducer,
    ExistingWatchlistDefaults,
    ExistingWatchlistsContext
);

export default function useExistingWatchlistsContext() {
    return React.useContext(ExistingWatchlistsContext);
}
