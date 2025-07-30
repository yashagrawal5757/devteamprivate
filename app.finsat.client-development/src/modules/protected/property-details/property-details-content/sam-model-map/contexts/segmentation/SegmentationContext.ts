import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { SegmentationType } from '../../state/segmentation/SegmentationDefaults';

interface SegmentationContextType {
    state: SegmentationType;
    dispatch: React.Dispatch<IReducerAction>;
}

const SegmentationContext =
    React.createContext<SegmentationContextType>(
        {} as SegmentationContextType
    );

export default SegmentationContext;
