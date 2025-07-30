import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { PropertyEditor } from '../../state/property-editor/PropertyEditorDefaults';

interface PropertyEditorContextType {
    state: PropertyEditor;
    dispatch: React.Dispatch<IReducerAction>;
}

const PropertyEditorContext = React.createContext<PropertyEditorContextType>(
    {} as PropertyEditorContextType
);

export default PropertyEditorContext;
