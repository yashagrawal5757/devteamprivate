import useExistingWatchlistsContext from '@dashboard/contexts/existing-watchlists/useExistingWatchlistsContext';
import { ExistingWatchlistsActions } from '@dashboard/state/existing-watchlists/ExistingWatchlistsActions';
import { ExistingWatchlist } from '@dashboard/state/existing-watchlists/ExistingWatchlistsDefaults';
import { useState } from 'react';

const useExistingWatchlists = () => {
    const existingWatchlistsContext = useExistingWatchlistsContext();

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [watchlistId, setWatchlistId] = useState<string | null>(null);

    const setWatchlists = (existingWatchlists: Array<ExistingWatchlist>) => {
        existingWatchlistsContext.dispatch({
            type: ExistingWatchlistsActions.SET_WATCHLISTS,
            payload: existingWatchlists
        });
    };

    return {
        existingWatchlists: existingWatchlistsContext.state,
        searchQuery,
        watchlistId,
        setSearchQuery,
        setWatchlistId,
        setWatchlists
    };
};

export default useExistingWatchlists;
