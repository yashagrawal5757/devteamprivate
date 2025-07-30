import { AuthenicatedUserType } from '../../../../state/session-data/SessionDataDefaults';
import { AxiosResponse } from 'axios';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import client from '@core/api/client';

const useLoginApi = () => {
    const axiosClient = useAxiosClient();
    const endpoint = apiEndpoints[ApiEndpoints.LOGIN];

    const authenticate = (
        email: string,
        password: string
    ): Promise<AxiosResponse<AuthenticationResponse>> => {
        const auth = axiosClient<AuthenticationResponse>({
            apiConfig: {
                method: ApiMethod.POST,
                uri: `${endpoint}`,
                data: { email, password }
            },
            axiosClientConfig: client
        });

        return auth;
    };

    return { authenticate };
};

export type AuthenticationResponse = {
    token: string;
    user: AuthenicatedUserType;
};

export default useLoginApi;
