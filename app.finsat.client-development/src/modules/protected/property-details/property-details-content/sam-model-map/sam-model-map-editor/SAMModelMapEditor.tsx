import React, { useEffect, useMemo } from 'react'
import SAMEditorActions from './sam-editor-actions/SAMEditorActions'
import useSAMModelEditor from './hooks/useSAMModelEditor'
import useSegmentation from '../hooks/useSegmentation';
import useThrottledMouseDown from './hooks/useThrottledMouseDown';
import SAMEditorBoxOverlay from './sam-editor-box-overlay/SAMEditorBoxOverlay';
import _ from 'lodash';
import PropertyEditorAILoading from '../../property-map/property-editor-ai-loading/PropertyEditorAILoading';
import useGeometry, { CartesianCoordinate } from '@hooks/useGeometry';
import usePropertyEditor from 'modules/protected/property-details/hooks/property-editor/usePropertyEditor';
import { PropertyEditorDetectionMode, PropertyMapMode, PropertyEditorMode } from 'modules/protected/property-details/state/property-editor/PropertyEditorDefaults';
import usePropertyFootprint from 'modules/protected/property-details/hooks/property-footprint/usePropertyFootprint';
import useSAMModel from '../hooks/useSAMModel';
import EditorInfoOverlay from '../../components/editor-info-overlay/EditorInfoOverlay';
import PropertyMapActions from '../../property-map-actions/PropertyMapActions';
import useWarning from '@hooks/useWarning';
import { generateUuid } from '@services/cryptoUtils';
import { PropertyEditorStackAction } from 'modules/protected/property-details/state/property-editor-actions-stack/PropertyEditorActionsStackDefaults';
import usePropertyEditorActionsStack from 'modules/protected/property-details/hooks/property-editor/usePropertyEditorActionsStack';
import usePropertyEditorManager from 'modules/protected/property-details/hooks/property-editor-manager/usePropertyEditorManager';

type SAMModelMapEditorProps = {
    isLoadingState: boolean;
	dimensions: { width: number, height: number };
}

