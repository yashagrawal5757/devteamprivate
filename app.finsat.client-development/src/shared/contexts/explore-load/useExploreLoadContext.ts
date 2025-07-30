import React from 'react';
import createDataContext from '@contexts/createDataContext';
import ExploreLoadReducer from '@state/explore-load/ExploreLoadReducer';
import ExploreLoadDefaults from '@state/explore-load/ExploreLoadDefaults';
import ExploreLoadContext from './ExploreLoadContext';

export const ExploreLoadContextProvider = createDataContext(
    ExploreLoadReducer,
    ExploreLoadDefaults,
    ExploreLoadContext
);

export default function useExploreLoadContext() {
    return React.useContext(ExploreLoadContext);
}
