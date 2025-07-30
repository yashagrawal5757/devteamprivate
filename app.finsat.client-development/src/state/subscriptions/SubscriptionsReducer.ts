import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../shared/types/ReducerType';
import { SubscriptionsType } from './SubscriptionsDefaults';
import { SubscriptionsActions } from './SubscriptionsActions';

const SubscriptionsReducer: ReducerType<SubscriptionsType, IReducerAction> = (
    state: SubscriptionsType,
    action: IReducerAction
) => {
    switch (action.type) {
        case SubscriptionsActions.SET_SUBSCRIPTION_PLAN:
            return { plan: action.payload };
        default:
            return state;
    }
};

export default SubscriptionsReducer;
