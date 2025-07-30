import useError from '@hooks/useError';
import useLoading from '@hooks/useLoading';
import useWatchlistsApi, {
    WatchlistPropertyResponse,
    WatchlistsResponse
} from './useWatchlistsApi';
import { AxiosResponse } from 'axios';
import { WatchlistsActions } from '@watchlist/state/watchlists/WatchlistsActions';
import useWatchlistsContext from '@watchlist/contexts/watchlists/useWatchlistsContext';
import useWatchlistsPagination from '../watchlists-pagination/useWatchlistsPagination';
import useWatchlistsPropertiesPagination from '../watchlists-pagination/useWatchlistsPropertiesPagination';
import { useState } from 'react';
import useSuccess from '@hooks/useSuccess';
import useWatchlistsSelectQueue from '../watchlists-select-queue/useWatchlistsSelectQueue';
import usePropertiesSelectQueue from '@watchlist/watchlist-content/watchlist-accordion/hooks/usePropertiesSelectQueue';

const useWatchlists = () => {
    const watchlistsContext = useWatchlistsContext();

    const [searchQuery, setSearchQuery] = useState('');

    const error = useError();
    const success = useSuccess();
    const loading = useLoading();

    const watchlistsApi = useWatchlistsApi();
    const {
        pagination: watchlistsPagination,
        setPagination: setWatchlistsPagination
    } = useWatchlistsPagination();
    const {
        getByWatchlistId: getPaginationForWatchlist,
        setByWatchlistId: setPaginationForWatchlist,
        initByWatchlistId: initPaginationForWatchlist
    } = useWatchlistsPropertiesPagination();
    const { removeAllFromQueue, toggleWatchlistsMultiSelect } =
        useWatchlistsSelectQueue();
    const {
        initPropertyQueueForWatchlist,
        removeFromQueue,
        removeAllFromQueue: removeAllPropertiesFromQueue,
        removeWatchlist,
        removeAllWatchlists
    } = usePropertiesSelectQueue();

    const fetchWatchlists = (
        search?: string | undefined,
        pagination = watchlistsPagination,
        append: boolean = false
    ) => {
        loading.load();

        watchlistsApi
            .getWatchlists(search, pagination)
            .then((response: AxiosResponse<Array<WatchlistsResponse>, any>) => {
                const { data, headers } = response;

                const headerPagination = JSON.parse(headers['x-pagination']);

                const watchlists = data.map((watchlist) => ({
                    id: watchlist.id,
                    name: watchlist.name,
                    properties: []
                }));

                const pagination = {
                    totalCount: headerPagination.TotalCount,
                    pageSize: headerPagination.PageSize,
                    currentPage: headerPagination?.CurrentPage,
                    totalPages: headerPagination.TotalPages,
                    hasNext: headerPagination.HasNext,
                    hasPrevious: headerPagination.HasPrevious
                };

                setWatchlistsPagination(pagination);

                watchlistsContext.dispatch({
                    type: append
                        ? WatchlistsActions.APPEND_WATCHLISTS
                        : WatchlistsActions.SET_WATCHLISTS,
                    payload: watchlists
                });

                for (const watchlist of watchlists) {
                    initPaginationForWatchlist(watchlist.id);
                    initPropertyQueueForWatchlist(watchlist.id);
                }
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const fetchPropertiesForWatchlist = (
        watchlistId: string,
        page: number,
        // append: boolean = false,
        search?: string | undefined
    ) => {
        loading.load();

        const watchlistPropertiesPagination =
            getPaginationForWatchlist(watchlistId);

        if (watchlistPropertiesPagination?.pagination) {
            watchlistPropertiesPagination.pagination.currentPage = page;
        }

        watchlistsApi
            .getWatchlistProperties(
                watchlistId,
                search,
                watchlistPropertiesPagination?.pagination!
            )
            .then(
                (
                    response: AxiosResponse<
                        Array<WatchlistPropertyResponse>,
                        any
                    >
                ) => {
                    const { data, headers } = response;

                    const headerPagination = JSON.parse(
                        headers['x-pagination']
                    );

                    const pagination = {
                        totalCount: headerPagination.TotalCount,
                        pageSize: headerPagination.PageSize,
                        currentPage: headerPagination?.CurrentPage,
                        totalPages: headerPagination.TotalPages,
                        hasNext: headerPagination.HasNext,
                        hasPrevious: headerPagination.HasPrevious
                    };

                    watchlistsContext.dispatch({
                        // type: append
                        //     ? WatchlistsActions.APPEND_WATCHLIST_PROPERTIES
                        //     : WatchlistsActions.SET_WATCHLIST_PROPERTIES,
                        type: WatchlistsActions.SET_WATCHLIST_PROPERTIES,
                        payload: {
                            watchlistId,
                            properties: data
                        }
                    });

                    setPaginationForWatchlist(watchlistId, pagination);
                }
            )
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const addNewWatchlist = (
        name: string,
        setAddNewWatchlistToggle: (value: boolean) => void
    ) => {
        loading.load();

        watchlistsApi
            .addNewWatchlist(name)
            .then((response: AxiosResponse<WatchlistsResponse, any>) => {
                const { data } = response;
                const newWatchlist = data;

                initPropertyQueueForWatchlist(newWatchlist.id);
                initPaginationForWatchlist(newWatchlist.id);
                prependWatchlists(newWatchlist);
                setAddNewWatchlistToggle(false);

                success.setSuccessMessage('Watchlist has been created');
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const prependWatchlists = (watchlist: WatchlistsResponse) => {
        watchlistsContext.dispatch({
            type: WatchlistsActions.PREPEND_WATCHLISTS,
            payload: watchlist
        });
    };

    const deleteWatchlists = (watchlistIds: Array<string>) => {
        loading.load();

        watchlistsApi
            .deleteWatchlists(watchlistIds)
            .then(() => {
                watchlistsContext.dispatch({
                    type: WatchlistsActions.REMOVE_WATCHLISTS,
                    payload: watchlistIds
                });

                removeAllFromQueue();

                for (const watchlistId of watchlistIds) {
                    removeWatchlist(watchlistId);
                }

                success.setSuccessMessage('Watchlist/s deleted successfully');
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const deleteAllWatchlists = (searchText: string) => {
        loading.load();

        watchlistsApi
            .batchDeleteWatchlists(searchText)
            .then(() => {
                watchlistsContext.dispatch({
                    type: WatchlistsActions.EMPTY_WATCHLISTS
                });

                toggleWatchlistsMultiSelect();
                removeAllFromQueue();
                removeAllWatchlists();

                success.setSuccessMessage('Watchlist/s deleted successfully');
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const deleteWatchlistProperties = (
        watchlistId: string,
        variationIds: Array<string>
    ) => {
        loading.load();

        watchlistsApi
            .deleteWatchlistProperties(watchlistId, variationIds)
            .then(() => {
                watchlistsContext.dispatch({
                    type: WatchlistsActions.REMOVE_WATCHLIST_PROPERTIES,
                    payload: {
                        watchlistId,
                        variationIds
                    }
                });

                for (const variationId of variationIds) {
                    removeFromQueue(watchlistId, variationId);
                }

                success.setSuccessMessage('Properties removed successfully');
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const deleteAllWatchlistProperties = (
        watchlistId: string,
        searchText: string
    ) => {
        loading.load();

        watchlistsApi
            .batchDeleteWatchlistProperties(watchlistId, searchText)
            .then(() => {
                watchlistsContext.dispatch({
                    type: WatchlistsActions.EMPTY_WATCHLIST_PROPERTIES,
                    payload: watchlistId
                });

                removeAllPropertiesFromQueue(watchlistId);

                success.setSuccessMessage('Properties removed successfully');
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    return {
        watchlists: watchlistsContext.state,
        searchQuery,
        setSearchQuery,
        fetchWatchlists,
        fetchPropertiesForWatchlist,
        addNewWatchlist,
        prependWatchlists,
        deleteWatchlists,
        deleteAllWatchlists,
        deleteWatchlistProperties,
        deleteAllWatchlistProperties
    };
};

export default useWatchlists;
