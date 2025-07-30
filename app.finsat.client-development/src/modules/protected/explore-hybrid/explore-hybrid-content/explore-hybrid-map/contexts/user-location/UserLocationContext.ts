import React from 'react';
import { UserLocation } from '../../state/user-location/UserLocationDefaults';
import { IReducerAction } from '@models/IReducerAction';

interface UserLocationContextType {
    state: UserLocation | undefined;
    dispatch: React.Dispatch<IReducerAction>;
}

const UserLocationContext = React.createContext<UserLocationContextType>(
    {} as UserLocationContextType
);

export default UserLocationContext;
