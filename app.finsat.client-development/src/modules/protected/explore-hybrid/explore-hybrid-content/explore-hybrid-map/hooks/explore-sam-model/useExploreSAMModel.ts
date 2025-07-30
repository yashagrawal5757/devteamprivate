
import { InferenceSession, Tensor } from "onnxruntime-web";
import { ExploreSegmentationClicksType } from "../../state/explore-segmentation/ExploreSegmentationDefaults";
import { useState } from "react";
import useExploreSegmentation from "./useExploreSegmentation";
import useExploreSAMModelApi from "./useExploreSamModelApi";
import { CartesianCoordinate } from "@hooks/useGeometry";
import * as ort from "onnxruntime-web";
import { simplify } from "@services/simplify";
const { isoContours }: any = require("marchingsquares");

type ModelScaleType = {
    samScale: number;
    height: number;
    width: number;
}

type ModelDataType = {
    clicks?: Array<ExploreSegmentationClicksType>;
    tensor: Tensor;
    modelScale: ModelScaleType;
}

type Point = {
    x: number;
    y: number;
}

type Ring = [number, number][];

const MODEL_DIR = "/sam_onnx_example.onnx";
/**
 * Custom React hook for working with the Segment Anything Model (SAM) using ONNX in a map explore.
 * 
 * This hook provides functionality to:
 * - Initialize and load the ONNX exploreSegmentation model.
 * - Load and scale images for exploreSegmentation.
 * - Fetch and set image embeddings from a base64-encoded image.
 * - Run exploreSegmentation inference using the ONNX model and user-provided clicks.
 * - Convert exploreSegmentation masks to polygon representations.
 * - Convert between pixel and geographic coordinates using a bounding box.
 * - Manage model state, scale, and loading status.
 * 
 * @returns {{
 *   model: InferenceSession | undefined;
 *   modelScale: ModelScaleType | null;
 *   isEmbeddingLoading: boolean;
 *   setIsEmbeddingLoading: React.Dispatch<React.SetStateAction<boolean>>;
 *   setModel: React.Dispatch<React.SetStateAction<InferenceSession | undefined>>;
 *   initializeModel: () => Promise<void>;
 *   loadImage: (url: string) => Promise<void>;
 *   getEmbedding: (base64Image: string) => Promise<void>;
 *   runONNIX: () => Promise<void>;
 *   maskToPolygon: (mask: HTMLImageElement, maxVertecies?: number) => Promise<number[][]>;
 *   pixelToGeometry: (
 *     x: number, y: number, width: number, height: number,
 *     boundingBox: { northeast: CartesianCoordinate, northwest: CartesianCoordinate, southeast: CartesianCoordinate, southwest: CartesianCoordinate }
 *   ) => [number, number];
 *   geometryToPixel: (
 *     lat: number, lon: number, width: number, height: number,
 *     boundingBox: { northeast: CartesianCoordinate, northwest: CartesianCoordinate, southeast: CartesianCoordinate, southwest: CartesianCoordinate }
 *   ) => [number, number];
 * }}
 * 
 * @example
 * const {
 *   initializeModel,
 *   loadImage,
 *   getEmbedding,
 *   runONNIX,
 *   maskToPolygon,
 *   pixelToGeometry,
 *   geometryToPixel
 * } = useExploreSAMModel();
 */
