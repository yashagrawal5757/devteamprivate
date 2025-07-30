export enum PropertyEditorStackAction {
    ADD_FOOTPRINT = 0,
    UPDATE_FOOTPRINT,
    REMOVE_FOOTPRINT,
    ADD_OBSTRUCTION,
    UPDATE_OBSTRUCTION,
    REMOVE_OBSTRUCTION
}

export type PropertyEditorActionsStackItem = {
    item: any;
    action: PropertyEditorStackAction;
    reverseAction: PropertyEditorStackAction;
}

const PropertyEditorActionsStackDefaults: Array<PropertyEditorActionsStackItem> = [];

export default PropertyEditorActionsStackDefaults;