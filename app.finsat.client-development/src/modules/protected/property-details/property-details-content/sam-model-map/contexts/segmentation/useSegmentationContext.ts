import React from 'react';
import createDataContext from '@contexts/createDataContext';
import SegmentationReducer from '../../state/segmentation/SegmentationReducer';
import SegmentationDefaults from '../../state/segmentation/SegmentationDefaults';
import SegmentationContext from './SegmentationContext';

export const SegmentationContextProvider = createDataContext(
    SegmentationReducer,
    SegmentationDefaults,
    SegmentationContext
);

export default function useSegmenationContext() {
    return React.useContext(SegmentationContext);
}
