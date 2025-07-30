import client from '@core/api/client';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import { PaginationType } from '@state/pagination/PaginationDefaults';
import { AxiosResponse } from 'axios';

const useWatchlistsApi = () => {
    const axiosClient = useAxiosClient();
    const endpoint = apiEndpoints[ApiEndpoints.WATCHLISTS];

    const getWatchlists = (
        search: string | undefined,
        pagination: PaginationType
    ): Promise<AxiosResponse<Array<WatchlistsResponse>>> => {
        let queries = [];

        if (search !== undefined && search.length !== 0) {
            queries.push(`searchText=${search}`);
        }

        queries.push(
            `pageNumber=${pagination.currentPage}&pageSize=${pagination.pageSize}`
        );

        const query = queries.join('&');

        const auth = axiosClient<Array<WatchlistsResponse>>({
            apiConfig: {
                method: ApiMethod.GET,
                uri: `${endpoint}?${query}`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const getWatchlistProperties = (
        watchlistId: string,
        search: string | undefined,
        pagination: PaginationType
    ): Promise<AxiosResponse<Array<WatchlistPropertyResponse>>> => {
        let queries: Array<string> = [];

        if (search !== undefined && search.length !== 0) {
            queries.push(`searchText=${search}`);
        }

        queries.push(
            `pageNumber=${pagination.currentPage}&pageSize=${pagination.pageSize}`
        );

        const query = queries.join('&');

        const auth = axiosClient<Array<WatchlistPropertyResponse>>({
            apiConfig: {
                method: ApiMethod.GET,
                uri: `${endpoint}/${watchlistId}/properties?${query}`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const addNewWatchlist = (
        name: string
    ): Promise<AxiosResponse<WatchlistsResponse>> => {
        const auth = axiosClient<WatchlistsResponse>({
            apiConfig: {
                method: ApiMethod.POST,
                uri: `${endpoint}`,
                data: { name }
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const deleteWatchlists = (
        watchlistIds: Array<string>
    ): Promise<AxiosResponse> => {
        var queries = [];

        for (let index = 0; index < watchlistIds.length; index++) {
            const watchlistId = watchlistIds[index];

            queries.push(`WatchlistIds[${index}]=${watchlistId}`);
        }

        const query = queries.join('&');

        const auth = axiosClient<Array<WatchlistPropertyResponse>>({
            apiConfig: {
                method: ApiMethod.DELETE,
                uri: `${endpoint}?${query}`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const batchDeleteWatchlists = (
        searchText: string
    ): Promise<AxiosResponse> => {
        var queries = [];

        if (searchText !== undefined && searchText.length !== 0) {
            queries.push(`searchText=${searchText}`);
        }

        const query = queries.join('&');

        const auth = axiosClient<Array<WatchlistPropertyResponse>>({
            apiConfig: {
                method: ApiMethod.DELETE,
                uri: `${endpoint}/batch?${query}`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const deleteWatchlistProperties = (
        watchlistId: string,
        variationIds: Array<string>
    ): Promise<AxiosResponse> => {
        var queries = [];

        for (let index = 0; index < variationIds.length; index++) {
            const variationId = variationIds[index];

            queries.push(`VariationIds[${index}]=${variationId}`);
        }

        const query = queries.join('&');

        const auth = axiosClient<Array<WatchlistPropertyResponse>>({
            apiConfig: {
                method: ApiMethod.DELETE,
                uri: `${endpoint}/${watchlistId}/properties?${query}`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const batchDeleteWatchlistProperties = (
        watchlistId: string,
        searchText: string
    ): Promise<AxiosResponse> => {
        var queries = [];

        if (searchText !== undefined && searchText.length !== 0) {
            queries.push(`searchText=${searchText}`);
        }

        const query = queries.join('&');

        const auth = axiosClient<Array<WatchlistPropertyResponse>>({
            apiConfig: {
                method: ApiMethod.DELETE,
                uri: `${endpoint}/${watchlistId}/properties/batch?${query}`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    return {
        getWatchlists,
        getWatchlistProperties,
        addNewWatchlist,
        deleteWatchlists,
        batchDeleteWatchlists,
        deleteWatchlistProperties,
        batchDeleteWatchlistProperties
    };
};

export type WatchlistsResponse = {
    id: string;
    name: string;
};

export type WatchlistPropertyResponse = {
    buildingId: string;
    buildingName: string;
    buildingType: string;
    schematics: WatchlistPropertySchematicsResponse;
    solarEstimation: WatchlistPropertySolarEstimationResponse;
    variationId: string;
};

type WatchlistPropertySchematicsResponse = {
    totalAvailableSpace: number;
};

type WatchlistPropertySolarEstimationResponse = {
    netEnergyProduction: number;
    netEnergyRevenue: number;
    internalRateOfReturn: number;
    netPresentValue: number;
    paybackPeriod: number;
};

export default useWatchlistsApi;
