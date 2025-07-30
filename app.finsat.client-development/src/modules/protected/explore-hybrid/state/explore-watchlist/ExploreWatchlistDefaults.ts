export type ExploreWatchlist = {
    isWatchlistModalOpen: boolean;
    isMultiSelectActive: boolean;
    isSelectAllActive: boolean;
    queue: Array<string>;
};

const ExploreWatchlistDefaults: ExploreWatchlist = {
    isWatchlistModalOpen: false,
    isMultiSelectActive: false,
    isSelectAllActive: false,
    queue: []
};

export default ExploreWatchlistDefaults;
