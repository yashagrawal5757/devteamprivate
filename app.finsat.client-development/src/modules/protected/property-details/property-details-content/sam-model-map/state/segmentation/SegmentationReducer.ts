import ReducerType from '@custom-types/ReducerType';
import { IReducerAction } from '@models/IReducerAction';
import { SegmentationType } from './SegmentationDefaults';
import { SegmentationActions } from './SegmentationActions';

const SegmentationReducer: ReducerType<
    SegmentationType,
    IReducerAction
> = (state: SegmentationType, action: IReducerAction) => {
    switch (action.type) {
        case SegmentationActions.SET_CLICKS:
            return { ...state, clicks: action.payload };
        case SegmentationActions.SET_IMAGE:
            return { ...state, image: action.payload };
        case SegmentationActions.SET_MASK_IMAGE:
            return { ...state, maskImage: action.payload };
        case SegmentationActions.SET_EMBEDDING:
            return { ...state, embedding: action.payload };
        default:
            return state;
    }
};

export default SegmentationReducer;
