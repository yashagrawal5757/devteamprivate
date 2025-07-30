import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { MultiPaginationType } from '@state/multi-pagination/MultiPaginationDefaults';

interface WatchlistsPropertiesPaginationContextType {
    state: Array<MultiPaginationType>;
    dispatch: React.Dispatch<IReducerAction>;
}

const WatchlistsPropertiesPaginationContext =
    React.createContext<WatchlistsPropertiesPaginationContextType>(
        {} as WatchlistsPropertiesPaginationContextType
    );

export default WatchlistsPropertiesPaginationContext;
