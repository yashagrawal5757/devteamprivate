import useSegmenationContext from "../contexts/segmentation/useSegmentationContext";
import { SegmentationClicksType } from "../state/segmentation/SegmentationDefaults";
import { SegmentationActions } from "../state/segmentation/SegmentationActions";
import { Tensor } from "onnxruntime-web";

const useSegmentation = () => {
    const segmentationContext = useSegmenationContext();

    const setClicks = (clicks: Array<SegmentationClicksType> | undefined) => {
        segmentationContext.dispatch({ 
            type: SegmentationActions.SET_CLICKS, 
            payload: clicks 
        });
    }

    const setImage = (image: HTMLImageElement) => {
        segmentationContext.dispatch({ 
            type: SegmentationActions.SET_IMAGE, 
            payload: image 
        });
    }

    const setMaskImage = (image: HTMLImageElement | undefined) => {
        segmentationContext.dispatch({ 
            type: SegmentationActions.SET_MASK_IMAGE, 
            payload: image 
        });
    }

    const setEmbedding = (embedding: Tensor | undefined) => {
        segmentationContext.dispatch({ 
            type: SegmentationActions.SET_EMBEDDING, 
            payload: embedding 
        });
    }

    return {
        segmentation: segmentationContext.state,
        setClicks,
        setImage,
        setMaskImage,
        setEmbedding
    };
}

export default useSegmentation;