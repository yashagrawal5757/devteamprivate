import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { SubscriptionsType } from '@state/subscriptions/SubscriptionsDefaults';

interface SubscriptionsContextType {
    state: SubscriptionsType;
    dispatch: React.Dispatch<IReducerAction>;
}

const SubscriptionsContext = React.createContext<SubscriptionsContextType>(
    {} as SubscriptionsContextType
);

export default SubscriptionsContext;
