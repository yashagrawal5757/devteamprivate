import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { HybridPaginationType } from '../../state/hybrid-pagination/HybridPaginationDefaults';

interface HybridPaginationContextType {
    state: HybridPaginationType;
    dispatch: React.Dispatch<IReducerAction>;
}

const HybridPaginationContext =
    React.createContext<HybridPaginationContextType>(
        {} as HybridPaginationContextType
    );

export default HybridPaginationContext;
