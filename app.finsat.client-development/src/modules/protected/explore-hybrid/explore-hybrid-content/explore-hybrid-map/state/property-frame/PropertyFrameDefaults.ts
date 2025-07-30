import { CartesianCoordinate } from "@hooks/useGeometry";

export type PropertyFrame = {
    base64: string | undefined,
    boundingBox: {
        northwest: CartesianCoordinate,
        northeast: CartesianCoordinate,
        southeast: CartesianCoordinate,
        southwest: CartesianCoordinate
    } | undefined,
}

const PropertyFrameDefaults: PropertyFrame | undefined = undefined;

export default PropertyFrameDefaults;