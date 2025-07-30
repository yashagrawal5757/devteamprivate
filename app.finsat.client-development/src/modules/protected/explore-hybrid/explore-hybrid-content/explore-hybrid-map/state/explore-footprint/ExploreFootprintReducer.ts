import ReducerType from "@custom-types/ReducerType";
import { ExploreFootprint } from "./ExploreFootprintDefaults";
import { IReducerAction } from "@models/IReducerAction";
import { ExploreEditorActions } from "../explore-editor/ExploreEditorAction";
import { generateUuid } from "@services/cryptoUtils";
import _ from "lodash";

const ExploreFootprintReducer: ReducerType<
    ExploreFootprint,
    IReducerAction
> = (state: ExploreFootprint, action: IReducerAction) => {
    switch (action.type) {
        case ExploreEditorActions.SET_EXPLORE_FOOTPRINT:
            return {
                ...state,
                footprint: { id: generateUuid(), ...action.payload }
            };
        case ExploreEditorActions.UPDATE_EXPLORE_FOOTPRINT_BY_ID:
            return {
                ...state,
                footprint: {
                    ...state.footprint,
                    data: state.footprint.data.map((id) => {
                        if (id === action.payload.id) {
                            return action.payload;
                        }

                        return id;
                    })
                }
            };
        case ExploreEditorActions.REMOVE_EXPLORE_FOOTPRINT_BY_ID:
            return {
                ...state,
                footprint: {
                    ...state.footprint,
                    data: _.cloneDeep(state.footprint.data).filter(id => id !== action.payload.id)
                }
            };
        case ExploreEditorActions.CLEAR_EXPLORE_FOOTPRINT:
            return {
                ...state,
                footprint: {
                    ...state.footprint,
                    data: []
                }
            };
        default:
            return state;
    }
}

export default ExploreFootprintReducer;