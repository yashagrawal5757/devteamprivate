import useExploreEditorContext from '../../contexts/explore-sam-model/explore-editor/useExploreEditorContext';
import { ExploreEditorActions } from '../../state/explore-editor/ExploreEditorAction';
import { EditorDetectionMode } from '../../state/explore-editor/ExploreEditorDefaults';

const useExploreEditor = () => {
    const exploreEditorContext = useExploreEditorContext();

    const setEditorDetectionMode = (mode: EditorDetectionMode) => {
        exploreEditorContext.dispatch({
            type: ExploreEditorActions.SET_DETECTION_MODE,
            payload: mode
        });
    };

    const setInitialValue = (value: boolean) => {
        exploreEditorContext.dispatch({
            type: ExploreEditorActions.SET_INITIAL_VALUE,
            payload: value
        });
    }

    return {
        exploreEditor: exploreEditorContext.state,
        setInitialValue,
        setEditorDetectionMode,
    };
};

export default useExploreEditor;
