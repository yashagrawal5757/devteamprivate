import { useNavigate } from 'react-router-dom';
import { SessionDataActions } from '../../state/session-data/SessionDataActions';
import { AuthenicatedUserType } from '../../state/session-data/SessionDataDefaults';
import useSessionDataContext from '../contexts/session-data/useSessionDataContext';
import { Routes, RoutingKeys } from '../routes/router.keys';

const useSessionData = () => {
    const sessionDataContext = useSessionDataContext();
    const navigate = useNavigate();

    const logout = (): void => {
        sessionDataContext.dispatch({
            type: SessionDataActions.LOGOUT
        });

        navigate(RoutingKeys[Routes.LOGIN]);
    };

    const authenticate = (token: string, user: AuthenicatedUserType): void => {
        sessionDataContext.dispatch({
            type: SessionDataActions.AUTHENTICATE,
            payload: {
                token,
                userData: user
            }
        });
    };

    const updateAuthenticatedUser = (user: AuthenicatedUserType): void => {
        sessionDataContext.dispatch({
            type: SessionDataActions.UPDATE_AUTHENTICATED_USER,
            payload: user
        });
    };

    return {
        sessionData: sessionDataContext.state,
        authenticate,
        updateAuthenticatedUser,
        logout
    };
};

export default useSessionData;
