import { PaginationActions } from '@state/pagination/PaginationActions';
import useWatchlistsPaginationContext from '@watchlist/contexts/watchlists-pagination/useWatchlistsPaginationContext';
import { PaginationType } from 'antd/es/transfer/interface';

const useWatchlistsPagination = () => {
    const watchlistsPagination = useWatchlistsPaginationContext();

    const setPagination = (pagination: PaginationType) => {
        watchlistsPagination.dispatch({
            type: PaginationActions.SET_PAGINATION,
            payload: pagination
        });
    };

    return {
        pagination: watchlistsPagination.state,
        setPagination
    };
};

export default useWatchlistsPagination;
