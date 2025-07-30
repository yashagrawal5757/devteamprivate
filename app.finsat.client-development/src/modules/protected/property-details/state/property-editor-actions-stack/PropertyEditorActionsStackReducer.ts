import ReducerType from "@custom-types/ReducerType";
import { PropertyEditorActionsStackItem } from "./PropertyEditorActionsStackDefaults";
import { IReducerAction } from "@models/IReducerAction";
import { PropertyEditorActionsStackActions } from "./PropertyEditorActionsStackActions";

const STACK_LIMIT = 5;

const PropertyEditorActionsStackReducer: ReducerType<Array<PropertyEditorActionsStackItem>, IReducerAction> = (
    state: Array<PropertyEditorActionsStackItem>,
    action: IReducerAction
) => {
    switch (action.type) {
        case PropertyEditorActionsStackActions.PUSH_ACTION:
            if (state.length === STACK_LIMIT) {
                return [...state.slice(1, state.length), action.payload];
            }

            return [...state, action.payload];
        case PropertyEditorActionsStackActions.POP_ACTION:
            return state.slice(0, state.length - 1);
        case PropertyEditorActionsStackActions.EMPTY_STACK:
            return [];
        default:
            return state;
    }
};

export default PropertyEditorActionsStackReducer;