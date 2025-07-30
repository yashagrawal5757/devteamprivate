import { AxiosResponse } from 'axios';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import client from '@core/api/client';

const useResetPasswordApi = () => {
    const axiosClient = useAxiosClient();
    const endpointReset = apiEndpoints[ApiEndpoints.FORGOT_PASSWORD_RESET];
    const endpointVerify = apiEndpoints[ApiEndpoints.FORGOT_PASSWORD_VERIFY];

    const resetPassword = (
        newPassword: string,
        token: string
    ): Promise<AxiosResponse<void>> => {
        const auth = axiosClient<void>({
            apiConfig: {
                method: ApiMethod.POST,
                uri: `${endpointReset}`,
                data: { newPassword, token }
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const verifyToken = (token: string): Promise<AxiosResponse<void>> => {
        const auth = axiosClient<void>({
            apiConfig: {
                method: ApiMethod.POST,
                uri: `${endpointVerify}`,
                data: { token }
            },
            axiosClientConfig: client
        });

        return auth;
    };

    return { resetPassword, verifyToken };
};

export default useResetPasswordApi;
