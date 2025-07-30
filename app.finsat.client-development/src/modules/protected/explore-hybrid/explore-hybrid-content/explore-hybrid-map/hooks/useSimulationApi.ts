import { AxiosResponse } from 'axios';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import client from '@core/api/client';
import { SimulationData } from '../state/simulation-data/SimulationDataDefaults';
import { CartesianCoordinate } from '@hooks/useGeometry';

const useSimulationApi = () => {
    const axiosClient = useAxiosClient();
    const endpoint = apiEndpoints[ApiEndpoints.SIMULATION];

    const getSimulationKeysForLocation = (
        northEast: CartesianCoordinate,
        northWest: CartesianCoordinate,
        southEast: CartesianCoordinate,
        southWest: CartesianCoordinate
    ): Promise<AxiosResponse<Array<SimulationData>>> => {
        const auth = axiosClient<Array<SimulationData>>({
            apiConfig: {
                method: ApiMethod.GET,
                uri: `${endpoint}?NorthEast.latitude=${northEast.latitude}&NorthEast.longitude=${northEast.longitude}&NorthWest.latitude=${northWest.latitude}&NorthWest.longitude=${northWest.longitude}&SouthEast.latitude=${southEast.latitude}&SouthEast.longitude=${southEast.longitude}&SouthWest.latitude=${southWest.latitude}&SouthWest.longitude=${southWest.longitude}`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    return { getSimulationKeysForLocation };
};

export default useSimulationApi;
