import React from 'react';
import createDataContext from '@contexts/createDataContext';
import UserLocationReducer from '../../state/user-location/UserLocationReducer';
import UserLocationDefaults from '../../state/user-location/UserLocationDefaults';
import UserLocationContext from './UserLocationContext';

export const UserLocationContextProvider = createDataContext(
    UserLocationReducer,
    UserLocationDefaults,
    UserLocationContext
);

export default function useUserLocationContext() {
    return React.useContext(UserLocationContext);
}
