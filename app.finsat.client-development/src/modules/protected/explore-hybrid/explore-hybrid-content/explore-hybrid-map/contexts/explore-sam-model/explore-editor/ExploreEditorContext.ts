import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { ExploreEditor } from '@explore/explore-hybrid-content/explore-hybrid-map/state/explore-editor/ExploreEditorDefaults';

interface ExploreEditorContextType {
    state: ExploreEditor;
    dispatch: React.Dispatch<IReducerAction>;
}

const ExploreEditorContext = React.createContext<ExploreEditorContextType>(
    {} as ExploreEditorContextType
);

export default ExploreEditorContext;
