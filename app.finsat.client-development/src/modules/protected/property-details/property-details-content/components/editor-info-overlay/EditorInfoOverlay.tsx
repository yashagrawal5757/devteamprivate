import usePropertyEditor from 'modules/protected/property-details/hooks/property-editor/usePropertyEditor'
import { PolygonAlignmentMode, PolygonOperationMode, PropertyEditorDetectionMode, PropertyEditorMode, PropertyEditorModelMode, PropertyMapMode } from 'modules/protected/property-details/state/property-editor/PropertyEditorDefaults';
import React from 'react'

const EditorInfoOverlay = () => {
    const { propertyEditor } = usePropertyEditor();

    return (
        <div
            style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: propertyEditor.propertyEditorModelMode === PropertyEditorModelMode.MANUAL ? 50 : 100,
                backgroundColor: '#36EBC4',
                color: '#000',
                borderRadius: '15px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
            }}
        >
            {
                propertyEditor.isInitial ? (
                    <span className='text-xs px-4 py-2'>Click on the pin to begin rooftop analysis</span>
                ) : (
                    <>
                        {
                            propertyEditor.propertyMapMode === PropertyMapMode.EDITOR &&
                            propertyEditor.propertyEditorModelMode === PropertyEditorModelMode.MANUAL &&
                            propertyEditor.propertyEditorMode === PropertyEditorMode.SHAPE &&
                            propertyEditor.polygonOperationMode === PolygonOperationMode.EDIT &&
                            propertyEditor.polygonAlignmentMode === PolygonAlignmentMode.MOVE &&
                            (
                                <span className='text-xs px-4 py-2'>Click on the point and move your mouse to new desired location. Click again to lock in the new location</span>
                            )
                        }
                        {
                            propertyEditor.propertyMapMode === PropertyMapMode.EDITOR &&
                            propertyEditor.propertyEditorModelMode === PropertyEditorModelMode.MANUAL &&
                            propertyEditor.propertyEditorMode === PropertyEditorMode.SHAPE &&
                            propertyEditor.polygonOperationMode === PolygonOperationMode.EDIT &&
                            propertyEditor.polygonAlignmentMode === PolygonAlignmentMode.ADD_POINT &&
                            (
                                <span className='text-xs px-4 py-2'>Click on the edge of the footprint to add a point</span>
                            )
                        }
                        {
                            propertyEditor.propertyMapMode === PropertyMapMode.EDITOR &&
                            propertyEditor.propertyEditorModelMode === PropertyEditorModelMode.MANUAL &&
                            propertyEditor.propertyEditorMode === PropertyEditorMode.SHAPE &&
                            propertyEditor.polygonOperationMode === PolygonOperationMode.ADD_POLYGON &&
                            (
                                <span className='text-xs px-4 py-2'>Click on the roof to add a footprint</span>
                            )
                        }
                        {
                            propertyEditor.propertyMapMode === PropertyMapMode.EDITOR &&
                            propertyEditor.propertyEditorModelMode === PropertyEditorModelMode.MANUAL &&
                            propertyEditor.propertyEditorMode === PropertyEditorMode.SHAPE &&
                            propertyEditor.polygonOperationMode === PolygonOperationMode.REMOVE_POLYGON &&
                            (
                                <span className='text-xs px-4 py-2'>Click on the footprint you'd like to remove</span>
                            )
                        }
                        {
                            propertyEditor.propertyMapMode === PropertyMapMode.EDITOR &&
                            propertyEditor.propertyEditorModelMode === PropertyEditorModelMode.SAM &&
                            propertyEditor.detectionMode === PropertyEditorDetectionMode.HOVER &&
                            (
                                <span className='text-xs px-4 py-2'>Hover over the roof to get automatic detection using AI</span>
                            )
                        }
                        {
                            propertyEditor.propertyMapMode === PropertyMapMode.EDITOR &&
                            propertyEditor.propertyEditorModelMode === PropertyEditorModelMode.SAM &&
                            propertyEditor.detectionMode === PropertyEditorDetectionMode.BOX &&
                            (
                                <span className='text-xs px-4 py-2'>Click and draw a box around the roof to get automatic detection using AI</span>
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default EditorInfoOverlay