import { AxiosResponse } from 'axios';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import client from '@core/api/client';
import { ApplicationRole } from '@state/session-data/SessionDataDefaults';
import { PowerUnit } from '@enums/PowerUnit';

const useProfileApi = () => {
    const axiosClient = useAxiosClient();
    const endpoint = apiEndpoints[ApiEndpoints.ACCOUNT];
    const endpointEditProfile = apiEndpoints[ApiEndpoints.EDIT_PROFILE];
    const endpointResetPassword = apiEndpoints[ApiEndpoints.RESET_PASSWORD];

    const editProfile = (
        firstName: string,
        lastName: string
    ): Promise<AxiosResponse<EditProfileResponse>> => {
        const auth = axiosClient<EditProfileResponse>({
            apiConfig: {
                method: ApiMethod.PUT,
                uri: `${endpointEditProfile}`,
                data: { firstName, lastName }
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const resetPassword = (
        currentPassword: string,
        newPassword: string
    ): Promise<AxiosResponse<void>> => {
        const auth = axiosClient<void>({
            apiConfig: {
                method: ApiMethod.PUT,
                uri: `${endpointResetPassword}`,
                data: { currentPassword, newPassword }
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const getPreferences = (): Promise<AxiosResponse<PreferencesResponse>> => {
        const auth = axiosClient<PreferencesResponse>({
            apiConfig: {
                method: ApiMethod.GET,
                uri: `${endpoint}/preferences`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const changePowerUnit = (
        unit: PowerUnit
    ): Promise<AxiosResponse<PowerUnitResponse>> => {
        const auth = axiosClient<PowerUnitResponse>({
            apiConfig: {
                method: ApiMethod.PUT,
                uri: `${endpoint}/power-unit`,
                data: { unit }
            },
            axiosClientConfig: client
        });

        return auth;
    };

    return { editProfile, resetPassword, getPreferences, changePowerUnit };
};

export type EditProfileResponse = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: ApplicationRole;
};

export type PreferencesResponse = {
    powerUnit: PowerUnit;
};

export type PowerUnitResponse = {
    powerUnit: PowerUnit;
};

export default useProfileApi;
