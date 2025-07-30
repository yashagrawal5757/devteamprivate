import { useEffect } from "react";
import useExploreSAMModel from "@explore/explore-hybrid-content/explore-hybrid-map/hooks/explore-sam-model/useExploreSAMModel";
import useExploreSegmentation from "@explore/explore-hybrid-content/explore-hybrid-map/hooks/explore-sam-model/useExploreSegmentation";
import usePropertyMapTools from "@explore/explore-hybrid-content/explore-hybrid-map/hooks/usePropertyMapTools";
import ExploreSAMModelMapEditor from "../explore-sam-model/ExploreSAMModelEditor";

interface MapPropertyFrameProps {
    frameDimensions: {
        height: number;
        width: number;
    },
    onClose?: () => void;
}

const MapPropertyFrame = ({ frameDimensions, onClose }: MapPropertyFrameProps) => {
    const { exploreSegmentation } = useExploreSegmentation();
    const { isEmbeddingLoading, initializeModel, loadImage, runONNIX } = useExploreSAMModel();
    const { base64Image } = usePropertyMapTools();

    useEffect(() => {
        if (!base64Image) return;

        initializeModel().then(() => {
            loadImage(base64Image);
        });
    }, [base64Image]);

    useEffect(() => {
        if (!exploreSegmentation) return;
        runONNIX();
    }, [exploreSegmentation.clicks]);

    return (
        <>
            {isEmbeddingLoading ? (
                <div className="absolute inset-0 bg-black bg-opacity-50 h-full w-full z-10">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <p className="text-white text-lg font-semibold">
                            <img src="/ai-processing.svg" alt="Processing AI" />

                        </p>
                    </div>
                </div>
            ) : (
                <div className="absolute inset-0 bg-black bg-opacity-50 h-full w-full z-10">
                    <ExploreSAMModelMapEditor isLoadingState={isEmbeddingLoading} dimensions={frameDimensions} onCloseEditorClick={onClose} />
                </div>
            )}
        </>
    );
};

export default MapPropertyFrame;