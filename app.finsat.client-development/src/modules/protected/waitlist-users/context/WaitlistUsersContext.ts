import React from 'react';
import { WaitlistUsersType } from '../state/WaitlistUsersDefaults';
import { IReducerAction } from '@models/IReducerAction';

interface WaitlistUsersContextType {
    state: WaitlistUsersType[];
    dispatch: React.Dispatch<IReducerAction>;
}

const WaitlistUsersContext = React.createContext<WaitlistUsersContextType>(
    {} as WaitlistUsersContextType
);

export default WaitlistUsersContext;
