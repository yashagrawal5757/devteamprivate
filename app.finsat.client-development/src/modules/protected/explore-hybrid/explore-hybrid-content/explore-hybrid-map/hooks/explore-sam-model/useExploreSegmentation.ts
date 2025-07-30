import { Tensor } from "onnxruntime-web";
import { ExploreSegmentationClicksType } from "../../state/explore-segmentation/ExploreSegmentationDefaults";
import { ExploreSegmentationActions } from "../../state/explore-segmentation/ExploreSegmentationActions";
import useExploreSegmenationContext from "../../contexts/explore-sam-model/explore-segmentation/useExploreSegmentationContext";

/**
 * Custom hook for managing segmentation state and actions within the ExploreSegmentation context.
 *
 * Provides access to the current segmentation state and dispatch functions for updating
 * clicks, images, mask images, and embeddings used in the segmentation workflow.
 *
 * @returns An object containing:
 * - `ExploreSegmentation`: The current state of the segmentation context.
 * - `setClicks`: Function to update the segmentation clicks.
 * - `setImage`: Function to set the main image for segmentation.
 * - `setMaskImage`: Function to set or clear the mask image.
 * - `setEmbedding`: Function to set or clear the embedding tensor.
 */
const useExploreSegmentation = () => {
    const ExploreSegmentationContext = useExploreSegmenationContext();

    const setClicks = (clicks: Array<ExploreSegmentationClicksType> | undefined) => {
        ExploreSegmentationContext.dispatch({ 
            type: ExploreSegmentationActions.SET_CLICKS, 
            payload: clicks 
        });
    }

    const setImage = (image: HTMLImageElement | undefined) => {
        ExploreSegmentationContext.dispatch({ 
            type: ExploreSegmentationActions.SET_IMAGE, 
            payload: image 
        });
    }

    const setMaskImage = (image: HTMLImageElement | undefined) => {
        ExploreSegmentationContext.dispatch({ 
            type: ExploreSegmentationActions.SET_MASK_IMAGE, 
            payload: image 
        });
    }

    const setEmbedding = (embedding: Tensor | undefined) => {
        ExploreSegmentationContext.dispatch({ 
            type: ExploreSegmentationActions.SET_EMBEDDING, 
            payload: embedding 
        });
    }

    return {
        exploreSegmentation: ExploreSegmentationContext.state,
        setClicks,
        setImage,
        setMaskImage,
        setEmbedding
    };
}

export default useExploreSegmentation;