import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { PropertyDetailsWatchlist } from '../../state/property-details-watchlist/PropertyDetailsWatchlistDefaults';

interface PropertyDetailsWatchlistContextType {
    state: PropertyDetailsWatchlist;
    dispatch: React.Dispatch<IReducerAction>;
}

const PropertyDetailsWatchlistContext =
    React.createContext<PropertyDetailsWatchlistContextType>(
        {} as PropertyDetailsWatchlistContextType
    );

export default PropertyDetailsWatchlistContext;
