import { useEffect, useMemo } from 'react';
import { Entity, PointGraphics, Viewer } from 'resium';
import usePropertyMap from './hooks/usePropertyMap';
import useProperty from '../../hooks/property/useProperty';
import SolarData from './components/solar-data/SolarData';
import {
    Viewer as CesiumViewer,
    ScreenSpaceEventHandler,
    Math as CesiumMath,
    Cartesian3,
    Color,
    Ellipsoid
} from 'cesium';
import FinancialMetrics from './components/financial-metrics/FinancialMetrics';
import usePropertyFootprint from '../../hooks/property-footprint/usePropertyFootprint';
import FootprintPolygon from './footprint-polygon/FootprintPolygon';
import PropertyEditorActions from '../property-editor-actions/PropertyEditorActions';
import usePropertyEditor from '../../hooks/property-editor/usePropertyEditor';
import {
    PolygonOperationMode,
    PropertyEditorDetectionMode,
    PropertyEditorMode,
    PropertyMapMode
} from '../../state/property-editor/PropertyEditorDefaults';
import usePropertyOperationMode from './hooks/usePropertyOperationMode';
import usePropertyPolygon from './hooks/usePropertyPolygon';
import PropertyEditorAILoading from './property-editor-ai-loading/PropertyEditorAILoading';
import { usePropertyPolygonContext } from '../../contexts/property-editor/PropertyPolygonRefContext';
import PropertyMapActions from '../property-map-actions/PropertyMapActions';
import useInitialFootprint from '../../hooks/initial-footprint/useInitialFootprint';
import EditorInfoOverlay from '../components/editor-info-overlay/EditorInfoOverlay';
import { debounce } from 'lodash';
import usePropertyEditorActionsStack from '../../hooks/property-editor/usePropertyEditorActionsStack';
import { PropertyEditorStackAction } from '../../state/property-editor-actions-stack/PropertyEditorActionsStackDefaults';
import { generateUuid } from '@services/cryptoUtils';
import _ from 'lodash';

