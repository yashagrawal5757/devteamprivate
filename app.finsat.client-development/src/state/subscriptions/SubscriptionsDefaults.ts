import { UpgradePlan } from '@enums/UpgradePlan';

export type SubscriptionsType = {
    plan: UpgradePlan;
};

const SubscriptionsDefaults: SubscriptionsType = {
    plan: UpgradePlan.FREE
};

export default SubscriptionsDefaults;
