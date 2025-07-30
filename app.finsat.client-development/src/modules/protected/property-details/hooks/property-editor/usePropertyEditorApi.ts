import { PropertyFootprint } from '../../state/property-footprint/PropertyFootprintDefaults';
import axios, { AxiosResponse } from 'axios';
const usePropertyEditorApi = () => {
    const calculateAvailableSpace = (
        footprint: PropertyFootprint
    ): Promise<AxiosResponse<CalculateAvailableSpaceResponse>> => {
        const url = process.env.REACT_APP_API_ML_ROUTE!;

        return axios.post(
            `${url}/available_space`,
            {
                footprint: {
                    shapes: footprint.shapes.map(shape => shape.data)
                },
                obstacles: footprint.obsticles.map(obsticle => obsticle.data)
            },
            {
                timeout: 60000
            }
        );
    };

    const detectObsticles = (
        imageAsBase64: string,
        footprint: Array<Array<[number, number]>>,
        boundingBox: any
    ) => {
        const url = process.env.REACT_APP_API_ML_ROUTE!;

        return axios.post(
            `${url}/detect_obstructions`,
            {
                imageAsBase64,
                footprint,
                boundingBox
            },
            {
                timeout: 60000
            }
        );
    };

    return { calculateAvailableSpace, detectObsticles };
};

type CalculateAvailableSpaceResponse = {
    availableSpace: number;
};

export default usePropertyEditorApi;
