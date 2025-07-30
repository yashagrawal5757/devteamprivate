import React from 'react';
import _ from 'lodash';
import usePropertyEditorContext from '../../contexts/property-editor/usePropertyEditorContext';
import {
    PolygonAlignmentMode,
    PolygonOperationMode,
    PropertyEditorDetectionMode,
    PropertyEditorMode,
    PropertyEditorModelMode,
    PropertyMapMode
} from '../../state/property-editor/PropertyEditorDefaults';
import { PropertyEditorActions } from '../../state/property-editor/PropertyEditorActions';
import usePropertyFootprint from '../property-footprint/usePropertyFootprint';
import usePropertyEditorActionsStack from './usePropertyEditorActionsStack';
import { PropertyEditorStackAction } from '../../state/property-editor-actions-stack/PropertyEditorActionsStackDefaults';

const usePropertyEditor = () => {
    const propertyEditorContext = usePropertyEditorContext();
    const { addFootprint, updateFootprintById, removeFootprintById, clearFootprint } = usePropertyFootprint();
    const { getLastAction, popActionFromStack, emptyStack } = usePropertyEditorActionsStack();

    const setMapMode = (mode: PropertyMapMode) => {
        propertyEditorContext.dispatch({
            type: PropertyEditorActions.SET_MODE,
            payload: mode
        });
    };

    const setEditorModelMode = (mode: PropertyEditorModelMode) => {
        propertyEditorContext.dispatch({
            type: PropertyEditorActions.SET_EDITOR_MODEL,
            payload: mode
        });
    };

    const setEditorMode = (mode: PropertyEditorMode) => {
        propertyEditorContext.dispatch({
            type: PropertyEditorActions.SET_EDITOR_MODE,
            payload: mode
        });
    };

    const setOperationMode = (mode: PolygonOperationMode) => {
        propertyEditorContext.dispatch({
            type: PropertyEditorActions.SET_OPERATION_MODE,
            payload: mode
        });
    };

    const setAlignmentMode = (mode: PolygonAlignmentMode) => {
        propertyEditorContext.dispatch({
            type: PropertyEditorActions.SET_ALIGNMENT_MODE,
            payload: mode
        });
    };

    const setDetectionMode = (mode: PropertyEditorDetectionMode) => {
        propertyEditorContext.dispatch({
            type: PropertyEditorActions.SET_DETECTION_MODE,
            payload: mode
        })
    }

    const setInitialValue = (value: boolean) => {
        propertyEditorContext.dispatch({
            type: PropertyEditorActions.SET_INITIAL_VALUE,
            payload: value
        });
    }

    const resetMode = () => {
        const type = propertyEditorContext.state.propertyEditorMode === PropertyEditorMode.SHAPE ? 'shape' : 'obsticle';

        if (propertyEditorContext.state.propertyEditorMode === PropertyEditorMode.SHAPE) {
            clearFootprint('obsticle');
        }

        clearFootprint(type);
        emptyStack();
    };

    const handleUndo = () => {
        const lastAction = getLastAction();

        if (!lastAction) {
            return;
        }

        const { item, reverseAction } = lastAction;

        switch (reverseAction) {
            case PropertyEditorStackAction.ADD_FOOTPRINT:
                addFootprint('shape', item.data, item.id);
                break;
            case PropertyEditorStackAction.UPDATE_FOOTPRINT:
                updateFootprintById('shape', item.id, item.data);
                break;
            case PropertyEditorStackAction.REMOVE_FOOTPRINT:
                removeFootprintById('shape', item.id);
                break;
            case PropertyEditorStackAction.ADD_OBSTRUCTION:
                addFootprint('obsticle', item);
                break;
            case PropertyEditorStackAction.UPDATE_OBSTRUCTION:
                updateFootprintById('obsticle', item.id, item.data);
                break;
            case PropertyEditorStackAction.REMOVE_OBSTRUCTION:
                removeFootprintById('obsticle', item.id);
                break;
        }

        popActionFromStack();
    }

    return {
        propertyEditor: propertyEditorContext.state,
        setInitialValue,
        setMapMode,
        setEditorModelMode,
        setEditorMode,
        setOperationMode,
        setAlignmentMode,
        setDetectionMode,
        resetMode,
        handleUndo
    };
};

export default usePropertyEditor;
