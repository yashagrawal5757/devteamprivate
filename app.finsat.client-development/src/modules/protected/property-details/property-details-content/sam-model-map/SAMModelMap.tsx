import React, { useEffect } from 'react'
import useSAMModel from './hooks/useSAMModel'
import useSegmentation from './hooks/useSegmentation';
import SAMModelMapEditor from './sam-model-map-editor/SAMModelMapEditor';
import { CartesianCoordinate } from '@hooks/useGeometry';
import usePropertyEditorManager from '../../hooks/property-editor-manager/usePropertyEditorManager';

type SAMModelMapProps = {
	dimensions: { width: number, height: number };
}

const SamModelMap = ({ dimensions }: SAMModelMapProps) => {
	const { segmentation } = useSegmentation();
	const { isLoadingEmbedding, initializeModel, loadImage, runONNIX } = useSAMModel();
	const { base64Image: imagePath, boundingBox: imageBoundingBox } = usePropertyEditorManager();

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
		/>
	)
}

export default SamModelMap