const PropertyMap = ({ viewerRef }: any) => {
    const {
        isSolarPanelVisible,
        isFinancialPanelVisible,
        setSolarPanelVisible,
        setFinancialMetricsVisible,
        moveCameraToLocationByFootprint
    } = usePropertyMap();
    const { property } = useProperty();
    const { onAddPolygon, onRemovePolygon } = usePropertyOperationMode();
    const { footprint, addFootprint, removeFootprintByIndex, updateFootprintByIndex, updateObsticleByIndex } =
        usePropertyFootprint();
    const { initialFootprint } = useInitialFootprint();
    const { pushActionToStack } = usePropertyEditorActionsStack();

    const { propertyEditor, setOperationMode, setInitialValue, setDetectionMode } = usePropertyEditor();
    const {
        addPolygonShapeRef,
        removePolygonShapeRef,
        addPolygonObsticleRef,
        removePolygonObsticleRef,
    } = usePropertyPolygonContext();

    const { isAILoading, detectObsticles } =
        usePropertyPolygon();

    const debouncedCameraMovement = useMemo(
        () => debounce(() => {
            if (!viewerRef || !viewerRef.current) {
                return;
            }
            if (!property) {
                return;
            }
            if (!viewerRef.current.cesiumElement) {
                return;
            }

            viewerRef.current.cesiumElement.scene.screenSpaceCameraController.enableRotate = false;
            viewerRef.current.cesiumElement.scene.screenSpaceCameraController.enableTranslate = false;
            viewerRef.current.cesiumElement.scene.screenSpaceCameraController.enableZoom = false;
            viewerRef.current.cesiumElement.scene.screenSpaceCameraController.enableTilt = false;
            viewerRef.current.cesiumElement.scene.screenSpaceCameraController.enableLook = false;

            if (initialFootprint.footprint.length > 0) {
                moveCameraToLocationByFootprint(viewerRef, [initialFootprint.footprint], 0);
                return;
            }
        }, 100),
        [viewerRef.current, initialFootprint]
    )

    useEffect(() => {
        debouncedCameraMovement();

        return () => {
            debouncedCameraMovement.cancel();
        };
    }, [viewerRef.current]);

    useEffect(() => {
        if (
            propertyEditor.polygonOperationMode !==
            PolygonOperationMode.ADD_POLYGON
        ) {
            return;
        }

        if (viewerRef === null) {
            return;
        }

        if (property === null || property === undefined) {
            return;
        }

        if (viewerRef.current === null) {
            return;
        }

        if (
            viewerRef.current.cesiumElement === null ||
            viewerRef.current.cesiumElement === undefined
        ) {
            return;
        }

        const { scene, camera } = viewerRef.current.cesiumElement;

        const handler = new ScreenSpaceEventHandler(scene.canvas);

        onAddPolygon(
            handler,
            scene,
            camera,
            propertyEditor.propertyEditorMode,
            (type: 'shape' | 'obsticle', newCoordinates: any) => {
                const footprintId = generateUuid();

                const stackActionType = type === 'shape' ? PropertyEditorStackAction.ADD_FOOTPRINT : PropertyEditorStackAction.ADD_OBSTRUCTION;

                addFootprint(type, newCoordinates, footprintId);
                pushActionToStack({ id: footprintId, data: newCoordinates }, stackActionType);

                setOperationMode(PolygonOperationMode.EDIT);
            },
            footprint.shapes.map(shape => shape.data)
        );

        return () => handler.destroy();
    }, [propertyEditor.polygonOperationMode]);

    useEffect(() => {
        if (
            propertyEditor.polygonOperationMode !==
            PolygonOperationMode.REMOVE_POLYGON
        ) {
            return;
        }

        if (viewerRef === null) {
            return;
        }

        if (property === null || property === undefined) {
            return;
        }

        if (viewerRef.current === null) {
            return;
        }

        if (
            viewerRef.current.cesiumElement === null ||
            viewerRef.current.cesiumElement === undefined
        ) {
            return;
        }

        const { scene } = viewerRef.current.cesiumElement;

        const handler = new ScreenSpaceEventHandler(scene.canvas);

        onRemovePolygon(
            handler,
            scene,
            propertyEditor.propertyEditorMode,
            (type: 'shape' | 'obsticle', index: number) => {
                const footprintAtIndex = type === 'shape' ? footprint.shapes[index] : footprint.obsticles[index];

                const stackActionType = type === 'shape' ? PropertyEditorStackAction.REMOVE_FOOTPRINT : PropertyEditorStackAction.REMOVE_OBSTRUCTION;

                pushActionToStack(footprintAtIndex, stackActionType);
                removeFootprintByIndex(type, index);
            }
        );

        return () => handler.destroy();
    }, [propertyEditor.polygonOperationMode]);

    const isFootprintEmpty = useMemo(() => footprint.shapes.length === 0, [footprint]);

    if (property === undefined) {
        return;
    }

    return (
        <div className="relative h-full mt-4 overflow-hidden rounded">
            <Viewer
                key={'footprint-map'}
                ref={viewerRef}
                className="w-full h-full"
                animation={false}
                timeline={false}
                fullscreenButton={false}
                baseLayerPicker={false}
                infoBox={false}
                homeButton={false}
                navigationHelpButton={false}
                projectionPicker={false}
                sceneModePicker={false}
                geocoder={false}
            // selectionIndicator={false}
            >
                {footprint.shapes.map((shape, index) => (
                    <FootprintPolygon
                        key={index}
                        id={`${index.toString()}-shape`}
                        viewerRef={viewerRef}
                        coordinates={shape.data}
                        isEditEnabled={
                            propertyEditor.propertyMapMode ===
                            PropertyMapMode.EDITOR &&
                            propertyEditor.propertyEditorMode ===
                            PropertyEditorMode.SHAPE &&
                            propertyEditor.polygonOperationMode ===
                            PolygonOperationMode.EDIT
                        }
                        color={'#36EBC4'}
                        onMount={addPolygonShapeRef}
                        onUnmount={removePolygonShapeRef}
                        onCoordinatesUpdate={(positions) => {
                            const footprint: Array<[number, number]> = [];

                            positions.forEach((position) => {
                                const cartographic = Ellipsoid.WGS84.cartesianToCartographic(position);
                                const latitude = CesiumMath.toDegrees(cartographic.latitude);
                                const longitude = CesiumMath.toDegrees(cartographic.longitude);

                                footprint.push([latitude, longitude]);
                            });

                            pushActionToStack(_.cloneDeep(shape), PropertyEditorStackAction.UPDATE_FOOTPRINT);
                            updateFootprintByIndex(index, footprint);
                        }}
                        resetCoordinates={false}
                    />
                ))}
                {footprint.obsticles.map((obsticle, index) => (
                    <FootprintPolygon
                        key={index}
                        id={`${index.toString()}-obsticle`}
                        viewerRef={viewerRef}
                        coordinates={obsticle.data}
                        isEditEnabled={
                            propertyEditor.propertyMapMode ===
                            PropertyMapMode.EDITOR &&
                            propertyEditor.propertyEditorMode ===
                            PropertyEditorMode.OBSTICLE &&
                            propertyEditor.polygonOperationMode ===
                            PolygonOperationMode.EDIT
                        }
                        color={'#ef4545'}
                        onMount={addPolygonObsticleRef}
                        onUnmount={removePolygonObsticleRef}
                        onCoordinatesUpdate={(positions) => {
                            const footprint: Array<[number, number]> = [];

                            positions.forEach((position) => {
                                const cartographic = Ellipsoid.WGS84.cartesianToCartographic(position);
                                const latitude = CesiumMath.toDegrees(cartographic.latitude);
                                const longitude = CesiumMath.toDegrees(cartographic.longitude);

                                footprint.push([latitude, longitude]);
                            });

                            pushActionToStack(_.cloneDeep(obsticle), PropertyEditorStackAction.UPDATE_OBSTRUCTION);
                            updateObsticleByIndex(index, footprint);
                        }}
                        resetCoordinates={false}
                        zIndex={50}
                    />
                ))}
                {/* {
                    <Entity
                        position={Cartesian3.fromDegrees(property.location.position.longitude, property.location.position.latitude, 10)}
                        show={propertyEditor.isInitial && propertyEditor.propertyMapMode === PropertyMapMode.EDITOR}
                        onClick={() => {
                            setInitialValue(false);
                            setDetectionMode(PropertyEditorDetectionMode.HOVER);
                        }}
                    >
                        <PointGraphics
                            pixelSize={20}
                            color={Color.fromCssColorString("#36EBC4")}
                            outlineColor={Color.fromAlpha(Color.fromCssColorString("#36EBC4"), 0.5)}
                            outlineWidth={10}
                        />
                    </Entity>
                } */}
            </Viewer>
            {propertyEditor.propertyMapMode === PropertyMapMode.DETAILS && (
                <>
                    <SolarData
                        isOpen={isSolarPanelVisible}
                        onClose={() => setSolarPanelVisible(false)}
                        onOpen={() => setSolarPanelVisible(true)}
                        isFinancialPanelOpen={isFinancialPanelVisible}
                    />
                    <FinancialMetrics
                        isOpen={isFinancialPanelVisible}
                        onClose={() => setFinancialMetricsVisible(false)}
                        onOpen={() => setFinancialMetricsVisible(true)}
                    />
                </>
            )}
            {(propertyEditor.isInitial || isAILoading) && <PropertyEditorAILoading />}
            {
                propertyEditor.propertyMapMode === PropertyMapMode.EDITOR && (
                    <EditorInfoOverlay />
                )
            }
            {
                (!propertyEditor.isInitial || propertyEditor.propertyMapMode === PropertyMapMode.DETAILS) && (
                    <PropertyMapActions>
                        <PropertyEditorActions
                            onDetectObsticles={() =>
                                detectObsticles(viewerRef, footprint.shapes.map(shape => shape.data))
                            }
                        />
                    </PropertyMapActions>
                )
            }
        </div>
    );
};

export default PropertyMap;
