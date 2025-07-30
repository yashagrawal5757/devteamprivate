import React from 'react';
import HybridPaginationContext from './HybridPaginationContext';
import HybridPaginationDefaults from '../../state/hybrid-pagination/HybridPaginationDefaults';
import HybridPaginationReducer from '../../state/hybrid-pagination/HybridPaginationReducer';
import createDataContext from '@contexts/createDataContext';

export const HybridPaginationContextProvider = createDataContext(
    HybridPaginationReducer,
    HybridPaginationDefaults,
    HybridPaginationContext
);

export default function useHybridPaginationContext() {
    return React.useContext(HybridPaginationContext);
}
