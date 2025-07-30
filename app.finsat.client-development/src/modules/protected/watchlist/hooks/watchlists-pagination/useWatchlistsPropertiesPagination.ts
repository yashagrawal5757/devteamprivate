import { MultiPaginationActions } from '@state/multi-pagination/MultiPaginationActions';
import { MultiPaginationType } from '@state/multi-pagination/MultiPaginationDefaults';
import { PaginationType } from '@state/pagination/PaginationDefaults';
import useWatchlistsPropertiesPaginationContext from '@watchlist/contexts/watchlists-properties-pagination/useWatchlistsPropertiesPaginationContext';

const useWatchlistsPropertiesPagination = () => {
    const watchlistsPropertiesPaginationContext =
        useWatchlistsPropertiesPaginationContext();

    const getByWatchlistId = (
        watchlistId: string
    ): MultiPaginationType | undefined => {
        return watchlistsPropertiesPaginationContext.state.find(
            (watchlistPropertiesPagination) =>
                watchlistPropertiesPagination.id == watchlistId
        );
    };

    const setByWatchlistId = (
        watchlistId: string,
        pagination: PaginationType
    ) => {
        watchlistsPropertiesPaginationContext.dispatch({
            type: MultiPaginationActions.ADD_PAGINATION,
            payload: {
                id: watchlistId,
                pagination
            }
        });
    };

    const initByWatchlistId = (watchlistId: string) => {
        watchlistsPropertiesPaginationContext.dispatch({
            type: MultiPaginationActions.INIT_PAGINATION,
            payload: watchlistId
        });
    };

    return {
        paginations: watchlistsPropertiesPaginationContext.state,
        getByWatchlistId,
        setByWatchlistId,
        initByWatchlistId
    };
};

export default useWatchlistsPropertiesPagination;
