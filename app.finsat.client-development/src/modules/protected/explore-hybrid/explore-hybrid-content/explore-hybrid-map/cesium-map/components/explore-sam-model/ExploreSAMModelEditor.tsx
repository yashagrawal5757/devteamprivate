import { useEffect } from 'react'
import _ from 'lodash';
import useExploreSAMModelEditor from './hooks/useExploreSAMModelEditor';
import useExploreSegmentation from '@explore/explore-hybrid-content/explore-hybrid-map/hooks/explore-sam-model/useExploreSegmentation';
import useExploreSAMModel from '@explore/explore-hybrid-content/explore-hybrid-map/hooks/explore-sam-model/useExploreSAMModel';
import useExploreEditorThrottledMouseDown from './hooks/useExploreEditorThrottledMouseDown';
import ExploreSAMEditorActions from './editor-actions/ExploreSAMEditorActions';
import useExploreEditor from '@explore/explore-hybrid-content/explore-hybrid-map/hooks/explore-editor/useExploreEditor';
import { EditorDetectionMode } from '@explore/explore-hybrid-content/explore-hybrid-map/state/explore-editor/ExploreEditorDefaults';
import ExploreSAMEditorBoxOverlay from './editor-box-overlay/ExploreSAMEditorBoxOverlay';
import useMapPropertyFrameTools from '@explore/explore-hybrid-content/explore-hybrid-map/hooks/usePropertyMapTools';
import { generateUuid } from '@services/cryptoUtils';
import useExploreFootprint from '@explore/explore-hybrid-content/explore-hybrid-map/hooks/explore-footprint/useExploreFootprint';


type ExploreSAMModelMapEditorProps = {
    isLoadingState: boolean;
    dimensions: { width: number, height: number };
    onCloseEditorClick?: () => void;
}

