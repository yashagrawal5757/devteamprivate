import React from 'react';
import WaitlistUsersReducer from '../state/WaitlistUsersReducer';
import WaitlistUsersDefaults from '../state/WaitlistUsersDefaults';
import WaitlistUsersContext from './WaitlistUsersContext';
import createDataContext from '@contexts/createDataContext';

export const WaitlistUsersContextProvider = createDataContext(
    WaitlistUsersReducer,
    WaitlistUsersDefaults,
    WaitlistUsersContext
);

export default function useWaitlistUsersContext() {
    return React.useContext(WaitlistUsersContext);
}
