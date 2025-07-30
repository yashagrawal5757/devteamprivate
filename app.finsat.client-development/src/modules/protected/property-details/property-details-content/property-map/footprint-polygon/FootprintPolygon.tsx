import {
    Cartesian3,
    Color,
    ScreenSpaceEventHandler,
    ScreenSpaceEventType,
    Viewer
} from 'cesium';
import {
    Footprint,
    PolygonEditMode,
    PropertyFootprint
} from 'modules/protected/property-details/state/property-footprint/PropertyFootprintDefaults';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CesiumComponentRef, Entity, PolygonGraphics } from 'resium';
import useFootprintPolygon from './hooks/useFootprintPolygon';
import {
    PolygonAlignmentMode,
    PolygonOperationMode
} from 'modules/protected/property-details/state/property-editor/PropertyEditorDefaults';
import usePropertyEditor from 'modules/protected/property-details/hooks/property-editor/usePropertyEditor';
import _ from 'lodash';

type FootprintPolygonProps = {
    id: string;
    viewerRef: React.MutableRefObject<CesiumComponentRef<Viewer> | null>;
    coordinates: Array<[number, number]>;
    onCoordinatesUpdate: (coordinates: Array<Cartesian3>) => void;
    isEditEnabled: boolean;
    resetCoordinates: boolean;
    color: string;
    onMount: any;
    onUnmount: any;
    zIndex?: number;
};

const FootprintPolygon = ({
    id,
    viewerRef,
    coordinates,
    isEditEnabled,
    resetCoordinates,
    color,
    onMount,
    onUnmount,
    zIndex,
    onCoordinatesUpdate
}: FootprintPolygonProps) => {
    const {
        draggingIndex,
        activeIndex,
        onDragStart,
        onDrag,
        onDragStop,
        onAddPoint
    } = useFootprintPolygon();

    const { propertyEditor } = usePropertyEditor();

    const [positions, setPositions] = useState<Array<Cartesian3>>([]);
    const [isUpdatedByCoordinatesChange, setIsUpdatedByCoordinatesChange] = useState<boolean>(false);

    const positionsStateRef = useRef<Array<Cartesian3>>(positions);
    const eventHandlerRef = useRef<any>(null);

    const isPickMode = useMemo(
        () =>
            propertyEditor.polygonOperationMode === PolygonOperationMode.EDIT &&
            propertyEditor.polygonAlignmentMode === PolygonAlignmentMode.MOVE,
        [
            propertyEditor.polygonOperationMode,
            propertyEditor.polygonAlignmentMode
        ]
    );

    const debouncedCoordinatesUpdate = useMemo(
        () => _.debounce((latestPositions) => {
            if (!onCoordinatesUpdate) {
                return;
            }

            onCoordinatesUpdate(latestPositions);
        }, 500),
        [onCoordinatesUpdate]
    );

    useEffect(() => {
        const parsedPositions: Array<Cartesian3> = [];

        for (const coordinatePair of coordinates) {
            const [latitude, longitude] = coordinatePair;

            parsedPositions.push(Cartesian3.fromDegrees(longitude, latitude));
        }

        setIsUpdatedByCoordinatesChange(true);
        setPositions(parsedPositions);
    }, [coordinates]);

    useEffect(() => {
        if (viewerRef === null) {
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

        eventHandlerRef.current = new ScreenSpaceEventHandler(scene.canvas);

        onDrag(eventHandlerRef, scene, positions, isEditEnabled, setPositions);
        onDragStop(eventHandlerRef);
        onAddPoint(
            eventHandlerRef,
            scene,
            positions,
            isPickMode,
            isEditEnabled,
            setPositions
        );

        return () => {
            if (eventHandlerRef.current) {
                eventHandlerRef.current.destroy();
            }
        };
    }, [
        draggingIndex,
        positions,
        propertyEditor.polygonAlignmentMode,
        eventHandlerRef.current
    ]);

    useEffect(() => {
        if (
            viewerRef.current &&
            viewerRef.current.cesiumElement &&
            viewerRef.current.cesiumElement.screenSpaceEventHandler
        ) {
            viewerRef.current.cesiumElement.screenSpaceEventHandler.removeInputAction(
                ScreenSpaceEventType.LEFT_DOUBLE_CLICK
            );
        }
    }, []);

    useEffect(() => {
        positionsStateRef.current = positions;

        if (isUpdatedByCoordinatesChange) {
            setIsUpdatedByCoordinatesChange(false);
            return;
        }

        debouncedCoordinatesUpdate(positions);

        return () => {
            debouncedCoordinatesUpdate.cancel();
        };
    }, [positions]);

    useEffect(() => {
        const child = { getState: () => positionsStateRef.current };

        onMount(child);

        return () => onUnmount(child);
    }, [onMount, onUnmount]);

    return (
        <>
            <Entity name={id}>
                <PolygonGraphics
                    key={`${id}`}
                    hierarchy={positions}
                    material={Color.fromCssColorString(color).withAlpha(0.5)}
                    outlineColor={Color.WHITE}
                    outlineWidth={3}
                    zIndex={zIndex}
                />
            </Entity>
            {isEditEnabled &&
                positions.map((pos, index) => (
                    <Entity
                        key={index}
                        position={pos}
                        point={{
                            pixelSize: 5,
                            color: Color.RED.withAlpha(1)
                        }}
                        onClick={() => onDragStart(index, isPickMode)}
                    />
                ))}
            {activeIndex !== null && positions[activeIndex] && (
                <Entity
                    position={positions[activeIndex]}
                    box={{
                        dimensions: new Cartesian3(2, 2, 2),
                        material: Color.TRANSPARENT.withAlpha(0.01)
                    }}
                />
            )}
        </>
    );
};

export default FootprintPolygon;
