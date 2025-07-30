import { Tensor } from "onnxruntime-web";

export type SegmentationClicksType = {
    x: number,
    y: number,
    clickType: number;
}

export type SegmentationType = {
    clicks: SegmentationClicksType[] | undefined;
    image: HTMLImageElement | undefined;
    maskImage: HTMLImageElement | undefined;
    embedding: Tensor | undefined;
}

const SegmentationDefaults: SegmentationType = {
    clicks: [],
    image: undefined,
    maskImage: undefined,
    embedding: undefined
}

export default SegmentationDefaults;