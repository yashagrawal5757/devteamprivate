import { CartesianCoordinate } from '@hooks/useGeometry';
import useLocationFrameContext from '../../contexts/location-frame/useLocationFrameContext';
import { LocationFrameActions } from '../../state/location-frame/LocationFrameActions';

const useLocationFrame = () => {
    const locationFrame = useLocationFrameContext();

    const setLocationFrame = (
        northwest: CartesianCoordinate,
        northeast: CartesianCoordinate,
        southwest: CartesianCoordinate,
        southeast: CartesianCoordinate
    ) => {
        locationFrame.dispatch({
            type: LocationFrameActions.SET_FRAME,
            payload: {
                topLeft: northwest,
                topRight: northeast,
                bottomLeft: southwest,
                bottomRight: southeast
            }
        });
    };

    const clearLocationFrame = () => {
        locationFrame.dispatch({
            type: LocationFrameActions.CLEAR_FRAME
        });
    };

    return {
        locationFrame: locationFrame.state,
        setLocationFrame,
        clearLocationFrame
    };
};

export default useLocationFrame;
