import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../shared/types/ReducerType';
import { PropertyEditorManagerType } from './PropertyEditorManagerDefaults';
import { PropertyEditorManagerActions } from './PropertyEditorManagerActions';

const PropertyEditorManagerReducer: ReducerType<PropertyEditorManagerType, IReducerAction> = (
    state: PropertyEditorManagerType,
    action: IReducerAction
) => {
    switch (action.type) {
        case PropertyEditorManagerActions.SET_BASE64_IMAGE:
            return { ...state, base64Image: action.payload };
        case PropertyEditorManagerActions.SET_BOUNDING_BOX:
            return { ...state, boundingBox: action.payload };
        default:
            return state;
    }
};

export default PropertyEditorManagerReducer;
