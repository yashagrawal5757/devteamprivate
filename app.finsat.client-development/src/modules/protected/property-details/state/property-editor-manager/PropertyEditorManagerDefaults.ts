import { CartesianCoordinate } from "@hooks/useGeometry"

export type PropertyEditorManagerType = {
    base64Image: string,
    boundingBox: { northwest: CartesianCoordinate, northeast: CartesianCoordinate, southeast: CartesianCoordinate, southwest: CartesianCoordinate } | undefined
}

const PropertyEditorManagerDefaults: PropertyEditorManagerType = {
    base64Image: '',
    boundingBox: undefined
}

export default PropertyEditorManagerDefaults;