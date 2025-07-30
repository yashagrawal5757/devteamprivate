import { useNavigate } from 'react-router-dom';
import useForgotPasswordEmailApi from './useForgotPasswordEmailApi';
import { Routes, RoutingKeys } from '@routes/router.keys';
import useError from '@hooks/useError';
import useLoading from '@hooks/useLoading';

const useForgotPasswordEmail = () => {
    const error = useError();
    const loading = useLoading();

    const navigate = useNavigate();

    const forgotPasswordEmailApi = useForgotPasswordEmailApi();

    const onSubmit = (email: string) => {
        loading.load();

        forgotPasswordEmailApi
            .forgotPassword(email)
            .then(() => {
                setTimeout(() => {
                    navigate(RoutingKeys[Routes.VERIFICATION]);
                }, 500);
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const navigateToLogin = (e: any) => {
        e.preventDefault();
        navigate(RoutingKeys[Routes.LOGIN]);
    };

    return { navigateToLogin, onSubmit };
};

export default useForgotPasswordEmail;
