import React from 'react';
import createDataContext from '@contexts/createDataContext';
import PropertyEditorManagerContext from './PropertyEditorManagerContext';
import PropertyEditorManagerReducer from '../../state/property-editor-manager/PropertyEditorManagerReducer';
import PropertyEditorManagerDefaults from '../../state/property-editor-manager/PropertyEditorManagerDefaults';

export const PropertyEditorManagerContextProvider = createDataContext(
    PropertyEditorManagerReducer,
    PropertyEditorManagerDefaults,
    PropertyEditorManagerContext
);

export default function usePropertyEditorManagerContext() {
    return React.useContext(PropertyEditorManagerContext);
}
