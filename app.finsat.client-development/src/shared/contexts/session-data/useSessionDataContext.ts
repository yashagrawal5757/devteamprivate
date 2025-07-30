import React from 'react';
import SessionDataReducer from '../../../state/session-data/SessionDataReducer';
import SessionDataDefaults, {
    sessionDataDefaultFn
} from '../../../state/session-data/SessionDataDefaults';
import SessionDataContext from './SessionDataContext';
import createPersistDataContext from '@contexts/createPersistDataContext';

export const SessionDataContextProvider = createPersistDataContext(
    SessionDataReducer,
    SessionDataDefaults,
    SessionDataContext,
    sessionDataDefaultFn
);

export default function useSessionDataContext() {
    return React.useContext(SessionDataContext);
}
