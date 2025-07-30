import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { PropertyEditorManagerType } from '../../state/property-editor-manager/PropertyEditorManagerDefaults';

interface PropertyEditorManagerContextType {
    state: PropertyEditorManagerType;
    dispatch: React.Dispatch<IReducerAction>;
}

const PropertyEditorManagerContext =
    React.createContext<PropertyEditorManagerContextType>(
        {} as PropertyEditorManagerContextType
    );

export default PropertyEditorManagerContext;
