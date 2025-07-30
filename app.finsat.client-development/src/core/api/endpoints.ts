export enum ApiEndpoints {
    BASE = 0,
    LOGIN,
    REGISTER,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_VERIFY,
    FORGOT_PASSWORD_RESET,
    WAITLIST,
    GET_BUILDINGS,
    SPATIAL_FEATURES,
    SIMULATION,
    CALCULATOR,
    ACCOUNT,
    EDIT_PROFILE,
    RESET_PASSWORD,
    WATCHLISTS,
    SOLAR,
    SUBSCRIPTIONS
}

export const apiEndpoints: Record<ApiEndpoints, string> = {
    [ApiEndpoints.BASE]: process.env.REACT_APP_API_BASE_ROUTE ?? '',
    [ApiEndpoints.LOGIN]: '/auth/login',
    [ApiEndpoints.REGISTER]: '/auth/register',
    [ApiEndpoints.FORGOT_PASSWORD]: '/auth/forgot-password',
    [ApiEndpoints.FORGOT_PASSWORD_VERIFY]: '/auth/forgot-password/verify',
    [ApiEndpoints.FORGOT_PASSWORD_RESET]: '/auth/forgot-password/reset',
    [ApiEndpoints.WAITLIST]: '/waitlist',
    [ApiEndpoints.GET_BUILDINGS]: '/buildings',
    [ApiEndpoints.SIMULATION]: '/simulations',
    [ApiEndpoints.CALCULATOR]: '/calculator',
    [ApiEndpoints.ACCOUNT]: '/account',
    [ApiEndpoints.EDIT_PROFILE]: '/account/profile',
    [ApiEndpoints.RESET_PASSWORD]: '/account/reset-password',
    [ApiEndpoints.WATCHLISTS]: '/watchlists',
    [ApiEndpoints.SOLAR]: '/solar',
    [ApiEndpoints.SUBSCRIPTIONS]: '/subscriptions',
    [ApiEndpoints.SPATIAL_FEATURES]: '/sites/spatial-features'
};
