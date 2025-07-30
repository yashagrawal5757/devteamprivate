import React from 'react';
import createDataContext from '@contexts/createDataContext';
import SubscriptionsReducer from '@state/subscriptions/SubscriptionsReducer';
import SubscriptionsDefaults from '@state/subscriptions/SubscriptionsDefaults';
import SubscriptionsContext from './SubscriptionsContext';

export const SubscriptionsContextProvider = createDataContext(
    SubscriptionsReducer,
    SubscriptionsDefaults,
    SubscriptionsContext
);

export default function useSubscriptionsContext() {
    return React.useContext(SubscriptionsContext);
}
