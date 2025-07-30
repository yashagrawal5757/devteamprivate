import client from '@core/api/client';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import { AddToWatchlistType } from '@enums/AddToWatchlistType';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import { AxiosResponse } from 'axios';
import { LocationFrameType } from '../../state/location-frame/LocationFrameDefaults';

const useExploreWatchlistApi = () => {
    const axiosClient = useAxiosClient();
    const endpoint = apiEndpoints[ApiEndpoints.WATCHLISTS];

    const getWatchlists = (
        search: string | undefined
    ): Promise<AxiosResponse<Array<WatchlistResponse>>> => {
        let query = 'pageSize=300&';

        if (search !== undefined && search.length !== 0) {
            query += `searchText=${search}`;
        }

        const auth = axiosClient<Array<WatchlistResponse>>({
            apiConfig: {
                method: ApiMethod.GET,
                uri: `${endpoint}?${query}`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const addNewWatchlist = (
        name: string
    ): Promise<AxiosResponse<WatchlistResponse>> => {
        const auth = axiosClient<WatchlistResponse>({
            apiConfig: {
                method: ApiMethod.POST,
                uri: `${endpoint}`,
                data: { name }
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const addPropertyToWatchlist = (
        id: string,
        type: AddToWatchlistType,
        buildings: Array<AddBuildingToWatchlistType>
    ): Promise<AxiosResponse<void>> => {
        const auth = axiosClient<void>({
            apiConfig: {
                method: ApiMethod.PUT,
                uri: `${endpoint}/${id}`,
                data: { type, buildings }
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const addAllPropertiesToWatchlist = (
        id: string,
        type: AddToWatchlistType,
        boundingBox: LocationFrameType | undefined,
    ): Promise<AxiosResponse<void>> => {
        let data: any = {
            type,
            options: {
                type: []
            }
        };

        if (boundingBox !== undefined) {
            data.boundingBox = {
                northEast: boundingBox?.topLeft,
                northWest: boundingBox?.topRight,
                southEast: boundingBox?.bottomLeft,
                southWest: boundingBox?.bottomRight
            };
        }

        const auth = axiosClient<void>({
            apiConfig: {
                method: ApiMethod.PUT,
                uri: `${endpoint}/${id}/batch`,
                data
            },
            axiosClientConfig: client
        });

        return auth;
    };

    return {
        getWatchlists,
        addNewWatchlist,
        addPropertyToWatchlist,
        addAllPropertiesToWatchlist
    };
};

export type WatchlistResponse = {
    id: string;
    name: string;
};

export type AddBuildingToWatchlistType = {
    osmId: string;
    name: string;
    latitude: number;
    longitude: number;
};

export default useExploreWatchlistApi;
