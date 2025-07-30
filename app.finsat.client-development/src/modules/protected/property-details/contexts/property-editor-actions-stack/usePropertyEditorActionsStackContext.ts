import React from 'react';
import createDataContext from '@contexts/createDataContext';
import PropertyEditorActionsStackContext from './PropertyEditorActionsStackContext';
import PropertyEditorActionsStackReducer from '../../state/property-editor-actions-stack/PropertyEditorActionsStackReducer';
import PropertyEditorActionsStackDefaults from '../../state/property-editor-actions-stack/PropertyEditorActionsStackDefaults';

export const PropertyEditorActionsStackContextProvider = createDataContext(
    PropertyEditorActionsStackReducer,
    PropertyEditorActionsStackDefaults,
    PropertyEditorActionsStackContext
);

export default function usePropertyEditorActionsStackContext() {
    return React.useContext(PropertyEditorActionsStackContext);
}
