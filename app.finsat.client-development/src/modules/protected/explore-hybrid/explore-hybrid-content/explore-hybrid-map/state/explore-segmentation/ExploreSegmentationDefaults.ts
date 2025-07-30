import { Tensor } from "onnxruntime-web";

export type ExploreSegmentationClicksType = {
    x: number,
    y: number,
    clickType: number;
}

export type ExploreSegmentationType = {
    clicks: ExploreSegmentationClicksType[] | undefined;
    image: HTMLImageElement | undefined;
    maskImage: HTMLImageElement | undefined;
    embedding: Tensor | undefined;
}

const ExploreSegmentationDefaults: ExploreSegmentationType = {
    clicks: [],
    image: undefined,
    maskImage: undefined,
    embedding: undefined
}

export default ExploreSegmentationDefaults;