import { AxiosResponse } from 'axios';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import client from '@core/api/client';

const useForgotPasswordEmailApi = () => {
    const axiosClient = useAxiosClient();
    const endpoint = apiEndpoints[ApiEndpoints.FORGOT_PASSWORD];

    const forgotPassword = (email: string): Promise<AxiosResponse<void>> => {
        const auth = axiosClient<void>({
            apiConfig: {
                method: ApiMethod.POST,
                uri: `${endpoint}`,
                data: { email }
            },
            axiosClientConfig: client
        });

        return auth;
    };

    return { forgotPassword };
};

export default useForgotPasswordEmailApi;
