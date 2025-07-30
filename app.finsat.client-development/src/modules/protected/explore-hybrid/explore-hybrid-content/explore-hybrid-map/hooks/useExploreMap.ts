import { Cartesian3 } from 'cesium';
import { MapOptionsActions } from '../state/map-options/MapOptionsActions';
import { UserLocationActions } from '../state/user-location/UserLocationActions';
import { ShowSimulationAreaOnMapActions } from '../state/show-simulation/ShowSimulationAreaOnMapActions';
import { useNavigate } from 'react-router-dom';
import { Routes, RoutingKeys } from '@routes/router.keys';
import {
    MapPerspective,
    MapRenderType,
    MapTerrainType
} from '../services/map.storage.service';
import { PointOfInterest } from '../state/simulation-data/SimulationDataDefaults';
import useMapOptionsContext from '../contexts/map-options/useMapOptionsContext';
import useShowSimulationAreaOnMapContext from '../contexts/show-simulation/useShowSimulationAreaOnMapContext';
import useUserLocationContext from '../contexts/user-location/useUserLocationContext';

const ZOOM_FACTOR = 0.2;

const useExploreMap = () => {
    const mapOptionsContext = useMapOptionsContext();
    const showSimulationAreaOnMapContext = useShowSimulationAreaOnMapContext();
    const userLocationContext = useUserLocationContext();
    const navigate = useNavigate();

    const activateUserLocation = (viewerRef: any) => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by this browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {
                    coords: { latitude, longitude }
                } = position;

                userLocationContext.dispatch({
                    type: UserLocationActions.SET_LOCATION,
                    payload: { latitude, longitude }
                });

                moveCameraToLocation(viewerRef, latitude, longitude);
            },
            () => {
                alert('Allow permissions.');
            }
        );
    };

    const deactivateUserLocation = () => {
        userLocationContext.dispatch({
            type: UserLocationActions.CLEAR_LOCATION
        });
    };

    const moveCameraToLocation = (
        viewerRef: any,
        latitude: number,
        longitude: number,
        duration: number = 2
    ) => {
        const cartesianPosition = Cartesian3.fromDegrees(
            longitude,
            latitude,
            1000
        );

        const viewer = viewerRef.current.cesiumElement;
        viewer.camera.flyTo({
            destination: cartesianPosition,
            duration
        });
    };

    const zoomIn = (viewerRef: any) => {
        const viewer = viewerRef.current.cesiumElement;
        const camera = viewer.camera;
        camera.zoomIn(camera.positionCartographic.height * ZOOM_FACTOR);
    };

    const zoomOut = (viewerRef: any) => {
        const viewer = viewerRef.current.cesiumElement;
        const camera = viewer.camera;
        camera.zoomOut(camera.positionCartographic.height * ZOOM_FACTOR);
    };

    const setPhotorealistic = (): void => {
        mapOptionsContext.dispatch({
            type: MapOptionsActions.SET_OPTIONS,
            payload: {
                renderType: MapRenderType.PHOTOREALISTIC,
                perspective: MapPerspective.THREE_DIMENSION,
                terrainType: MapTerrainType.SATELLITE
            }
        });
    };

    const setNormal = (): void => {
        mapOptionsContext.dispatch({
            type: MapOptionsActions.SET_OPTIONS,
            payload: {
                renderType: MapRenderType.NORMAL,
                perspective: MapPerspective.TWO_DIMENSION,
                terrainType: MapTerrainType.SATELLITE
            }
        });
    };

    const setTwoDimensional = () => {
        mapOptionsContext.dispatch({
            type: MapOptionsActions.SET_OPTIONS,
            payload: {
                perspective: MapPerspective.TWO_DIMENSION
            }
        });
    };

    const setThreeDimensional = () => {
        mapOptionsContext.dispatch({
            type: MapOptionsActions.SET_OPTIONS,
            payload: {
                perspective: MapPerspective.THREE_DIMENSION
            }
        });
    };

    const setStreet = () => {
        mapOptionsContext.dispatch({
            type: MapOptionsActions.SET_OPTIONS,
            payload: {
                terrainType: MapTerrainType.STREET
            }
        });
    };

    const setSatellite = () => {
        mapOptionsContext.dispatch({
            type: MapOptionsActions.SET_OPTIONS,
            payload: {
                terrainType: MapTerrainType.SATELLITE
            }
        });
    };

    const toggleSimulationOverlay = () => {
        showSimulationAreaOnMapContext.dispatch({
            type: ShowSimulationAreaOnMapActions.TOGGLE_SHOW_SIMULATION
        });
    };

    const navigateToSimulation = (pointOfInterest: PointOfInterest) => {
        navigate(
            RoutingKeys[Routes.SIMULATION].replace(
                ':id',
                pointOfInterest.toString()
            )
        );
    };

    return {
        showSimulationOverlay: showSimulationAreaOnMapContext.state,
        mapOptions: mapOptionsContext.state,
        userLocation: userLocationContext.state,
        setPhotorealistic,
        setNormal,
        setTwoDimensional,
        setThreeDimensional,
        setStreet,
        setSatellite,
        zoomIn,
        zoomOut,
        activateUserLocation,
        deactivateUserLocation,
        moveCameraToLocation,
        toggleSimulationOverlay,
        navigateToSimulation
    };
};

export default useExploreMap;
