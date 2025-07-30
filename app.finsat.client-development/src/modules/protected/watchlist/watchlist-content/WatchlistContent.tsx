import React, { useCallback, useEffect, useRef, useState } from 'react';
import useWatchlistsPagination from '@watchlist/hooks/watchlists-pagination/useWatchlistsPagination';
import useWatchlists from '@watchlist/hooks/watchlists/useWatchlists';
import _ from 'lodash';
import useWatchlistsSelectQueue from '@watchlist/hooks/watchlists-select-queue/useWatchlistsSelectQueue';
import WatchlistHeader from './watchlist-header/WatchlistHeader';
import WatchlistAccordion from './watchlist-accordion/WatchlistAccordion';
import NoWatchlists from './components/no-watchlists/NoWatchlists';

const WatchlistContent = () => {
    const { watchlists, searchQuery, setSearchQuery, fetchWatchlists } =
        useWatchlists();

    const { pagination } = useWatchlistsPagination();

    const {
        watchlistsSelectQueue: { queue },
        setSelectAllValue
    } = useWatchlistsSelectQueue();

    const containerRef = useRef<HTMLDivElement>(null);
    const previousScrollTopRef = useRef(0);
    const loadingRef = useRef(false);
    const [loading, setLoading] = useState(false);

    const debouncedSearch = useCallback(
        _.debounce((value: string) => {
            fetchWatchlists(value, pagination, false);
        }, 50),
        []
    );

    useEffect(() => {
        debouncedSearch(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        const isSelectAllCheckboxActive = watchlists
            .map((watchlist) => watchlist.id)
            .every((watchlistId) => queue.includes(watchlistId));

        setSelectAllValue(isSelectAllCheckboxActive);
    }, [queue]);

    useEffect(() => {
        const handleScroll = _.throttle(() => {
            const container = containerRef.current;
            if (!container || loadingRef.current || !pagination.hasNext) return;

            const currentScrollTop = container.scrollTop;
            const previousScrollTop = previousScrollTopRef.current;

            const isScrollingDown = currentScrollTop > previousScrollTop;
            previousScrollTopRef.current = currentScrollTop;

            const nearBottom =
                container.scrollHeight - currentScrollTop <=
                container.clientHeight + 100;

            if (isScrollingDown && nearBottom) {
                loadMore();
            }
        }, 300);

        const current = containerRef.current;
        if (current) current.addEventListener('scroll', handleScroll);

        return () => {
            if (current) current.removeEventListener('scroll', handleScroll);
        };
    }, [pagination]);

    const loadMore = async () => {
        if (loadingRef.current) return;

        loadingRef.current = true;
        setLoading(true);

        const nextPagination = {
            ...pagination,
            currentPage: pagination.currentPage + 1
        };

        await fetchWatchlists(searchQuery, nextPagination, true);

        setLoading(false);
        loadingRef.current = false;
    };

    return (
        <div className="px-8 py-4 h-full">
            <div className="h-[210px]">
                <p className="font-semibold text-lg pb-1">My Watchlists</p>
                <p className="text-sm pb-1 font-medium mt-3">
                    {pagination.totalCount} Watchlists
                </p>
                <WatchlistHeader
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </div>
            <div
                ref={containerRef}
                className="watchlist-list overflow-y-auto pr-3"
            >
                {watchlists.length === 0 && <NoWatchlists />}
                {watchlists.map((watchlist) => (
                    <WatchlistAccordion
                        key={watchlist.id}
                        id={watchlist.id}
                        name={watchlist.name}
                        properties={watchlist.properties}
                    />
                ))}
            </div>
        </div>
    );
};

export default WatchlistContent;