const SAMModelMapEditor = ({ isLoadingState, dimensions }: SAMModelMapEditorProps) => {
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
        handleUndo,
        handleClearAll,
        handleConfirm,
        setAllMasks,
        setPendingBoxSave,
    } = useSAMModelEditor();
    const { segmentation, setMaskImage, setClicks } = useSegmentation();
    const { propertyEditor } = usePropertyEditor();
    const { footprint: { shapes: footprints, obsticles: obstructions }, addFootprint } = usePropertyFootprint();
    const { geometryToPixel, maskToPolygon, pixelToGeometry } = useSAMModel();
    const { areAllPointsInsideAnyPolygon } = useGeometry();
    const { setWarningMessage } = useWarning();
    const { pushActionToStack } = usePropertyEditorActionsStack();
    const { boundingBox: boundingBoxReference } = usePropertyEditorManager();

    const onMouseDown = useThrottledMouseDown<HTMLImageElement>(
        handleMouseDown,
        boundingBoxReference,
        dimensions,
        15
    );

    useEffect(() => {
        if (segmentation.maskImage === undefined) {
            return;
        }

        if (!pendingBoxSave) {
            return;
        }

        setAllMasks(prev => [...prev, segmentation.maskImage!]);

        maskToPolygon(segmentation.maskImage!)
            .then(polygon => {
                if (polygon.length === 0) {
                    return;
                }

                if (segmentation.image === undefined) {
                    return;
                }

                if (boundingBoxReference === undefined) {
                    return;
                }

                const polygonGeometry = polygon.map(([px, py]) => pixelToGeometry(px, py, dimensions.width, dimensions.height, boundingBoxReference!));

                if (propertyEditor.propertyEditorMode === PropertyEditorMode.OBSTICLE) {
                    const polygonGeometryAsCartesian: CartesianCoordinate[] = polygonGeometry.map(([longitude, latitude]) => ({ longitude, latitude }));
                    const propertyFootprintShapesAsCartesian: CartesianCoordinate[][] = footprints.map(footprint => footprint.data).map(
                        (polygon: [number, number][]) =>
                            polygon.map(([longitude, latitude]) => ({ longitude, latitude }))
                    );

                    if (!areAllPointsInsideAnyPolygon(polygonGeometryAsCartesian, propertyFootprintShapesAsCartesian)) {
                        setWarningMessage('Obstacle must be inside the footprint');
                        return;
                    }
                }

                const addFootprintType = propertyEditor.propertyEditorMode === PropertyEditorMode.SHAPE ? 'shape' : 'obsticle';
                const addFootprintStackActionType = propertyEditor.propertyEditorMode === PropertyEditorMode.SHAPE ? PropertyEditorStackAction.ADD_FOOTPRINT : PropertyEditorStackAction.ADD_OBSTRUCTION;
                const polygonId = generateUuid();

                addFootprint(addFootprintType, polygonGeometry, polygonId);
                pushActionToStack({ id: polygonId, data: polygonGeometry }, addFootprintStackActionType);
            });

        setMaskImage(undefined);
        setAllMasks([]);
        setClicks([]);
        setPendingBoxSave(false);
    }, [pendingBoxSave, segmentation.maskImage]);

    return (
        <div className='flex items-center-justify-center h-full w-full inline-block relative mt-4 z-30 overflow-hidden rounded' id='map-section'>
            {
                isLoadingState && (
                    <PropertyEditorAILoading />
                )
            }
            <PropertyMapActions style={{zIndex: 100}}>
                <SAMEditorActions
                    onResetButtonClick={handleClearAll}
                />
            </PropertyMapActions>

            {/* <pre className="absolute bottom-0 left-0 bg-white text-xs z-[200]">
                Mode: {mode} | Masks: {allMasks.length} | Dots: {allDots.length}
            </pre> */}
            <div ref={wrapperRef} className="flex items-center justify-center relative">

            </div>
            {
                propertyEditor.detectionMode === PropertyEditorDetectionMode.BOX && (
                    <SAMEditorBoxOverlay
                        wrapperRef={wrapperRef}
                        imageRectangle={imageRectangle}
                        dragStart={dragStart}
                        dragCurrent={dragCurrent}
                        image={segmentation.image}
                    />
                )
            }
            {
                segmentation.image !== undefined && (
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
                        src={segmentation.image.src}
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
                segmentation.image !== undefined && (
                    allDots.map((dot, idx) => {
                        const left = (dot.x / segmentation.image!.width) * 100;
                        const top = (dot.y / segmentation.image!.height) * 100;

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
                segmentation.image !== undefined && (
                    fixedClicks.map((click, idx) => {
                        const left = (click.x / segmentation.image!.width) * 100;
                        const top = (click.y / segmentation.image!.height) * 100;

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
                segmentation.maskImage !== undefined && (
                    <img
                        src={segmentation.maskImage.src}
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
                segmentation.image !== undefined && (
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
                        {
                            footprints.map(footprint => footprint.data).map(footprint => footprint.map((ring, idx) => geometryToPixel(ring[0], ring[1], dimensions.width, dimensions.height, boundingBoxReference!)))
                                .filter(ring => ring.length >= 3 && ring.every(p => Array.isArray(p) && p.length === 2 && Number.isFinite(p[0]) && Number.isFinite(p[1])))
                                .map((ring, idx) => {
                                    const points = ring.map(([x, y]) => `${x},${y}`).join(" ");

                                    return (
                                        <polygon
                                            style={{ fill: "rgba(54, 234, 197, 0.35)" }}
                                            points={points}
                                            // fill="rgba(0, 0, 0, 0.1)"
                                            key={`poly-${idx}`}
                                        />
                                    )
                                })
                        }
                        {
                            obstructions.map(obstruction => obstruction.data).map(footprint => footprint.map((ring, idx) => geometryToPixel(ring[0], ring[1], dimensions.width, dimensions.height, boundingBoxReference!)))
                                .filter(ring => ring.length >= 3 && ring.every(p => Array.isArray(p) && p.length === 2 && Number.isFinite(p[0]) && Number.isFinite(p[1])))
                                .map((ring, idx) => {
                                    const points = ring.map(([x, y]) => `${x},${y}`).join(" ");

                                    return (
                                        <polygon
                                            style={{ fill: "rgba(216, 19, 19, 0.35)" }}
                                            points={points}
                                            key={`poly-${idx}`}
                                        />
                                    )
                                })
                        }
                    </svg>
                )
            }
            {
                propertyEditor.propertyMapMode === PropertyMapMode.EDITOR && (
                    <EditorInfoOverlay />
                )
            }
        </div>
    )
}

export default SAMModelMapEditor