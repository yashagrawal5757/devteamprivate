export type PropertyDetailsWatchlist = {
    isWatchlistModalOpen: boolean;
    queue: Array<string>;
};

const PropertyDetailsWatchlistDefaults: PropertyDetailsWatchlist = {
    isWatchlistModalOpen: false,
    queue: []
};

export default PropertyDetailsWatchlistDefaults;
