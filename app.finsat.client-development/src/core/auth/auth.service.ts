import { redirect } from 'react-router-dom';
import { AuthenicatedUserType } from '../../state/session-data/SessionDataDefaults';
import { Routes, RoutingKeys } from '@routes/router.keys';

enum AuthStorageKeys {
    ACCESS_TOKEN = 0,
    AUTHENTICATED_USER
}

const AuthKeys: Record<AuthStorageKeys, string> = {
    [AuthStorageKeys.ACCESS_TOKEN]: 'access_token',
    [AuthStorageKeys.AUTHENTICATED_USER]: 'user'
};

export type SessionDataType = {
    isAuthenticated: boolean;
    token: string | undefined;
    authenticatedUser: AuthenicatedUserType | undefined;
};

class AuthService {
    static getToken(): string | undefined {
        return (
            sessionStorage.getItem(AuthKeys[AuthStorageKeys.ACCESS_TOKEN]) ??
            undefined
        );
    }

    static getAuthenticatedUser(): AuthenicatedUserType | undefined {
        const user = sessionStorage.getItem(
            AuthKeys[AuthStorageKeys.AUTHENTICATED_USER]
        );

        if (user === null) {
            return undefined;
        }

        return JSON.parse(user);
    }

    static getSession(): SessionDataType {
        const user = AuthService.getAuthenticatedUser();
        const token = AuthService.getToken();

        const sessionData: SessionDataType = {
            isAuthenticated: !!token,
            token: token,
            authenticatedUser: user
        };

        return sessionData;
    }

    static async authenticationLoader(): Promise<Response | null> {
        const isSessionValid = AuthService.isAuthenticated();

        if (!isSessionValid) {
            return redirect(RoutingKeys[Routes.LOGIN]);
        }

        return null;
    }

    static setAuthentication(token: string, user: AuthenicatedUserType): void {
        sessionStorage.setItem(AuthKeys[AuthStorageKeys.ACCESS_TOKEN], token);
        sessionStorage.setItem(
            AuthKeys[AuthStorageKeys.AUTHENTICATED_USER],
            JSON.stringify(user)
        );
    }

    static clearAuthentication(): void {
        sessionStorage.removeItem(AuthKeys[AuthStorageKeys.ACCESS_TOKEN]);
        sessionStorage.removeItem(AuthKeys[AuthStorageKeys.AUTHENTICATED_USER]);
    }

    private static isAuthenticated(): boolean {
        return !!sessionStorage.getItem(AuthKeys[AuthStorageKeys.ACCESS_TOKEN]);
    }
}

export default AuthService;
