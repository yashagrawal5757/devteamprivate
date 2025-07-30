import { AxiosResponse } from 'axios';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import client from '@core/api/client';
import { SectorType } from '@enums/SectorType';
import { PrimaryInterestType } from '@enums/PrimaryInterestType';
import { RegisterSurvey } from 'modules/public/register/components/register-form/RegisterForm';

const useWaitlistUsersApi = () => {
    const axiosClient = useAxiosClient();
    const endpoint = apiEndpoints[ApiEndpoints.WAITLIST];

    const getUsers = (): Promise<AxiosResponse<WaitlistUsersResponse>> => {
        const auth = axiosClient<WaitlistUsersResponse>({
            apiConfig: {
                method: ApiMethod.GET,
                uri: `${endpoint}`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const approveUser = (
        id: number
    ): Promise<AxiosResponse<WaitlistUsersResponse>> => {
        const auth = axiosClient<WaitlistUsersResponse>({
            apiConfig: {
                method: ApiMethod.PUT,
                uri: `${endpoint}/${id}/approve`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const denyUser = (
        id: number
    ): Promise<AxiosResponse<WaitlistUsersResponse>> => {
        const auth = axiosClient<WaitlistUsersResponse>({
            apiConfig: {
                method: ApiMethod.PUT,
                uri: `${endpoint}/${id}/deny`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    return { getUsers, approveUser, denyUser };
};

export type WaitlistUsersResponse = {
    id: number;
    name: string;
    email: string;
    company: string;
    sector: SectorType;
    interest: PrimaryInterestType;
    surveys: Array<RegisterSurvey>;
};

export default useWaitlistUsersApi;
