export enum EditorDetectionMode {
    HOVER = 0,
    BOX
}

export type ExploreEditor = {
    isInitial: boolean;
    detectionMode: EditorDetectionMode;
};

const ExploreEditorDefaults: ExploreEditor = {
    isInitial: true,
    detectionMode: EditorDetectionMode.HOVER
};

export default ExploreEditorDefaults