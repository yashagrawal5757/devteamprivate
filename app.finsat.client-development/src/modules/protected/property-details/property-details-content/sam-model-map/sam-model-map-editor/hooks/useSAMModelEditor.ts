import { useRef, useState, MouseEvent as ReactMouseEvent, } from "react";
import { SegmentationClicksType } from "../../state/segmentation/SegmentationDefaults";
import useSegmentation from "../../hooks/useSegmentation";
import _ from "lodash";
import useGeometry, { CartesianCoordinate } from "@hooks/useGeometry";
import useSAMModelApi from "../../hooks/useSAMModelApi";
import { formatPromiseResponse } from "@services/promiseUtils";
import { AxiosResponse } from "axios";
import useSAMModel from "../../hooks/useSAMModel";
import usePropertyEditor from "modules/protected/property-details/hooks/property-editor/usePropertyEditor";
import { PropertyEditorDetectionMode, PropertyEditorMode } from "modules/protected/property-details/state/property-editor/PropertyEditorDefaults";
import usePropertyFootprint from "modules/protected/property-details/hooks/property-footprint/usePropertyFootprint";
import useWarning from "@hooks/useWarning";
import { generateUuid } from "@services/cryptoUtils";
import { PropertyEditorStackAction } from "modules/protected/property-details/state/property-editor-actions-stack/PropertyEditorActionsStackDefaults";
import usePropertyEditorActionsStack from "modules/protected/property-details/hooks/property-editor/usePropertyEditorActionsStack";

