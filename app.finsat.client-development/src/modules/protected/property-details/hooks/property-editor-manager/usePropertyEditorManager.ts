import { CartesianCoordinate } from "@hooks/useGeometry";
import usePropertyEditorManagerContext from "../../contexts/property-editor-manager/usePropertyEditorManagerContext";
import { PropertyEditorManagerActions } from "../../state/property-editor-manager/PropertyEditorManagerActions";

const usePropertyEditorManager = () => {
    const propertyEditorManagerContext = usePropertyEditorManagerContext();

    const setBase64Image = (value: string) => {
        propertyEditorManagerContext.dispatch({ 
            type: PropertyEditorManagerActions.SET_BASE64_IMAGE, 
            payload: value 
        });
    };

    const setBoundingBox = (value: { northwest: CartesianCoordinate, northeast: CartesianCoordinate, southeast: CartesianCoordinate, southwest: CartesianCoordinate } | undefined) => {
        propertyEditorManagerContext.dispatch({ 
            type: PropertyEditorManagerActions.SET_BOUNDING_BOX, 
            payload: value 
        });
    };

    return {
        boundingBox: propertyEditorManagerContext.state.boundingBox,
        base64Image: propertyEditorManagerContext.state.base64Image,
        setBase64Image,
        setBoundingBox
    }
};

export default usePropertyEditorManager;