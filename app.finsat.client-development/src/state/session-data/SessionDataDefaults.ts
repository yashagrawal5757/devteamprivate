import AuthService from '@core/auth/auth.service';

export type SessionDataType = {
    isAuthenticated: boolean;
    token: string | undefined;
    authenticatedUser: AuthenicatedUserType | undefined;
};

export type AuthenicatedUserType = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: ApplicationRole;
};

export enum ApplicationRole {
    Admin = 0,
    Custom
}

const user = AuthService.getAuthenticatedUser();
const token = AuthService.getToken();

export const sessionDataDefaultFn = AuthService.getSession;

const SessionData: SessionDataType = sessionDataDefaultFn();

export default SessionData;
