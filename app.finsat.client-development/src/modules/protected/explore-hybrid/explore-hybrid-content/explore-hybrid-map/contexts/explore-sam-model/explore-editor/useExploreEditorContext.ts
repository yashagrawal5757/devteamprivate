import React from 'react';
import createDataContext from '@contexts/createDataContext';
import ExploreEditorContext from './ExploreEditorContext';
import ExploreEditorDefaults from '@explore/explore-hybrid-content/explore-hybrid-map/state/explore-editor/ExploreEditorDefaults';
import ExploreEditorReducer from '@explore/explore-hybrid-content/explore-hybrid-map/state/explore-editor/ExploreEditorReducer';

export const ExploreEditorContextProvider = createDataContext(
    ExploreEditorReducer,
    ExploreEditorDefaults,
    ExploreEditorContext
);

export default function useExploreEditorContext() {
    return React.useContext(ExploreEditorContext);
}
