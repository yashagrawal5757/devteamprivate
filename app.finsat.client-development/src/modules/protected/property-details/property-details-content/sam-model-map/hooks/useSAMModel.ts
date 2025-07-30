import { useState } from "react";
import { InferenceSession, Tensor } from "onnxruntime-web";
import * as ort from "onnxruntime-web";
import useSegmentation from "./useSegmentation";
import { SegmentationClicksType } from "../state/segmentation/SegmentationDefaults";
import useSAMModelApi from "./useSAMModelApi";
import { simplify } from "@services/simplify";
import useProperty from "modules/protected/property-details/hooks/property/useProperty";
import usePropertyFootprint from "modules/protected/property-details/hooks/property-footprint/usePropertyFootprint";
import useInitialFootprint from "modules/protected/property-details/hooks/initial-footprint/useInitialFootprint";
import usePropertyEditor from "modules/protected/property-details/hooks/property-editor/usePropertyEditor";
import { PropertyEditorMode } from "modules/protected/property-details/state/property-editor/PropertyEditorDefaults";
import { CartesianCoordinate } from "modules/protected/explore-hybrid/state/location-frame/LocationFrameDefaults";
const { isoContours }: any = require("marchingsquares");

type ModelScaleType = {
    samScale: number;
    height: number;
    width: number;
}

type ModelDataType = {
    clicks?: Array<SegmentationClicksType>;
    tensor: Tensor;
    modelScale: ModelScaleType;
}

type Point = {
    x: number;
    y: number;
}

type Ring = [number, number][];

const MODEL_DIR = "/sam_onnx_example.onnx";

