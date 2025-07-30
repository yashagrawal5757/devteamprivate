import useGeometry from '@hooks/useGeometry';
import useWarning from '@hooks/useWarning';
import {
    Camera,
    Cartographic,
    Scene,
    Math as CesiumMath,
    ScreenSpaceEventType
} from 'cesium';
import { PropertyEditorMode } from 'modules/protected/property-details/state/property-editor/PropertyEditorDefaults';

const usePropertyOperationMode = () => {
    const { areAllPointsInsideAnyPolygon } = useGeometry();
    const { setWarningMessage } = useWarning();

    const onAddPolygon = (
        handler: any,
        scene: Scene,
        camera: Camera,
        propertyEditorMode: PropertyEditorMode,
        updateStateCallback: any,
        shapes: Array<Array<[number, number]>>
    ) => {
        handler.setInputAction((event: any) => {
            const cartesian = camera.pickEllipsoid(
                event.position,
                scene.globe.ellipsoid
            );

            if (!cartesian) {
                return;
            }

            const cartographic = Cartographic.fromCartesian(cartesian);
            const longitude = CesiumMath.toDegrees(cartographic.longitude);
            const latitude = CesiumMath.toDegrees(cartographic.latitude);

            const offset = 0.00002;
            const newCoordinates = [
                [latitude - offset, longitude - offset],
                [latitude - offset, longitude + offset],
                [latitude + offset, longitude + offset],
                [latitude + offset, longitude - offset]
            ] as Array<[number, number]>;

            if (propertyEditorMode === PropertyEditorMode.OBSTICLE) {
                const newCoordinatesCartesian = newCoordinates.map(([lat, lon]) => ({ latitude: lat, longitude: lon }));
                const footprintBoarders = shapes.map(polygon =>
                    polygon.map(([lat, lon]) => ({ latitude: lat, longitude: lon }))
                );

                const allInside = areAllPointsInsideAnyPolygon(newCoordinatesCartesian, footprintBoarders);
                if (!allInside) {
                    setWarningMessage('Obstacle must be inside the footprint');
                    return;
                }
            }
            
            const type =
                propertyEditorMode === PropertyEditorMode.SHAPE
                    ? 'shape'
                    : 'obsticle';

            updateStateCallback(type, newCoordinates);
        }, ScreenSpaceEventType.LEFT_CLICK);
    };

    const onRemovePolygon = (
        handler: any,
        scene: Scene,
        propertyEditorMode: PropertyEditorMode,
        updateStateCallback: any
    ) => {
        handler.setInputAction((event: any) => {
            const pickedObjects = scene.drillPick(event.position);

            if (pickedObjects.length === 0) {
                return;
            }

            for (const pickedObject of pickedObjects) {
                const [index, polygonType] = pickedObject.id.name.split('-');

                const type =
                    propertyEditorMode === PropertyEditorMode.SHAPE
                        ? 'shape'
                        : 'obsticle';

                if (type != polygonType) {
                    continue;
                }

                updateStateCallback(type, parseInt(index));
            }
        }, ScreenSpaceEventType.LEFT_CLICK);
    };

    return {
        onAddPolygon,
        onRemovePolygon
    };
};

export default usePropertyOperationMode;
