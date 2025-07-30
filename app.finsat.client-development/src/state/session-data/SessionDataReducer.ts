import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../shared/types/ReducerType';
import { SessionDataActions } from './SessionDataActions';
import { SessionDataType } from './SessionDataDefaults';
import AuthService from '@core/auth/auth.service';
import MapStorageService from 'modules/protected/explore-hybrid/explore-hybrid-content/explore-hybrid-map/services/map.storage.service';

const SessionDataReducer: ReducerType<SessionDataType, IReducerAction> = (
    state: SessionDataType,
    action: IReducerAction
) => {
    switch (action.type) {
        case SessionDataActions.AUTHENTICATE:
            const { token, userData } = action.payload;

            AuthService.setAuthentication(token, userData);

            return {
                isAuthenticated: true,
                token: token,
                authenticatedUser: userData
            };
        case SessionDataActions.UPDATE_AUTHENTICATED_USER:
            const user = action.payload;

            AuthService.setAuthentication(state.token!, user);

            return {
                isAuthenticated: true,
                token: state.token,
                authenticatedUser: user
            };
        case SessionDataActions.LOGOUT:
            AuthService.clearAuthentication();
            MapStorageService.clearMapStorageOptions();

            return {
                isAuthenticated: false,
                token: undefined,
                authenticatedUser: undefined
            };
        default:
            return state;
    }
};

export default SessionDataReducer;
