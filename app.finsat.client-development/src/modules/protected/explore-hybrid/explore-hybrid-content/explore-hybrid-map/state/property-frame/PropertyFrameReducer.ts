import { IReducerAction } from "@models/IReducerAction";
import { PropertyFrame } from "./PropertyFrameDefaults";
import ReducerType from "@custom-types/ReducerType";
import { PropertyFrameImageActions, PropertyFrameBoundingBoxActions } from "./PropertyFrameActions";

const PropertyFrameReducer: ReducerType<
    PropertyFrame | undefined,
    IReducerAction
> = (state: PropertyFrame | undefined, action: IReducerAction) => {
    switch (action.type) {
        case PropertyFrameImageActions.SET_PROPERTY_FRAME_IMAGE:
            return { 
                boundingBox: state?.boundingBox , 
                base64: action.payload 
            };
        case PropertyFrameImageActions.CLEAR_IMAGE:
            return undefined;
        case PropertyFrameBoundingBoxActions.SET_PROPERTY_FRAME_BOUNDING_BOX:
            return { 
                base64: state?.base64, 
                boundingBox: action.payload 
            };
        case PropertyFrameBoundingBoxActions.CLEAR_BOUNDING_BOX:
            return undefined;
        default:
            return state;
    }
}

export default PropertyFrameReducer;