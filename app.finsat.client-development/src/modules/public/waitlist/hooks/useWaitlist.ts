import { Routes, RoutingKeys } from '@routes/router.keys';
import { useNavigate } from 'react-router-dom';

const useWaitlist = () => {
    const navigate = useNavigate();

    const navigateToLogin = (e: any) => {
        e.preventDefault();
        navigate(RoutingKeys[Routes.LOGIN]);
    };

    return { navigateToLogin };
};

export default useWaitlist;
