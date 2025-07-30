import useMapPositionContext from '../contexts/map-position/useMapPositionContext';
import { MapPositionType } from '../services/map.storage.service';
import { MapPositionActions } from '../state/map-position/MapPositionActions';

const useMapPosition = () => {
    const mapPositionContext = useMapPositionContext();

    /**
     * Sets the map position in session storage and updates the state.
     *
     * @param {MapPositionType} position - The map position to store in session storage.
     *
     * @example
     * setMapPosition({
     *     latitude: 24.774265,
     *     longitude: 46.673856,
     *     height: 1000
     * });
     */
    const setMapPosition = (position: MapPositionType) => {
        mapPositionContext.dispatch({
            type: MapPositionActions.SET_POSITION,
            payload: position
        });
    };

    return {
        position: mapPositionContext.state,
        setMapPosition
    };
};

export default useMapPosition;
