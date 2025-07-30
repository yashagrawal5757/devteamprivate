import { AxiosInstance, AxiosResponse } from 'axios';

export enum ApiMethod {
    GET = 0,
    POST,
    PUT,
    DELETE
}

type ApiConfig = {
    method: ApiMethod;
    uri: string;
    data: any;
};

type AxiosRequestType = {
    apiConfig: ApiConfig;
    axiosClientConfig: AxiosInstance;
};

const useAxiosClient = () => {
    return <ResponseType>({
        apiConfig,
        axiosClientConfig
    }: AxiosRequestType): Promise<AxiosResponse<ResponseType>> => {
        const { method, uri, data } = apiConfig;

        switch (method) {
            case ApiMethod.GET:
                return axiosClientConfig.get<ResponseType>(uri);
            case ApiMethod.POST:
                return axiosClientConfig.post<ResponseType>(uri, data);
            case ApiMethod.PUT:
                return axiosClientConfig.put<ResponseType>(uri, data);
            case ApiMethod.DELETE:
                return axiosClientConfig.delete<ResponseType>(uri);
            default:
                throw new Error(`Unsupported method: ${method}`);
        }
    };
};

export default useAxiosClient;
