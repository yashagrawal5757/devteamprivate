import React from 'react';
import createDataContext from '@contexts/createDataContext';
import ExploreSFModalReducer from '@explore/explore-hybrid-content/explore-hybrid-map/state/explore-hybrid-sf-modal/ExploreSFModalReducer';
import ExploreSFModalDefaults from '@explore/explore-hybrid-content/explore-hybrid-map/state/explore-hybrid-sf-modal/ExploreSFModalDefaults';
import ExploreSFModalContext from './ExploreSFModalContext';

export const ExploreSFModalContextProvider = createDataContext(
    ExploreSFModalReducer,
    ExploreSFModalDefaults,
    ExploreSFModalContext
);

export default function useExploreSFModalContext() {
    return React.useContext(ExploreSFModalContext);
}
