import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { PaginationType } from '@state/pagination/PaginationDefaults';

interface WatchlistsPaginationContextType {
    state: PaginationType;
    dispatch: React.Dispatch<IReducerAction>;
}

const WatchlistsPaginationContext =
    React.createContext<WatchlistsPaginationContextType>(
        {} as WatchlistsPaginationContextType
    );

export default WatchlistsPaginationContext;
