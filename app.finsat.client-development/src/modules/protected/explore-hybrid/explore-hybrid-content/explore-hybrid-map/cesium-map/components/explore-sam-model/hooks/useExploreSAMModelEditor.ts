import { useRef, useState, MouseEvent as ReactMouseEvent, } from "react";
import _ from "lodash";
import { CartesianCoordinate } from "@hooks/useGeometry";
import { generateUuid } from "@services/cryptoUtils";
import { ExploreSegmentationClicksType } from "@explore/explore-hybrid-content/explore-hybrid-map/state/explore-segmentation/ExploreSegmentationDefaults";
import useExploreSegmentation from "@explore/explore-hybrid-content/explore-hybrid-map/hooks/explore-sam-model/useExploreSegmentation";
import useExploreSAMModel from "@explore/explore-hybrid-content/explore-hybrid-map/hooks/explore-sam-model/useExploreSAMModel";
import useExploreEditor from "@explore/explore-hybrid-content/explore-hybrid-map/hooks/explore-editor/useExploreEditor";
import { EditorDetectionMode } from "@explore/explore-hybrid-content/explore-hybrid-map/state/explore-editor/ExploreEditorDefaults";
import useExploreHybridSFModal from "@explore/explore-hybrid-content/explore-hybrid-sf-modal/useExploreHybridSFModal";
import useExploreFootprint from "@explore/explore-hybrid-content/explore-hybrid-map/hooks/explore-footprint/useExploreFootprint";

const useExploreSAMModelEditor = () => {
    const [fixedClicks, setFixedClicks] = useState<Array<ExploreSegmentationClicksType>>([]);
    const [allMasks, setAllMasks] = useState<Array<HTMLImageElement>>([]);
    const [allDots, setAllDots] = useState<Array<ExploreSegmentationClicksType>>([]);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [footprint, setFootprint] = useState<Array<Array<Array<number>>>>([]);
    const [footprintPx, setFootprintPx] = useState<Array<Array<Array<number>>>>([]);
    const [dragStart, setDragStart] = useState<[number, number] | undefined>(undefined);
    const [dragCurrent, setDragCurrent] = useState<[number, number] | undefined>(undefined);
    const [imageRectangle, setImageRectangle] = useState<DOMRect | undefined>(undefined);

    const [pendingBoxSave, setPendingBoxSave] = useState<boolean>(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const { exploreSegmentation, setClicks, setMaskImage, setEmbedding } = useExploreSegmentation();
    const { exploreEditor } = useExploreEditor();

    const { maskToPolygon, pixelToGeometry } = useExploreSAMModel();
    const { openModal, closeModal } = useExploreHybridSFModal()
    const { setExploreFootprint, clearExploreFootprint } = useExploreFootprint();

    const getClick = (x: number, y: number): ExploreSegmentationClicksType => {
        return { x, y, clickType: 1 };
    }

    const handleMouseMove = _.throttle((e: ReactMouseEvent<HTMLImageElement, MouseEvent>) => {
        e.persist();

        if (isFinished || exploreSegmentation.image === undefined) {
            return;
        }

        let element = e.target as HTMLElement | null;

        if (element === null) {
            return;
        }

        const rectangle = element.getBoundingClientRect();
        let x = e.clientX - rectangle.left;
        let y = e.clientY - rectangle.top;

        const imageScale = exploreSegmentation.image.width / element.offsetWidth;
        x *= imageScale;
        y *= imageScale;

        if (exploreEditor.detectionMode === EditorDetectionMode.HOVER) {
            const click = getClick(x, y);

            setClicks([...(fixedClicks || []), click]);
        }
        else if (exploreEditor.detectionMode === EditorDetectionMode.BOX && dragStart) {
            setDragCurrent([x, y]);
            setClicks([
                { x: dragStart[0], y: dragStart[1], clickType: 2 },
                { x, y, clickType: 3 },
            ]);
        }
    }, 15);

    const handleMouseDownInternal = (
        e: ReactMouseEvent<HTMLImageElement, MouseEvent>,
        boundingBox: { northeast: CartesianCoordinate, northwest: CartesianCoordinate, southeast: CartesianCoordinate, southwest: CartesianCoordinate } | undefined,
        dimensions: { width: number, height: number }
    ) => {
        e.persist();

        if (isFinished || exploreSegmentation.image === undefined) {
            return;
        }

        let element = e.target as HTMLElement | null;

        if (element === null) {
            return;
        }

        const rectangle = element.getBoundingClientRect();
        let x = e.clientX - rectangle.left;
        let y = e.clientY - rectangle.top;

        const imageScale = exploreSegmentation.image.width / element.offsetWidth;
        x *= imageScale;
        y *= imageScale;

        if (boundingBox === undefined) {
            return;
        }

        if (exploreEditor.detectionMode === EditorDetectionMode.HOVER) {
            if (exploreSegmentation.maskImage !== undefined) {
                setAllMasks(prev => [...prev, exploreSegmentation.maskImage!]);
                maskToPolygon(exploreSegmentation.maskImage)
                    .then(polygon => {
                        if (polygon.length === 0) {
                            return;
                        }

                        if (exploreSegmentation.image === undefined) {
                            return;
                        }

                        const polygonGeometry = polygon.map(([px, py]) => pixelToGeometry(px, py, dimensions.width, dimensions.height, {
                            northeast: boundingBox.northeast,
                            northwest: boundingBox.northwest,
                            southeast: boundingBox.southeast,
                            southwest: boundingBox.southwest
                        }));
                        const hoverPolygonId = generateUuid();

                        setExploreFootprint(hoverPolygonId, polygonGeometry);
                        openModal(true);
                    });
            }

            setFixedClicks([]);
            setClicks([]);
            setAllMasks([]);
            setMaskImage(undefined);
        }

        if (exploreEditor.detectionMode === EditorDetectionMode.BOX) {
            if (pendingBoxSave && exploreSegmentation.maskImage !== undefined) {
                setAllMasks(prev => [...prev, exploreSegmentation.maskImage!]);
                maskToPolygon(exploreSegmentation.maskImage)
                    .then(polygon => {
                        if (polygon.length === 0) {
                            return;
                        }

                        if (exploreSegmentation.image === undefined) {
                            return;
                        }
                        const polygonGeometry = polygon.map(([px, py]) => pixelToGeometry(px, py, dimensions.width, dimensions.height, {
                            northeast: boundingBox.northeast,
                            northwest: boundingBox.northwest,
                            southeast: boundingBox.southeast,
                            southwest: boundingBox.southwest
                        }));
                        const hoverPolygonId = generateUuid();

                        setExploreFootprint(hoverPolygonId, polygonGeometry);
                        openModal(true);
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

    const handleMouseUp = () => {
        if (exploreEditor.detectionMode !== EditorDetectionMode.BOX || !dragStart || !dragCurrent) {
            return;
        }

        setClicks([
            { x: dragStart[0], y: dragStart[1], clickType: 2 },
            { x: dragCurrent[0], y: dragCurrent[1], clickType: 3 }
        ]);

        openModal(true);
        setDragStart(undefined);
        setDragCurrent(undefined);
        setPendingBoxSave(true);
    }

    const handleClearAll = () => {
        setAllMasks([]);

        if (isFinished) {
            setIsFinished(false);
        }
    };

    const handleCloseEditor = () => {
        setMaskImage(undefined);
        setClicks([]);
        setAllMasks([]);
        setEmbedding(undefined);
        setPendingBoxSave(false);
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
        handleClearAll,
        handleCloseEditor,
        setAllMasks,
        setPendingBoxSave
    }
}

export default useExploreSAMModelEditor;