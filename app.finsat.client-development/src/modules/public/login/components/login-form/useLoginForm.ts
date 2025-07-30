import { useState } from 'react';
import { Routes, RoutingKeys } from '@routes/router.keys';
import { useNavigate } from 'react-router-dom';

const useLoginForm = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const navigateToForgotPassword = (e: any) => {
        e.preventDefault();
        navigate(RoutingKeys[Routes.FORGOT_PASSWORD_EMAIL]);
    };

    const onShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return { showPassword, navigateToForgotPassword, onShowPassword };
};

export default useLoginForm;
