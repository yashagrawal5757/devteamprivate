import client from '@core/api/client';
import { ApiEndpoints, apiEndpoints } from '@core/api/endpoints';
import { UpgradePlan } from '@enums/UpgradePlan';
import useAxiosClient, { ApiMethod } from '@hooks/useAxiosClient';
import { AxiosResponse } from 'axios';

const useSubscriptionsApi = () => {
    const axiosClient = useAxiosClient();
    const endpoint = apiEndpoints[ApiEndpoints.SUBSCRIPTIONS];

    const generateRedirectLink = (): Promise<
        AxiosResponse<GenerateRedirectLinkResponse>
    > => {
        const auth = axiosClient<GenerateRedirectLinkResponse>({
            apiConfig: {
                method: ApiMethod.POST,
                uri: `${endpoint}/generate-link`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    const getCurrentSubscriptionPlan = (): Promise<
        AxiosResponse<CurrentSubscriptionPlan>
    > => {
        const auth = axiosClient<CurrentSubscriptionPlan>({
            apiConfig: {
                method: ApiMethod.GET,
                uri: `${endpoint}/current`,
                data: {}
            },
            axiosClientConfig: client
        });

        return auth;
    };

    return { generateRedirectLink, getCurrentSubscriptionPlan };
};

export type GenerateRedirectLinkResponse = {
    url: string;
};

export type CurrentSubscriptionPlan = {
    plan: UpgradePlan;
};

export default useSubscriptionsApi;