const useSAMModel = () => {
    const [model, setModel] = useState<InferenceSession | undefined>(undefined);
    const [modelScale, setModelScale] = useState<ModelScaleType | null>(null);

    const [isLoadingEmbedding, setIsLoadingEmbedding] = useState<boolean>(false);

    const { segmentation, setImage, setMaskImage, setEmbedding } = useSegmentation();
    const samModelApi = useSAMModelApi();
    const { property } = useProperty();
    const { initialFootprint } = useInitialFootprint();
    const { setFootprint } = usePropertyFootprint();
    const { setEditorMode } = usePropertyEditor();

    const initializeModel = async (): Promise<void> => {
        setIsLoadingEmbedding(true);
        try {
            const url = MODEL_DIR;
            const interfaceModel = await InferenceSession.create(url);

            setModel(interfaceModel);
        } catch (error) {
            console.error(error)
        }
    }

    const loadImage = async (
        url: string,
        imageBoundingBox: { northwest: CartesianCoordinate, northeast: CartesianCoordinate, southeast: CartesianCoordinate, southwest: CartesianCoordinate } | undefined
    ): Promise<void> => {
        try {
            const image = new Image();
            image.crossOrigin = "anonymous";
            image.src = url;

            image.onload = async () => {
                const { height, width, samScale } = handleImageScale(image);

                setModelScale({ height, width, samScale });

                image.width = width;
                image.height = height;

                setImage(image);
                Promise.all([getAutomaticFootprint(image.src, imageBoundingBox), getEmbedding(url)])
                    .then(() => {
                        // TODO
                        // Call set is initial to false
                        // make the default SAM model
                        setIsLoadingEmbedding(false);
                    })
                    .catch((error) => {
                        console.error('An error occured during fetching: ', error);
                        setIsLoadingEmbedding(false);
                    });
                // getEmbedding(url).then(() => {
                //     setIsLoadingEmbedding(false);
                // });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getAutomaticFootprint = async (base64Image: string, imageBoundingBox: { northwest: CartesianCoordinate, northeast: CartesianCoordinate, southeast: CartesianCoordinate, southwest: CartesianCoordinate } | undefined): Promise<void> => {
        if (segmentation.embedding !== undefined) {
            return;
        }

        if (property === undefined) {
            console.log('property is undefined');
            return;
        }

        if (imageBoundingBox === undefined) {
            console.error('Bounding box is undefined');
            return;
        }

        const base64 = base64Image.split(',')[1];
        const response = await samModelApi.fetchMagicRooftop(base64, imageBoundingBox, [initialFootprint.footprint]);

        if (response.data === null) {
            return;
        }

        const data = response.data;

        if (!data.footprint || !Array.isArray(data.footprint) || data.footprint.length === 0) {
            console.error('No footprint data found in response');
            return;
        }

        const mergedFootprint = data.footprint.flat();
        setFootprint(mergedFootprint);

        setEditorMode(PropertyEditorMode.OBSTICLE);
    }

    const getEmbedding = async (base64Image: string): Promise<void> => {
        try {
            if (segmentation.embedding !== undefined) {
                return;
            }

            const response = await samModelApi.fetchEmbedding(base64Image);

            if (response.data === null) {
                return;
            }

            const data = response.data;

            const shape = data.shape;
            const embedding = data.embedding;

            const flatEmbedding = new Float32Array(embedding.flat(Infinity));

            setEmbedding(new ort.Tensor("float32", flatEmbedding, shape));
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleImageScale = (image: HTMLImageElement): ModelScaleType => {
        const LONG_SIDE_LENGTH = 1024;

        const { naturalWidth: width, naturalHeight: height } = image;
        const samScale = LONG_SIDE_LENGTH / Math.max(width, height);

        return {
            samScale,
            height,
            width
        }
    }

    const runONNIX = async () => {
        try {
            if (
                model === undefined ||
                segmentation.clicks === undefined ||
                segmentation.embedding === undefined ||
                modelScale === undefined
            ) {
                return;
            }

            const feeds = modelData({
                clicks: segmentation.clicks,
                tensor: segmentation.embedding as Tensor,
                modelScale: modelScale as ModelScaleType
            });

            if (feeds === undefined) {
                return;
            }

            const results = await model.run(feeds);

            const output = results[model.outputNames[0]];

            setMaskImage(onnxMaskToImage(output.data, output.dims[2], output.dims[3]));
        } catch (error) {
            console.error(error);
        }
    }

    const modelData = ({ clicks, tensor, modelScale }: ModelDataType) => {
        const imageEmbedding = tensor;

        let pointCoords;
        let pointLabels;
        let pointCoordsTensor;
        let pointLabelsTensor;

        if (clicks !== undefined) {
            let n = clicks.length;

            pointCoords = new Float32Array(2 * (n + 1));
            pointLabels = new Float32Array(n + 1);

            for (let i = 0; i < n; i++) {
                pointCoords[2 * i] = clicks[i].x * modelScale.samScale;
                pointCoords[2 * i + 1] = clicks[i].y * modelScale.samScale;
                pointLabels[i] = clicks[i].clickType;
            }

            pointCoords[2 * n] = 0.0;
            pointCoords[2 * n + 1] = 0.0;
            pointLabels[n] = -1.0;

            pointCoordsTensor = new Tensor("float32", pointCoords, [1, n + 1, 2]);
            pointLabelsTensor = new Tensor("float32", pointLabels, [1, n + 1]);
        }

        const imageSizeTensor = new Tensor("float32", [
            modelScale.height,
            modelScale.width,
        ]);

        if (pointCoordsTensor === undefined || pointLabelsTensor === undefined) {
            return;
        }

        const maskInput = new Tensor(
            "float32",
            new Float32Array(256 * 256),
            [1, 1, 256, 256]
        );

        const hasMaskInput = new Tensor("float32", [0]);

        return {
            image_embeddings: imageEmbedding,
            point_coords: pointCoordsTensor,
            point_labels: pointLabelsTensor,
            orig_im_size: imageSizeTensor,
            mask_input: maskInput,
            has_mask_input: hasMaskInput,
        };
    }

    const arrayToImageData = (input: any, width: number, height: number) => {
        const [r, g, b, a] = [0, 114, 189, 255];
        const arr = new Uint8ClampedArray(4 * width * height).fill(0);

        for (let i = 0; i < input.length; i++) {
            if (input[i] > 0.0) {
                arr[4 * i + 0] = r;
                arr[4 * i + 1] = g;
                arr[4 * i + 2] = b;
                arr[4 * i + 3] = a;
            }
        }

        return new ImageData(arr, height, width);
    }

    const imageDataToCanvas = (imageData: ImageData): HTMLCanvasElement => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = imageData.width;
        canvas.height = imageData.height;

        ctx?.putImageData(imageData, 0, 0);

        return canvas;
    }

    const imageDataToImage = (imageData: ImageData): HTMLImageElement => {
        const canvas = imageDataToCanvas(imageData);

        const image = new Image();
        image.src = canvas.toDataURL();

        return image;
    }

    const onnxMaskToImage = (input: any, width: number, height: number) => {
        return imageDataToImage(arrayToImageData(input, width, height));
    }

    const maskToPolygon = async (mask: HTMLImageElement, maxVertecies: number = 50): Promise<number[][]> => {
        const naturalWidth = mask.naturalWidth || mask.width;
        const naturalHeight = mask.naturalHeight || mask.height;

        if (naturalWidth === undefined || naturalHeight === undefined) {
            return Promise.resolve([]);
        }

        const canvas = document.createElement("canvas");
        canvas.width = naturalWidth;
        canvas.height = naturalHeight;

        const ctx = canvas.getContext("2d");

        if (ctx === null) {
            return Promise.resolve([]);
        }

        ctx.imageSmoothingEnabled = false;
        await mask.decode?.();

        ctx.drawImage(mask, 0, 0, naturalWidth, naturalHeight);

        const data = ctx.getImageData(0, 0, naturalWidth, naturalHeight).data;
        const grid: number[][] = [];

        for (let y = 0; y < naturalHeight; y++) {
            const row: number[] = [];

            for (let x = 0; x < naturalWidth; x++) {
                row.push(data[(y * naturalWidth + x) * 4 + 3] > 127 ? 1 : 0);
            }

            grid.push(row);
        }

        removeSmallRegions(grid, 20);

        const contours: Ring[] = isoContours(grid, 0.5);

        if (!contours.length) {
            return Promise.resolve([]);
        }

        const interior = contours.filter((ring: Ring) => ring.every(([x, y]) => x > 0 && x < naturalWidth - 1 && y > 0 && y < naturalHeight - 1));

        const candidates = interior.length ? interior : contours;

        const minArea = 10;
        const filtered = candidates.filter(r => getPolygonArea(r) >= minArea);
        const use = filtered.length ? filtered[0] : candidates[0];

        let points: Point[] = use.map(([x, y]) => ({ x, y }));

        const rawNumbers = points.length;
        const k = 0.98;
        const target = Math.max(4, Math.min(maxVertecies, Math.round(Math.sqrt(rawNumbers) * k)));

        let eps = 0.5;

        while (points.length > target) {
            points = simplify(points, eps, true) as Point[];
            eps += 0.5;
        }

        const fx = mask.width / naturalWidth;
        const fy = mask.height / naturalHeight;

        const ring = points.map(({ x, y }) => [x * fx, y * fy]);

        if (ring.length > 0) {
            const [x0, y0] = ring[0];
            const [xn, yn] = ring[ring.length - 1];

            if (x0 !== xn || y0 !== yn) {
                ring.push([x0, y0]);
            }
        }

        return Promise.resolve(ring);
    }

    const removeSmallRegions = (grid: number[][], minimumSize: number) => {
        const height = grid.length;
        const width = grid[0].length;

        const visited = Array.from({ length: height }, () => Array(width).fill(false));
        const stack: [number, number][] = [];
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (grid[y][x] !== 1 || visited[y][x]) {
                    continue;
                }

                stack.push([x, y]);
                visited[y][x] = true;

                const cells: [number, number][] = [];

                while (stack.length) {
                    const [cx, cy] = stack.pop()!;

                    cells.push([cx, cy]);

                    for (const [dx, dy] of directions) {
                        const nx = cx + dx;
                        const ny = cy + dy;

                        if (nx >= 0 && nx < width && ny >= 0 && ny < height && grid[ny][nx] === 1 && !visited[ny][nx]) {
                            visited[ny][nx] = true;
                            stack.push([nx, ny]);
                        }
                    }
                }

                if (cells.length < minimumSize) {
                    for (const [cx, cy] of cells) {
                        grid[cy][cx] = 0;
                    }
                }
            }
        }
    }

    const getPolygonArea = (ring: Ring): number => {
        let area = 0;

        for (let i = 0; i < ring.length; i++) {
            const [x1, y1] = ring[i];
            const [x2, y2] = ring[(i + 1) % ring.length];

            area += x1 * y2 - x2 * y1;
        }

        return Math.abs(area / 2);
    }

    const pixelToGeometry = (x: number, y: number, width: number, height: number, boundingBox: { northeast: CartesianCoordinate, northwest: CartesianCoordinate, southeast: CartesianCoordinate, southwest: CartesianCoordinate }): [number, number] => {
        const xRatio = x / width;
        const yRatio = y / height;

        const lat = boundingBox.northwest.latitude * (1 - xRatio) * (1 - yRatio) +
            boundingBox.northeast.latitude * xRatio * (1 - yRatio) +
            boundingBox.southwest.latitude * (1 - xRatio) * yRatio +
            boundingBox.southeast.latitude * xRatio * yRatio;

        const lon = boundingBox.northwest.longitude * (1 - xRatio) * (1 - yRatio) +
            boundingBox.northeast.longitude * xRatio * (1 - yRatio) +
            boundingBox.southwest.longitude * (1 - xRatio) * yRatio +
            boundingBox.southeast.longitude * xRatio * yRatio;

        return [lat, lon];
    }

    const geometryToPixel = (lat: number, lon: number, width: number, height: number, boundingBox: { northeast: CartesianCoordinate, northwest: CartesianCoordinate, southeast: CartesianCoordinate, southwest: CartesianCoordinate }): [number, number] => {
        const latRange = boundingBox.northeast.latitude - boundingBox.southwest.latitude;
        const lonRange = boundingBox.southeast.longitude - boundingBox.southwest.longitude;

        // Calculate the x and y ratios based on the latitude and longitude
        const xRatio = (lon - boundingBox.southwest.longitude) / lonRange;
        const yRatio = (lat - boundingBox.southwest.latitude) / latRange;

        // Calculate the pixel position based on the ratio and image dimensions
        const x = xRatio * width;
        const y = (1 - yRatio) * height; // Invert y to align with image coordinates

        return [x, y];
    }

    return {
        model,
        modelScale,
        isLoadingEmbedding,
        setIsLoadingEmbedding,
        setModel,
        initializeModel,
        loadImage,
        getEmbedding,
        runONNIX,
        maskToPolygon,
        pixelToGeometry,
        geometryToPixel
    }
}

export default useSAMModel;