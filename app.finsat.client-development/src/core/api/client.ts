import axios, { InternalAxiosRequestConfig } from 'axios';

import { apiEndpoints, ApiEndpoints } from './endpoints';
import AuthService from '../auth/auth.service';
import { Routes, RoutingKeys } from '@routes/router.keys';

const api = axios.create({
    baseURL: apiEndpoints[ApiEndpoints.BASE],
    timeout: 180000,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (
        config: InternalAxiosRequestConfig<any>
    ):
        | InternalAxiosRequestConfig<any>
        | Promise<InternalAxiosRequestConfig<any>> => {
        const token = AuthService.getToken();

        if (token) {
            if (!config) {
                throw new Error('Request config is undefined');
            }

            if (!config.headers) {
                throw new Error('Request config headers are undefined');
            }

            config.headers.Authorization = 'Bearer ' + token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error?.response?.status === 401) {
            AuthService.clearAuthentication();

            setTimeout(() => {
                window.location.href = RoutingKeys[Routes.LOGIN];
            }, 1500);

            return Promise.reject({ response: { data: 'SESSION_TIMEOUT' } });
        }

        return Promise.reject(error);
    }
);

export default api;
