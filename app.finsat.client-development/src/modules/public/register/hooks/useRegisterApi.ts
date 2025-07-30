import { AuthenicatedUserType } from '../../../../state/session-data/SessionDataDefaults';
import { AxiosResponse } from 'axios';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import client from '@core/api/client';
import { SectorType } from '@enums/SectorType';
import { PrimaryInterestType } from '@enums/PrimaryInterestType';
import { RegisterSurvey } from '../components/register-form/RegisterForm';

const useRegisterApi = () => {
    const axiosClient = useAxiosClient();
    const endpoint = apiEndpoints[ApiEndpoints.REGISTER];

    const register = (
        name: string,
        email: string,
        password: string,
        sector: SectorType,
        interest: PrimaryInterestType,
        company?: string,
        surveys?: Array<RegisterSurvey>
    ): Promise<AxiosResponse<AuthenticationResponse>> => {
        const auth = axiosClient<AuthenticationResponse>({
            apiConfig: {
                method: ApiMethod.POST,
                uri: `${endpoint}`,
                data: {
                    name,
                    email,
                    password,
                    sector,
                    interest,
                    company,
                    surveys
                }
            },
            axiosClientConfig: client
        });

        return auth;
    };

    return { register };
};

export type AuthenticationResponse = {
    user: AuthenicatedUserType;
};

export default useRegisterApi;
