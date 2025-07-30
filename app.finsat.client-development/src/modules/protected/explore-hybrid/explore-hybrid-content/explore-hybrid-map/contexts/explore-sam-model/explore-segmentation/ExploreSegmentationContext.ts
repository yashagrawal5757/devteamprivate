import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { ExploreSegmentationType } from '@explore/explore-hybrid-content/explore-hybrid-map/state/explore-segmentation/ExploreSegmentationDefaults';

interface ExploreSegmentationContextType {
    state: ExploreSegmentationType;
    dispatch: React.Dispatch<IReducerAction>;
}

const ExploreSegmentationContext =
    React.createContext<ExploreSegmentationContextType>(
        {} as ExploreSegmentationContextType
    );

export default ExploreSegmentationContext;
