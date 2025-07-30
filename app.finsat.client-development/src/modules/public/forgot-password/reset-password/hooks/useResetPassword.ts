import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useResetPasswordApi from './useResetPasswordApi';
import { Routes, RoutingKeys } from '@routes/router.keys';
import useError from '@hooks/useError';
import useSuccess from '@hooks/useSuccess';
import useLoading from '@hooks/useLoading';

const useResetPassword = () => {
    const error = useError();
    const success = useSuccess();
    const loading = useLoading();
    const location = useLocation();
    const resetPasswordApi = useResetPasswordApi();

    const navigate = useNavigate();

    const [tokenVerification, setTokenVerification] = useState<boolean>(false);

    const getToken = (): string | null => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get('token');
    };

    const onSubmit = (newPassword: string, token: string) => {
        loading.load();

        resetPasswordApi
            .resetPassword(newPassword, token)
            .then(() => {
                setTimeout(() => {
                    navigate(RoutingKeys[Routes.LOGIN]);
                }, 500);

                success.setSuccessMessage('Your password has been changed');
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const onVerifyToken = (token: string) => {
        loading.load();

        resetPasswordApi
            .verifyToken(token)
            .then(() => {
                setTokenVerification(true);
            })
            .catch((e) => {
                setTokenVerification(false);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const navigateToLogin = (e: any) => {
        e.preventDefault();
        navigate(RoutingKeys[Routes.LOGIN]);
    };

    return {
        tokenVerification,
        getToken,
        navigateToLogin,
        onSubmit,
        onVerifyToken
    };
};

export default useResetPassword;
