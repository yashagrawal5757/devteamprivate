import client from '@core/api/client';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import { AddToWatchlistType } from '@enums/AddToWatchlistType';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import { AxiosResponse } from 'axios';

const usePropertyDetailsWatchlistApi = () => {
    const axiosClient = useAxiosClient();
    const endpoint = apiEndpoints[ApiEndpoints.WATCHLISTS];

    const getWatchlists = (
        search: string | undefined
    ): Promise<AxiosResponse<Array<WatchlistResponse>>> => {
        let query = '';

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
        buildingIds: Array<string>
    ): Promise<AxiosResponse<void>> => {
        const auth = axiosClient<void>({
            apiConfig: {
                method: ApiMethod.PUT,
                uri: `${endpoint}/${id}`,
                data: { type, buildingIds }
            },
            axiosClientConfig: client
        });

        return auth;
    };

    return {
        getWatchlists,
        addNewWatchlist,
        addPropertyToWatchlist
    };
};

export type WatchlistResponse = {
    id: string;
    name: string;
};

export default usePropertyDetailsWatchlistApi;
