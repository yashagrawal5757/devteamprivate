import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { PropertyEditorActionsStackItem } from '../../state/property-editor-actions-stack/PropertyEditorActionsStackDefaults';

interface PropertyEditorActionsStackContextType {
    state: Array<PropertyEditorActionsStackItem>;
    dispatch: React.Dispatch<IReducerAction>;
}

const PropertyEditorActionsStackContext = React.createContext<PropertyEditorActionsStackContextType>(
    {} as PropertyEditorActionsStackContextType
);

export default PropertyEditorActionsStackContext;