const useExploreSAMModel = () => {
    const [model, setModel] = useState<InferenceSession | undefined>(undefined);
    const [modelScale, setModelScale] = useState<ModelScaleType | null>(null);
    const [isEmbeddingLoading, setIsEmbeddingLoading] = useState<boolean>(false);
    const { exploreSegmentation, setImage, setMaskImage, setEmbedding } = useExploreSegmentation();
    const samModelApi = useExploreSAMModelApi();
    /**
     * Initializes the ONNX model for exploreSegmentation.
     * Loads the model from the specified MODEL_DIR and sets it in state.
     * @returns {Promise<void>}
     */
    const initializeModel = async (): Promise<void> => {
        setIsEmbeddingLoading(true);
        try {
            const url = MODEL_DIR;
            const interfaceModel = await InferenceSession.create(url);

            setModel(interfaceModel);
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Loads an image from a given URL, scales it, and sets it in state.
     * @param url - The URL of the image to load.
     * @returns {Promise<void>}
     */
    const loadImage = async (
        url: string
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
                Promise.resolve(getEmbedding(url))
                    .then(() => {
                        setIsEmbeddingLoading(false);
                    })
                    .catch((error) => {
                        console.error('An error occured during fetching: ', error);
                        setIsEmbeddingLoading(false);
                    });
            }
        } catch (error) {
            setIsEmbeddingLoading(false);
            console.error(error);
        }
    }

    /**
     * Fetches and sets the image embedding from a base64-encoded image.
     * Avoids fetching if embedding already exists.
     * @param base64Image - The base64-encoded image string.
     * @returns {Promise<void>}
     */
    const getEmbedding = async (
        base64Image: string
    ): Promise<void> => {
        try {
            if (exploreSegmentation.embedding !== undefined) {
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

    /**
     * Calculates the scaling factor and dimensions for the image to fit the model's requirements.
     * @param image - The HTMLImageElement to scale.
     * @returns {ModelScaleType} - The scale and dimensions.
     */
    const handleImageScale = (
        image: HTMLImageElement
    ): ModelScaleType => {
        const LONG_SIDE_LENGTH = 1024;
        const { naturalWidth: width, naturalHeight: height } = image;
        const samScale = LONG_SIDE_LENGTH / Math.max(width, height);

        return {
            samScale,
            height,
            width
        }
    }

    /**
     * Runs the ONNX model inference using the current exploreSegmentation state and embedding.
     * Sets the resulting mask image in state.
     * @returns {Promise<void>}
     */
    const runONNIX = async () => {
        try {
            if (
                model === undefined ||
                exploreSegmentation.clicks === undefined ||
                exploreSegmentation.embedding === undefined ||
                modelScale === undefined
            ) {
                return;
            }

            const feeds = modelData({
                clicks: exploreSegmentation.clicks,
                tensor: exploreSegmentation.embedding as Tensor,
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

    /**
     * Prepares the input data for the ONNX model inference.
     * Converts clicks and embedding into ONNX tensors.
     * @param param0 - Object containing clicks, tensor, and modelScale.
     * @returns {Record<string, Tensor> | undefined} - The feeds for ONNX model.
     */
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

    /**
     * Converts a mask array to ImageData, coloring mask pixels.
     * @param input - The mask array.
     * @param width - The width of the image.
     * @param height - The height of the image.
     * @returns {ImageData}
     */
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

    /**
     * Converts ImageData to an HTMLCanvasElement.
     * @param imageData - The ImageData to render.
     * @returns {HTMLCanvasElement}
     */
    const imageDataToCanvas = (imageData: ImageData): HTMLCanvasElement => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = imageData.width;
        canvas.height = imageData.height;

        ctx?.putImageData(imageData, 0, 0);

        return canvas;
    }

    /**
     * Converts ImageData to an HTMLImageElement.
     * @param imageData - The ImageData to convert.
     * @returns {HTMLImageElement}
     */
    const imageDataToImage = (imageData: ImageData): HTMLImageElement => {
        const canvas = imageDataToCanvas(imageData);

        const image = new Image();
        image.src = canvas.toDataURL();

        return image;
    }

    /**
     * Converts ONNX mask output to an HTMLImageElement.
     * @param input - The mask array.
     * @param width - The width of the mask.
     * @param height - The height of the mask.
     * @returns {HTMLImageElement}
     */
    const onnxMaskToImage = (input: any, width: number, height: number) => {
        return imageDataToImage(arrayToImageData(input, width, height));
    }

    /**
     * Converts a mask image to a polygon representation.
     * Simplifies the polygon to a maximum number of vertices.
     * @param mask - The mask image.
     * @param maxVertecies - Maximum number of vertices for the polygon.
     * @returns {Promise<number[][]>} - The polygon as an array of [x, y] coordinates.
     */
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

    /**
     * Removes small regions from a binary grid that are below a minimum size.
     * @param grid - The binary grid.
     * @param minimumSize - The minimum region size to keep.
     */
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

    /**
     * Calculates the area of a polygon ring.
     * @param ring - The polygon ring as an array of [x, y] coordinates.
     * @returns {number} - The area of the polygon.
     */
    const getPolygonArea = (ring: Ring): number => {
        let area = 0;

        for (let i = 0; i < ring.length; i++) {
            const [x1, y1] = ring[i];
            const [x2, y2] = ring[(i + 1) % ring.length];

            area += x1 * y2 - x2 * y1;
        }

        return Math.abs(area / 2);
    }

    /**
     * Converts pixel coordinates to geographic coordinates using a bounding box.
     * @param x - The x pixel coordinate.
     * @param y - The y pixel coordinate.
     * @param width - The image width.
     * @param height - The image height.
     * @param boundingBox - The bounding box with corner coordinates.
     * @returns {[number, number]} - The [latitude, longitude] pair.
     */
    const pixelToGeometry = (
        x: number, y: number, width: number, height: number,
        boundingBox: { northeast: CartesianCoordinate, northwest: CartesianCoordinate, southeast: CartesianCoordinate, southwest: CartesianCoordinate }
    ): [number, number] => {
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

    /**
     * Converts geographic coordinates to pixel coordinates using a bounding box.
     * @param lat - The latitude.
     * @param lon - The longitude.
     * @param width - The image width.
     * @param height - The image height.
     * @param boundingBox - The bounding box with corner coordinates.
     * @returns {[number, number]} - The [x, y] pixel coordinates.
     */
    const geometryToPixel = (
        lat: number, lon: number, width: number, height: number,
        boundingBox: { northeast: CartesianCoordinate, northwest: CartesianCoordinate, southeast: CartesianCoordinate, southwest: CartesianCoordinate }
    ): [number, number] => {
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
        isEmbeddingLoading,
        setIsEmbeddingLoading,
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

export default useExploreSAMModel;