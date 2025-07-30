import { useState } from 'react';
import useExistingWatchlistsContext from '../../contexts/existing-watchlists/useExistingWatchlistsContext';
import { ExistingWatchlist } from '../../state/existing-watchlists/ExistingWatchlistsDefaults';
import { ExistingWatchlistsActions } from '../../state/existing-watchlists/ExistingWatchlistsActions';

const useExistingWatchlists = () => {
    const existingWatchlistsContext = useExistingWatchlistsContext();

    const [searchQuery, setSearchQuery] = useState('');

    const setWatchlists = (existingWatchlists: Array<ExistingWatchlist>) => {
        existingWatchlistsContext.dispatch({
            type: ExistingWatchlistsActions.SET_WATCHLISTS,
            payload: existingWatchlists
        });
    };

    const prependWatchlist = (watchlist: ExistingWatchlist) => {
        existingWatchlistsContext.dispatch({
            type: ExistingWatchlistsActions.PREPEND_WATCHLIST,
            payload: watchlist
        });
    };

    return {
        existingWatchlists: existingWatchlistsContext.state,
        searchQuery,
        setSearchQuery,
        setWatchlists,
        prependWatchlist
    };
};

export default useExistingWatchlists;
