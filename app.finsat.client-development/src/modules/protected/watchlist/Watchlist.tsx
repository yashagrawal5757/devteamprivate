import React from 'react';
import WatchlistContent from './watchlist-content/WatchlistContent';
import { WatchlistsContextProvider } from './contexts/watchlists/useWatchlistsContext';
import { WatchlistsPaginationContextProvider } from './contexts/watchlists-pagination/useWatchlistsPaginationContext';
import { WatchlistsPropertiesPaginationContextProvider } from './contexts/watchlists-properties-pagination/useWatchlistsPropertiesPaginationContext';
import { WatchlistsSelectQueueContextProvider } from './contexts/watchlists-select-queue/useWatchlistsSelectQueueContext';
import { PropertiesSelectQueueContextProvider } from './watchlist-content/watchlist-accordion/contexts/properties-select-queue/usePropertiesSelectQueueContext';

const Watchlist = () => {
    return (
        <WatchlistsPaginationContextProvider>
            <WatchlistsPropertiesPaginationContextProvider>
                <WatchlistsSelectQueueContextProvider>
                    <WatchlistsContextProvider>
                        <PropertiesSelectQueueContextProvider>
                            <WatchlistContent />
                        </PropertiesSelectQueueContextProvider>
                    </WatchlistsContextProvider>
                </WatchlistsSelectQueueContextProvider>
            </WatchlistsPropertiesPaginationContextProvider>
        </WatchlistsPaginationContextProvider>
    );
};

export default Watchlist;
