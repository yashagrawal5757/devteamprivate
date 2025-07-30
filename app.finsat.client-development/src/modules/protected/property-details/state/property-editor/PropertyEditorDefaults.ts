export enum PropertyMapMode {
    EDITOR = 0,
    DETAILS
}

export enum PropertyEditorMode {
    SHAPE = 0,
    OBSTICLE
}

export enum PolygonOperationMode {
    EDIT = 0,
    ADD_POLYGON,
    REMOVE_POLYGON
}

export enum PolygonAlignmentMode {
    MOVE = 0,
    ADD_POINT
}

export enum PropertyEditorModelMode {
    MANUAL = 0,
    SAM
}

export enum PropertyEditorDetectionMode {
    HOVER = 0,
    BOX,
    AI
}

export type PropertyEditor = {
    isInitial: boolean;
    propertyMapMode: PropertyMapMode;
    propertyEditorModelMode: PropertyEditorModelMode;
    propertyEditorMode: PropertyEditorMode;
    polygonOperationMode: PolygonOperationMode;
    polygonAlignmentMode: PolygonAlignmentMode;
    detectionMode: PropertyEditorDetectionMode;
};

const PropertyEditorDefaults: PropertyEditor = {
    isInitial: true,
    propertyMapMode: PropertyMapMode.EDITOR,
    propertyEditorModelMode: PropertyEditorModelMode.MANUAL,
    propertyEditorMode: PropertyEditorMode.SHAPE,
    polygonOperationMode: PolygonOperationMode.EDIT,
    polygonAlignmentMode: PolygonAlignmentMode.MOVE,
    detectionMode: PropertyEditorDetectionMode.HOVER
};

export default PropertyEditorDefaults;
