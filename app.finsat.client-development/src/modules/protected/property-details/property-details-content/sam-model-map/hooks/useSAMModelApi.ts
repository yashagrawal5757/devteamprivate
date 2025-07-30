import { CartesianCoordinate } from "@hooks/useGeometry";
import axios, { AxiosResponse } from "axios";

const useSAMModelApi = () => {
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

export default useSAMModelApi;