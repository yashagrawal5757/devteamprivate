import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../shared/types/ReducerType';
import {
    PolygonAlignmentMode,
    PolygonOperationMode,
    PropertyEditor,
    PropertyEditorDetectionMode,
    PropertyEditorMode,
    PropertyEditorModelMode,
    PropertyMapMode
} from './PropertyEditorDefaults';
import { PropertyEditorActions } from './PropertyEditorActions';

const PropertyEditorReducer: ReducerType<PropertyEditor, IReducerAction> = (
    state: PropertyEditor,
    action: IReducerAction
) => {
    switch (action.type) {
        case PropertyEditorActions.SET_MODE:
            return {
                ...state,
                propertyMapMode: action.payload,
                propertyEditorModelMode: PropertyEditorModelMode.MANUAL,
                propertyEditorMode: PropertyEditorMode.SHAPE,
                polygonOperationMode: PolygonOperationMode.EDIT,
                polygonAlignmentMode: PolygonAlignmentMode.MOVE,
                detectionMode: PropertyEditorDetectionMode.HOVER
            };
        case PropertyEditorActions.SET_EDITOR_MODE:
            return {
                ...state,
                propertyMapMode: PropertyMapMode.EDITOR,
                polygonOperationMode: PolygonOperationMode.EDIT,
                propertyEditorMode: action.payload
            };
        case PropertyEditorActions.SET_OPERATION_MODE:
            return {
                ...state,
                propertyEditorModelMode: PropertyEditorModelMode.MANUAL,
                polygonOperationMode: action.payload
            };
        case PropertyEditorActions.SET_ALIGNMENT_MODE:
            return {
                ...state,
                propertyEditorModelMode: PropertyEditorModelMode.MANUAL,
                polygonOperationMode: PolygonOperationMode.EDIT,
                polygonAlignmentMode: action.payload
            };
        case PropertyEditorActions.SET_EDITOR_MODEL:
            return {
                ...state,
                propertyEditorModelMode: action.payload
            };
        case PropertyEditorActions.SET_DETECTION_MODE:
            return {
                ...state,
                propertyEditorModelMode: PropertyEditorModelMode.SAM,
                detectionMode: action.payload
            };
        case PropertyEditorActions.SET_INITIAL_VALUE:
            return {
                ...state,
                isInitial: action.payload
            }
        default:
            return state;
    }
};

export default PropertyEditorReducer;
