import usePropertyEditorActionsStackContext from "../../contexts/property-editor-actions-stack/usePropertyEditorActionsStackContext";
import { PropertyEditorActionsStackActions } from "../../state/property-editor-actions-stack/PropertyEditorActionsStackActions";
import { PropertyEditorStackAction } from "../../state/property-editor-actions-stack/PropertyEditorActionsStackDefaults";

const usePropertyEditorActionsStack = () => {
    const propertyEditorActionsStack = usePropertyEditorActionsStackContext();

    const getLastAction = () => {
        return propertyEditorActionsStack.state.slice(-1)[0];
    }

    const emptyStack = () => {
        propertyEditorActionsStack.dispatch({ type: PropertyEditorActionsStackActions.EMPTY_STACK });
    }

    const pushActionToStack = (item: any, action: PropertyEditorStackAction): void => {
        const reverseAction = actionToReverseAction(action);

        propertyEditorActionsStack.dispatch({
            type: PropertyEditorActionsStackActions.PUSH_ACTION,
            payload: { item, action, reverseAction }
        });
    }

    const popActionFromStack = () => {
        propertyEditorActionsStack.dispatch({
            type: PropertyEditorActionsStackActions.POP_ACTION
        });
    }

    const actionToReverseAction = (action: PropertyEditorStackAction) => {
        switch (action) {
            case PropertyEditorStackAction.ADD_FOOTPRINT:
                return PropertyEditorStackAction.REMOVE_FOOTPRINT
            case PropertyEditorStackAction.UPDATE_FOOTPRINT:
                return PropertyEditorStackAction.UPDATE_FOOTPRINT
            case PropertyEditorStackAction.REMOVE_FOOTPRINT:
                return PropertyEditorStackAction.ADD_FOOTPRINT
            case PropertyEditorStackAction.ADD_OBSTRUCTION:
                return PropertyEditorStackAction.REMOVE_OBSTRUCTION
            case PropertyEditorStackAction.UPDATE_OBSTRUCTION:
                return PropertyEditorStackAction.UPDATE_OBSTRUCTION
            case PropertyEditorStackAction.REMOVE_OBSTRUCTION:
                return PropertyEditorStackAction.ADD_OBSTRUCTION
        }
    }

    return {
        actionsStack: propertyEditorActionsStack.state,
        getLastAction,
        pushActionToStack,
        popActionFromStack,
        emptyStack
    }
}

export default usePropertyEditorActionsStack;