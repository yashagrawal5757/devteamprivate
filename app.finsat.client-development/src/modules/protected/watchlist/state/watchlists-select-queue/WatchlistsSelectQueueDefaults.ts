export type WatchlistsSelectQueue = {
    isMultiSelectActive: boolean;
    isSelectAllActive: boolean;
    queue: Array<string>;
};

const WatchlistsSelectQueueDefaults: WatchlistsSelectQueue = {
    isMultiSelectActive: false,
    isSelectAllActive: false,
    queue: []
};

export default WatchlistsSelectQueueDefaults;
