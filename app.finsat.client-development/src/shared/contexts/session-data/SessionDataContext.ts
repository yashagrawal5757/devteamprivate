import React from 'react';
import { IReducerAction } from '../../models/IReducerAction';
import { SessionDataType } from '../../../state/session-data/SessionDataDefaults';

interface SessionDataContextType {
    state: SessionDataType;
    dispatch: React.Dispatch<IReducerAction>;
}

const SessionDataContext = React.createContext<SessionDataContextType>(
    {} as SessionDataContextType
);

export default SessionDataContext;