const useSAMModelEditor = () => {
    const [fixedClicks, setFixedClicks] = useState<Array<SegmentationClicksType>>([]);
    const [allMasks, setAllMasks] = useState<Array<HTMLImageElement>>([]);
    // const [allPolygons, setAllPolygons] = useState<number[][][]>([]);
    const [allDots, setAllDots] = useState<Array<SegmentationClicksType>>([]);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    const [footprint, setFootprint] = useState<Array<Array<Array<number>>>>([]);
    const [footprintPx, setFootprintPx] = useState<Array<Array<Array<number>>>>([]);
    // const [allPolygonsGeometry, setAllPolygonsGeometry] = useState<number[][][]>([]);
    const [dragStart, setDragStart] = useState<[number, number] | undefined>(undefined);
    const [dragCurrent, setDragCurrent] = useState<[number, number] | undefined>(undefined);
    const [imageRectangle, setImageRectangle] = useState<DOMRect | undefined>(undefined);

    const [pendingBoxSave, setPendingBoxSave] = useState<boolean>(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const { segmentation, setClicks, setMaskImage } = useSegmentation();
    const { propertyEditor } = usePropertyEditor();

    const { maskToPolygon, pixelToGeometry } = useSAMModel();
    const { extractFootprint } = useSAMModelApi();
    const { footprint: propertyFootprint, addFootprint, clearFootprint } = usePropertyFootprint();
    const { areAllPointsInsideAnyPolygon } = useGeometry();
    const { setWarningMessage } = useWarning();
    const { pushActionToStack, emptyStack } = usePropertyEditorActionsStack();

    const getClick = (x: number, y: number): SegmentationClicksType => {
        return { x, y, clickType: 1 };
    }

    const handleMouseMove = _.throttle((e: ReactMouseEvent<HTMLImageElement, MouseEvent>) => {
        e.persist();

        if (isFinished || segmentation.image === undefined) {
            return;
        }

        let element = e.target as HTMLElement | null;

        if (element === null) {
            return;
        }

        const rectangle = element.getBoundingClientRect();
        let x = e.clientX - rectangle.left;
        let y = e.clientY - rectangle.top;

        const imageScale = segmentation.image.width / element.offsetWidth;
        x *= imageScale;
        y *= imageScale;

        if (propertyEditor.detectionMode === PropertyEditorDetectionMode.HOVER) {
            const click = getClick(x, y);

            setClicks([...(fixedClicks || []), click]);
        }
        else if (propertyEditor.detectionMode === PropertyEditorDetectionMode.BOX && dragStart) {
            setDragCurrent([x, y]);
            setClicks([
                { x: dragStart[0], y: dragStart[1], clickType: 2 },
                { x, y, clickType: 3 },
            ]);
        }
    }, 15);

    const handleMouseDownInternal = (e: ReactMouseEvent<HTMLImageElement, MouseEvent>, boundingBox: { northeast: CartesianCoordinate, northwest: CartesianCoordinate, southeast: CartesianCoordinate, southwest: CartesianCoordinate } | undefined, dimensions: { width: number, height: number }) => {
        e.persist();

        if (isFinished || segmentation.image === undefined) {
            return;
        }

        let element = e.target as HTMLElement | null;

        if (element === null) {
            return;
        }

        const rectangle = element.getBoundingClientRect();
        let x = e.clientX - rectangle.left;
        let y = e.clientY - rectangle.top;

        const imageScale = segmentation.image.width / element.offsetWidth;
        x *= imageScale;
        y *= imageScale;

        if (boundingBox === undefined) {
            return;
        }

        if (propertyEditor.detectionMode === PropertyEditorDetectionMode.HOVER) {
            if (segmentation.maskImage !== undefined) {
                setAllMasks(prev => [...prev, segmentation.maskImage!]);
                maskToPolygon(segmentation.maskImage)
                    .then(polygon => {
                        if (polygon.length === 0) {
                            return;
                        }

                        if (segmentation.image === undefined) {
                            return;
                        }
                        const polygonGeometry = polygon.map(([px, py]) => pixelToGeometry(px, py, dimensions.width, dimensions.height, boundingBox));

                        if (propertyEditor.propertyEditorMode === PropertyEditorMode.OBSTICLE) {
                            if (!checkIsInsideBoundaries(polygonGeometry)) {
                                setWarningMessage('Obstacle must be inside the footprint');
                                return;
                            }
                        }

                        const hoverPolygonType = propertyEditor.propertyEditorMode === PropertyEditorMode.SHAPE ? 'shape' : 'obsticle';
                        const hoverStackActionType = propertyEditor.propertyEditorMode === PropertyEditorMode.SHAPE ? PropertyEditorStackAction.ADD_FOOTPRINT : PropertyEditorStackAction.ADD_OBSTRUCTION;
                        const hoverPolygonId = generateUuid();

                        addFootprint(
                            hoverPolygonType,
                            polygonGeometry,
                            hoverPolygonId
                        );
                        pushActionToStack({ id: hoverPolygonId, data: polygonGeometry }, hoverStackActionType);
                    });
            }

            setFixedClicks([]);
            setClicks([]);
            setAllMasks([]);
            setMaskImage(undefined);
        }

        if (propertyEditor.detectionMode === PropertyEditorDetectionMode.BOX) {
            if (pendingBoxSave && segmentation.maskImage !== undefined) {
                setAllMasks(prev => [...prev, segmentation.maskImage!]);

                maskToPolygon(segmentation.maskImage)
                    .then(polygon => {
                        if (polygon.length === 0) {
                            return;
                        }

                        if (segmentation.image === undefined) {
                            return;
                        }

                        const polygonGeometry = polygon.map(([px, py]) => pixelToGeometry(px, py, dimensions.width, dimensions.height, boundingBox));

                        if (propertyEditor.propertyEditorMode === PropertyEditorMode.OBSTICLE) {
                            if (!checkIsInsideBoundaries(polygonGeometry)) {
                                setWarningMessage('Obstacle must be inside the footprint');
                                return;
                            }
                        }

                        const boxPolygonType = propertyEditor.propertyEditorMode === PropertyEditorMode.SHAPE ? 'shape' : 'obsticle';
                        const boxStackActionType = propertyEditor.propertyEditorMode === PropertyEditorMode.SHAPE ? PropertyEditorStackAction.ADD_FOOTPRINT : PropertyEditorStackAction.ADD_OBSTRUCTION;
                        const boxPolygonId = generateUuid();

                        addFootprint(boxPolygonType, polygonGeometry, boxPolygonId);
                        pushActionToStack({ id: boxPolygonId, data: polygonGeometry }, boxStackActionType);
                    });

                setMaskImage(undefined);
                setClicks([]);
                setAllMasks([]);
                setPendingBoxSave(false);
            }

            setImageRectangle(rectangle);
            setDragStart([x, y]);
            setDragCurrent([x, y]);
            setClicks([
                { x, y, clickType: 2 },
                { x, y, clickType: 3 },
            ]);
            setMaskImage(undefined);
        }
    };

    const checkIsInsideBoundaries = (polygonGeometry: Array<Array<number>>): boolean => {
        const polygonGeometryAsCartesian: CartesianCoordinate[] = polygonGeometry.map(([longitude, latitude]) => ({ longitude, latitude }));
        const propertyFootprintShapesAsCartesian: CartesianCoordinate[][] = propertyFootprint.shapes.map(shape => shape.data).map(
            (polygon: [number, number][]) =>
                polygon.map(([longitude, latitude]) => ({ longitude, latitude }))
        );

        return areAllPointsInsideAnyPolygon(polygonGeometryAsCartesian, propertyFootprintShapesAsCartesian);
    }

    const handleMouseUp = () => {
        if (propertyEditor.detectionMode !== PropertyEditorDetectionMode.BOX || !dragStart || !dragCurrent) {
            return;
        }

        setClicks([
            { x: dragStart[0], y: dragStart[1], clickType: 2 },
            { x: dragCurrent[0], y: dragCurrent[1], clickType: 3 }
        ]);

        setDragStart(undefined);
        setDragCurrent(undefined);
        setPendingBoxSave(true);
    }

    const handleConfirm = async (footprint: { northeast: CartesianCoordinate, northwest: CartesianCoordinate, southeast: CartesianCoordinate, southwest: CartesianCoordinate }): Promise<void> => {
        setIsFinished(true);

        if (segmentation.image === undefined) {
            return;
        }

        if (allMasks.length === 0) {
            return;
        }

        try {
            const { response, error } =
                await formatPromiseResponse<
                    AxiosResponse<any, any>
                >(
                    extractFootprint({
                        masks: allMasks.map(mask => mask.src),
                        footprint,
                        width: segmentation.image.width,
                        height: segmentation.image.height
                    })
                );

            if (error || response === null) {
                return;
            }

            const data = response.data;

            setFootprint(data.footprint);
            setFootprintPx(data.footprint_px);
        } catch (error) {
            console.error(error);
        }
    }

    const handleUndo = () => {
        setAllMasks(prev => prev.slice(0, -1));

        if (isFinished) {
            setIsFinished(false);
        }
    }

    const handleClearAll = () => {
        setAllMasks([]);

        const type = propertyEditor.propertyEditorMode === PropertyEditorMode.SHAPE ? 'shape' : 'obsticle';

        if (propertyEditor.propertyEditorMode === PropertyEditorMode.SHAPE) {
            clearFootprint('obsticle');
        }

        clearFootprint(type);
        emptyStack();
        // setAllDots([]);

        if (isFinished) {
            setIsFinished(false);
        }
    };

    return {
        wrapperRef,
        allMasks,
        allDots,
        fixedClicks,
        footprintPx,
        imageRectangle,
        dragStart,
        dragCurrent,
        pendingBoxSave,
        handleMouseMove,
        handleMouseDown: handleMouseDownInternal,
        handleMouseUp,
        handleConfirm,
        handleUndo,
        handleClearAll,
        setAllMasks,
        setPendingBoxSave
    }
}

export default useSAMModelEditor;