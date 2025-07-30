import React from 'react';
import createDataContext from '@contexts/createDataContext';
import PropertyEditorContext from './PropertyEditorContext';
import PropertyEditorReducer from '../../state/property-editor/PropertyEditorReducer';
import PropertyEditorDefaults from '../../state/property-editor/PropertyEditorDefaults';

export const PropertyEditorContextProvider = createDataContext(
    PropertyEditorReducer,
    PropertyEditorDefaults,
    PropertyEditorContext
);

export default function usePropertyEditorContext() {
    return React.useContext(PropertyEditorContext);
}
