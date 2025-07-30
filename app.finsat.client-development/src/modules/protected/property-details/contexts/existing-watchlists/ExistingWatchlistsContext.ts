import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { ExistingWatchlist } from '../../state/existing-watchlists/ExistingWatchlistsDefaults';

interface ExistingWatchlistsContextType {
    state: Array<ExistingWatchlist>;
    dispatch: React.Dispatch<IReducerAction>;
}

const ExistingWatchlistsContext =
    React.createContext<ExistingWatchlistsContextType>(
        {} as ExistingWatchlistsContextType
    );

export default ExistingWatchlistsContext;
