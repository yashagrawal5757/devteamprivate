import useError from '@hooks/useError';
import useSubscriptionsApi from './useSubscriptionsApi';
import useLoading from '@hooks/useLoading';
import useSubscriptionsContext from '@contexts/subscriptions/useSubscriptionsContext';
import { SubscriptionsActions } from '@state/subscriptions/SubscriptionsActions';
import { UpgradePlan } from '@enums/UpgradePlan';

const useSubscriptions = () => {
    const subscriptionsApi = useSubscriptionsApi();
    const subscriptionsContext = useSubscriptionsContext();
    const loading = useLoading();
    const error = useError();
    let subscriptionCheckInterval: NodeJS.Timeout | null = null;

    const generateRedirectLink = (): void => {
        loading.load();

        subscriptionsApi
            .generateRedirectLink()
            .then((response) => {
                const {
                    data: { url }
                } = response;

                window.open(url, '_blank', 'noopener,noreferrer');
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const getCurrentSubscriptionPlan = () => {
        subscriptionsApi
            .getCurrentSubscriptionPlan()
            .then((response) => {
                const {
                    data: { plan }
                } = response;

                subscriptionsContext.dispatch({
                    type: SubscriptionsActions.SET_SUBSCRIPTION_PLAN,
                    payload: plan
                });

                if (plan === UpgradePlan.BASIC && subscriptionCheckInterval) {
                    clearInterval(subscriptionCheckInterval);
                    subscriptionCheckInterval = null;
                }
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            });
    };

    const startSubscriptionPolling = () => {
        getCurrentSubscriptionPlan();
        subscriptionCheckInterval = setInterval(
            getCurrentSubscriptionPlan,
            5 * 60 * 1000
        );
    };

    return {
        subscriptions: subscriptionsContext.state,
        generateRedirectLink,
        getCurrentSubscriptionPlan,
        startSubscriptionPolling
    };
};

export default useSubscriptions;