const ExploreSAMModelMapEditor = ({ isLoadingState, dimensions, onCloseEditorClick }: ExploreSAMModelMapEditorProps) => {
    const {
        wrapperRef,
        allMasks,
        allDots,
        fixedClicks,
        imageRectangle,
        dragStart,
        dragCurrent,
        pendingBoxSave,
        handleMouseMove,
        handleMouseDown,
        handleMouseUp,
        handleClearAll,
        handleCloseEditor,
        setAllMasks,
        setPendingBoxSave,
    } = useExploreSAMModelEditor();
    const { exploreSegmentation, setMaskImage, setClicks, setEmbedding } = useExploreSegmentation();
    const { exploreEditor } = useExploreEditor();
    const { maskToPolygon, pixelToGeometry } = useExploreSAMModel();
    const { boundingBox } = useMapPropertyFrameTools();
    const { setExploreFootprint, clearExploreFootprint } = useExploreFootprint();

    const onMouseDown = useExploreEditorThrottledMouseDown<HTMLImageElement>(
        handleMouseDown,
        boundingBox === undefined ? undefined : {
            northeast: boundingBox.northeast,
            northwest: boundingBox.northwest,
            southeast: boundingBox.southeast,
            southwest: boundingBox.southwest
        },
        dimensions,
        15
    );

    useEffect(() => {
        if (exploreSegmentation.maskImage === undefined || !pendingBoxSave) {
            return;
        }

        setAllMasks(prev => [...prev, exploreSegmentation.maskImage!]);

        maskToPolygon(exploreSegmentation.maskImage!)
            .then(polygon => {
                if (polygon.length === 0 || exploreSegmentation.image === undefined) {
                    return;
                }

                const polygonGeometry = polygon.map(([px, py]) => pixelToGeometry(px, py, dimensions.width, dimensions.height, boundingBox!));
                const hoverPolygonId = generateUuid();
                
                setExploreFootprint(hoverPolygonId, polygonGeometry);
            });

        setMaskImage(undefined);
        setAllMasks([]);
        setClicks([]);
        setPendingBoxSave(false);
    }, [pendingBoxSave, exploreSegmentation.maskImage]);

    const handleCloseEditorWithCallback = () => {
        handleCloseEditor();
        if (onCloseEditorClick) onCloseEditorClick();
    };

    return (
        <div className='flex items-center-justify-center h-full w-full inline-block relative z-30 overflow-hidden rounded' id='map-section'>
            {
                isLoadingState && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 h-full w-full z-[99999]">
                        <p className="text-white text-lg font-semibold">
                            <img src="/ai-processing.svg" alt="Processing AI" />
                        </p>
                    </div>
                )
            }
            <div className="absolute top-6 right-4 w-[220px] z-100">
                <ExploreSAMEditorActions
                    onResetButtonClick={handleClearAll} onCloseEditorClick={handleCloseEditorWithCallback}
                />
            </div>
            <div ref={wrapperRef} className="flex items-center justify-center relative" />
            {
                exploreEditor.detectionMode === EditorDetectionMode.BOX && (
                    <ExploreSAMEditorBoxOverlay
                        wrapperRef={wrapperRef}
                        imageRectangle={imageRectangle}
                        dragStart={dragStart}
                        dragCurrent={dragCurrent}
                        image={exploreSegmentation.image}
                    />
                )
            }
            {
                exploreSegmentation.image !== undefined && (
                    <img
                        className='block h-full w-full'
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        onMouseMove={handleMouseMove}
                        onMouseDown={onMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseOut={() =>
                            _.defer(() => {
                                setMaskImage(undefined);
                                setClicks(undefined);
                            })
                        }
                        src={exploreSegmentation.image.src}
                        alt=""
                    />
                )
            }
            {
                allMasks.map((mask, idx) => (
                    <img
                        key={`final-mask-${idx}`}
                        src={mask.src}
                        className="absolute top-0 left-0 pointer-events-none opacity-40"
                        style={{ width: "100%", height: "100%", zIndex: 100 }}
                        alt=""
                    />
                ))
            }
            {
                exploreSegmentation.image !== undefined && (
                    allDots.map((dot, idx) => {
                        const left = (dot.x / exploreSegmentation.image!.width) * 100;
                        const top = (dot.y / exploreSegmentation.image!.height) * 100;

                        return (
                            <div
                                className='z-[50]'
                                key={`final-dot-${idx}`}
                                style={{
                                    position: "absolute",
                                    left: `${left}%`,
                                    top: `${top}%`,
                                    width: "14px",
                                    height: "14px",
                                    background: "#0074D9",
                                    borderRadius: "50%",
                                    border: "2px solid white",
                                    transform: "translate(-50%, -50%)",
                                    pointerEvents: "none",
                                    zIndex: 10,
                                }}
                            />
                        );
                    })
                )
            }
            {
                exploreSegmentation.image !== undefined && (
                    fixedClicks.map((click, idx) => {
                        const left = (click.x / exploreSegmentation.image!.width) * 100;
                        const top = (click.y / exploreSegmentation.image!.height) * 100;

                        return (
                            <div
                                key={`current-dot-${idx}`}
                                style={{
                                    position: "absolute",
                                    left: `${left}%`,
                                    top: `${top}%`,
                                    width: "14px",
                                    height: "14px",
                                    background: "#0074D9",
                                    borderRadius: "50%",
                                    border: "2px solid white",
                                    transform: "translate(-50%, -50%)",
                                    pointerEvents: "none",
                                    zIndex: 15,
                                }}
                            />
                        );
                    })
                )
            }
            {
                exploreSegmentation.maskImage !== undefined && (
                    <img
                        src={exploreSegmentation.maskImage.src}
                        className='absolute top-0 left-0 pointer-events-none h-full w-full opacity-40'
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        alt=""
                    />
                )
            }
            {
                exploreSegmentation.image !== undefined && (
                    <svg
                        style={{
                            position: "absolute",
                            inset: 0,
                            pointerEvents: "none",
                            zIndex: 99,
                            width: "100%",
                            height: "100%"
                        }}
                    >
                    </svg>
                )
            }
        </div>
    )
}

export default ExploreSAMModelMapEditor