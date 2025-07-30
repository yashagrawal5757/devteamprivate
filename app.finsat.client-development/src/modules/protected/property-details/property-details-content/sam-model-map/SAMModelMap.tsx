import React, { useEffect } from 'react';
import useSAMModel from './hooks/useSAMModel';
import useSegmentation from './hooks/useSegmentation';
import SAMModelMapEditor from './sam-model-map-editor/SAMModelMapEditor';
import { CartesianCoordinate } from '@hooks/useGeometry';
import usePropertyEditorManager from '../../hooks/property-editor-manager/usePropertyEditorManager';
import { CesiumComponentRef } from 'resium';
import { Viewer as CesiumViewer } from 'cesium';

type SAMModelMapProps = {
    dimensions: { width: number; height: number };
    viewerRef: React.RefObject<CesiumComponentRef<CesiumViewer> | null>;
};

const SamModelMap = ({ dimensions, viewerRef }: SAMModelMapProps) => {
    const { segmentation } = useSegmentation();
    const { isLoadingEmbedding, initializeModel, loadImage, runONNIX } =
        useSAMModel();
    const { base64Image: imagePath, boundingBox: imageBoundingBox } =
        usePropertyEditorManager();

    useEffect(() => {
        initializeModel().then(() => {
            loadImage(imagePath, imageBoundingBox);
        });
    }, []);

    useEffect(() => {
        runONNIX();
    }, [segmentation.clicks]);

    return (
        <SAMModelMapEditor
            isLoadingState={isLoadingEmbedding}
            dimensions={dimensions}
            viewerRef={viewerRef}
        />
    );
};

export default SamModelMap;
