import { Cartesian3, Scene, ScreenSpaceEventType } from 'cesium';
import { useState } from 'react';

const useFootprintPolygon = () => {
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const onDragStart = (index: number, isPickPointMode: boolean): void => {
        if (!isPickPointMode) {
            return;
        }

        setDraggingIndex(index);
        setActiveIndex(index);
    };

    const onDrag = (
        eventHandlerRef: any,
        scene: Scene,
        positions: Array<Cartesian3>,
        isActive: boolean,
        updateStateCallback: any
    ) => {
        eventHandlerRef.current.setInputAction((movement: any) => {
            if (!(draggingIndex !== null && isActive)) {
                return;
            }

            const cartesian = scene.pickPosition(movement.endPosition);

            if (!cartesian) {
                return;
            }

            updateStateCallback((prev: any) => {
                const updated = [...prev];
                updated[draggingIndex] = cartesian;
                return updated;
            });
        }, ScreenSpaceEventType.MOUSE_MOVE);
    };

    const onDragStop = (eventHandlerRef: any): void => {
        eventHandlerRef.current.setInputAction(() => {
            setDraggingIndex(null);
            setActiveIndex(null);
        }, ScreenSpaceEventType.LEFT_UP);
    };

    const onAddPoint = (
        eventHandlerRef: any,
        scene: Scene,
        positions: Array<Cartesian3>,
        isPickPointMode: boolean,
        isActive: boolean,
        updateStateCallback: any
    ) => {
        eventHandlerRef.current.setInputAction((movement: any) => {
            const cartesian = scene.pickPosition(movement.position);

            if (!cartesian) {
                return;
            }

            if (isPickPointMode) {
                return;
            }

            if (!isActive) {
                return;
            }

            let closestEdgeIndex = null;
            let minDistance = Number.MAX_VALUE;

            for (let i = 0; i < positions.length; i++) {
                const nextIndex = (i + 1) % positions.length;
                const midpoint = Cartesian3.midpoint(
                    positions[i],
                    positions[nextIndex],
                    new Cartesian3()
                );
                const distance = Cartesian3.distance(cartesian, midpoint);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestEdgeIndex = nextIndex;
                }
            }

            if (closestEdgeIndex === null) {
                return;
            }

            updateStateCallback((prev: any) => {
                const updated = [...prev];
                updated.splice(closestEdgeIndex, 0, cartesian);
                return updated;
            });
        }, ScreenSpaceEventType.LEFT_CLICK);
    };

    return {
        draggingIndex,
        activeIndex,
        onDragStart,
        onDrag,
        onDragStop,
        onAddPoint
    };
};

export default useFootprintPolygon;
