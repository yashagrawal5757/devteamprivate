import React from 'react';
import createDataContext from '@contexts/createDataContext';
import ExploreSegmentationDefaults from '@explore/explore-hybrid-content/explore-hybrid-map/state/explore-segmentation/ExploreSegmentationDefaults';
import ExploreSegmentationContext from './ExploreSegmentationContext';
import ExploreSegmentationReducer from '@explore/explore-hybrid-content/explore-hybrid-map/state/explore-segmentation/ExploreSegmentationReducer';

export const ExploreSegmentationContextProvider = createDataContext(
    ExploreSegmentationReducer,
    ExploreSegmentationDefaults,
    ExploreSegmentationContext
);

export default function useExploreSegmenationContext() {
    return React.useContext(ExploreSegmentationContext);
}

