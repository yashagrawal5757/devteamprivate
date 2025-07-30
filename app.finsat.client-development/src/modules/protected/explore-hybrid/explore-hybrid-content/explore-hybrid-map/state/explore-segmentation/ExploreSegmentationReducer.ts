import ReducerType from '@custom-types/ReducerType';
import { IReducerAction } from '@models/IReducerAction';
import { ExploreSegmentationType } from './ExploreSegmentationDefaults';
import { ExploreSegmentationActions } from './ExploreSegmentationActions';

const ExploreSegmentationReducer: ReducerType<
    ExploreSegmentationType,
    IReducerAction
> = (state: ExploreSegmentationType, action: IReducerAction) => {
    switch (action.type) {
        case ExploreSegmentationActions.SET_CLICKS:
            return { ...state, clicks: action.payload };
        case ExploreSegmentationActions.SET_IMAGE:
            return { ...state, image: action.payload };
        case ExploreSegmentationActions.SET_MASK_IMAGE:
            return { ...state, maskImage: action.payload };
        case ExploreSegmentationActions.SET_EMBEDDING:
            return { ...state, embedding: action.payload };
        default:
            return state;
    }
};

export default ExploreSegmentationReducer;
