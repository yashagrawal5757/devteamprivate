import { CartesianCoordinate } from "@hooks/useGeometry";
import usePropertyFrameContext from "../contexts/property-frame/usePropertyFrameContext";
import { PropertyFrameBoundingBoxActions, PropertyFrameImageActions } from "../state/property-frame/PropertyFrameActions";

/**
 * Custom hook providing utility functions for interacting with the property frame on a Cesium map.
 *
 * This hook exposes methods to:
 * - Capture a snapshot of the current Cesium map view as a Base64-encoded image, with optional entity hiding for clean images.
 * - Set the captured Base64 image in the property frame context state.
 * - Set the bounding box coordinates for the property frame in the context state.
 * - Access the current Base64 image and bounding box from the property frame context state.
 *
 * @returns An object containing:
 * - `getMapPropertySnapshotAsBase64`: Captures the current map view as a Base64 image.
 * - `setBase64Image`: Sets the Base64 image in the property frame context.
 * - `setBoundingBox`: Sets the bounding box coordinates in the property frame context.
 * - `base64Image`: The current Base64 image from the property frame context.
 * - `boundingBox`: The current bounding box from the property frame context.
 *
 * @example
 * const { getMapPropertySnapshotAsBase64, setBase64Image, setBoundingBox, base64Image, boundingBox } = useMapPropertyFrameTools();
 */
const useMapPropertyFrameTools = () => {
    const propertyFrameContext = usePropertyFrameContext();
    /**
     * Captures a snapshot of the current Cesium map view as a Base64-encoded image.
     *
     * @param viewerRef - A reference to the Cesium viewer, expected to have a `current.cesiumElement` property containing the `scene` and `entities`.
     * @param isMLSnapshot - Optional. If `true`, temporarily hides entities before capturing the snapshot (useful for machine learning or clean map images). Defaults to `false`.
     * @returns A promise that resolves to a tuple containing the image metadata (e.g., MIME type) and the Base64-encoded image data.
     * @throws Will throw an error if the captured image type is unsupported or invalid.
     */
    const getMapPropertySnapshotAsBase64 = async (
        viewerRef: any,
        isMLSnapshot: boolean = false,
    ): Promise<[string, string]> => {
        const { scene, entities } = viewerRef.current.cesiumElement;
        
        if (isMLSnapshot) {
            entities.show = false;

            scene.requestRender();

            await new Promise((resolve) => setTimeout(resolve, 100));
        }
        
        scene.render();
        const [meta, base64Data] = scene.canvas.toDataURL().split(',');

        entities.show = true;

        const mimeMatch = meta.match(
            /^data:(image\/(png|jpeg|jpg|tiff));base64$/
        );
        if (!mimeMatch) {
            throw new Error('Unsupported or invalid image type');
        }

        return [meta, base64Data];
    };

    /**
     * Sets the base64-encoded image for the property frame.
     *
     * Dispatches an action to update the property frame image in the context state.
     *
     * @param value - The base64-encoded string representing the image to be set.
     */
    const setBase64Image = (value: string) => {
        propertyFrameContext.dispatch({
            type: PropertyFrameImageActions.SET_PROPERTY_FRAME_IMAGE,
            payload: value
        });
    };

    /**
     * Sets the bounding box for the property frame by dispatching an action to the property frame context.
     *
     * @param value - An object representing the four corners of the bounding box, or `undefined` to clear it.
     * @param value.northwest - The northwest corner coordinates.
     * @param value.northeast - The northeast corner coordinates.
     * @param value.southeast - The southeast corner coordinates.
     * @param value.southwest - The southwest corner coordinates.
     */
    const setBoundingBox = (value: {
        northwest: CartesianCoordinate,
        northeast: CartesianCoordinate,
        southeast: CartesianCoordinate,
        southwest: CartesianCoordinate
    } | undefined) => {
        propertyFrameContext.dispatch({
            type: PropertyFrameBoundingBoxActions.SET_PROPERTY_FRAME_BOUNDING_BOX,
            payload: value
        });
    };

    /**
     * Clears the base64-encoded image for the property frame.
     */
    const clearBase64Image = () => {
        propertyFrameContext.dispatch({
            type: PropertyFrameImageActions.CLEAR_IMAGE
        });
    };

    /**
     * Clears the bounding box for the property frame.
     */
    const clearBoundingBox = () => {
        propertyFrameContext.dispatch({
            type: PropertyFrameBoundingBoxActions.CLEAR_BOUNDING_BOX
        });
    };

    return {
        getMapPropertySnapshotAsBase64,
        setBase64Image,
        setBoundingBox,
        base64Image: propertyFrameContext.state?.base64,
        boundingBox: propertyFrameContext.state?.boundingBox,
        clearBase64Image,
        clearBoundingBox
    }
}

export default useMapPropertyFrameTools