import ReducerType from "@custom-types/ReducerType";
import { ExploreEditor } from "./ExploreEditorDefaults";
import { IReducerAction } from "@models/IReducerAction";
import { ExploreEditorActions } from "./ExploreEditorAction";

const ExploreEditorReducer: ReducerType<ExploreEditor, IReducerAction> = (
    state: ExploreEditor,
    action: IReducerAction
) => {
    switch (action.type) {
        case ExploreEditorActions.SET_DETECTION_MODE:
            return {
                ...state,
                detectionMode: action.payload
            };
        case ExploreEditorActions.SET_INITIAL_VALUE:
            return {
                ...state,
                isInitial: action.payload
            }
        default:
            return state;
    }
};

export default ExploreEditorReducer;