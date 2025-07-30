import axios, { AxiosResponse } from "axios";

/**
 * Custom hook providing API methods for interacting with the SAM (Segment Anything Model) backend.
 *
 * @returns An object containing the following functions:
 * - `extractFootprint`: Sends a POST request to extract the footprint from provided masks and bounding box data.
 *   @param params - An object containing:
 *     - `masks`: The mask data to process.
 *     - `footprint`: The geographic bounding box information.
 *     - `width`: The width of the image.
 *     - `height`: The height of the image.
 *   @returns A promise resolving to the Axios response.
 *
 * - `fetchEmbedding`: Sends a POST request to generate an embedding from a base64-encoded image.
 *   @param base64Image - The image encoded as a base64 string.
 *   @returns A promise resolving to the Axios response.
 *
 * - `fetchMagicRooftop`: Sends a POST request to generate a "magic rooftop" result from image and footprint data.
 *   @param imageAsBase64 - The image encoded as a base64 string.
 *   @param boundingBox - An object containing the northwest, northeast, southeast, and southwest coordinates.
 *   @param footprint - An array of coordinate pairs representing the footprint.
 *   @returns A promise resolving to an Axios response containing a `MagicRooftopResponse`.
 */
const useExploreSAMModelApi = () => {
    const url = process.env.REACT_APP_API_ML_ROUTE!;

    const extractFootprint = ({ masks, footprint, width, height }: { masks: any, footprint: any, width: number, height: number }) => {
        return axios
            .post(
                `${url}/extract_footprint`,
                JSON.stringify({ masks: masks, geo_bb: footprint, width: width, height: height }),
                { headers: { 'Content-Type': 'application/json' } }
            );
    }

    const fetchEmbedding = (base64Image: string) => {
        return axios
            .post(
                `${url}/generate_embedding`,
                JSON.stringify({ b64_image: base64Image }),
                { headers: { 'Content-Type': 'application/json' } }
            );
    }

    const fetchMagicRooftop = (
        imageAsBase64: string,
        boundingBox: {
            northwest: any;
            northeast: any;
            southeast: any;
            southwest: any;
        },
        footprint: Array<Array<[number, number]>>,
    ): Promise<AxiosResponse<MagicRooftopResponse>> => {
        return axios.post(
            `${url}/magic_rooftop`,{
                imageAsBase64,
                boundingBox,
                footprint
            },
        );
    }

    return { extractFootprint, fetchEmbedding, fetchMagicRooftop };
}

type MagicRooftopResponse = {
    footprint: Array<Array<[number, number]>>;
};

export default useExploreSAMModelApi;