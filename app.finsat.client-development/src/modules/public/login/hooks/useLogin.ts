import { AxiosResponse } from 'axios';
import useLoginApi, { AuthenticationResponse } from './useLoginApi';
import { useNavigate } from 'react-router-dom';
import { Routes, RoutingKeys } from '@routes/router.keys';
import useError from '@hooks/useError';
import useLoading from '@hooks/useLoading';
import useSessionData from '@hooks/useSessionData';

const useLogin = () => {
    const error = useError();

    const loginApi = useLoginApi();
    const navigate = useNavigate();

    const loading = useLoading();
    const sessionData = useSessionData();

    const onSubmit = (email: string, password: string) => {
        loading.load();

        loginApi
            .authenticate(email, password)
            .then((response: AxiosResponse<AuthenticationResponse, any>) => {
                const { data } = response;
                const { token, user } = data;

                sessionData.authenticate(token, user);

                setTimeout(() => {
                    navigate(RoutingKeys[Routes.DASHBOARD]);
                }, 500);
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const navigateToRegister = (e: any) => {
        e.preventDefault();
        navigate(RoutingKeys[Routes.REGISTER]);
    };

    return { onSubmit, navigateToRegister };
};

export default useLogin;
