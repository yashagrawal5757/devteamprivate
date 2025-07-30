import { Routes, RoutingKeys } from '@routes/router.keys';
import { useNavigate } from 'react-router-dom';

const useSimulationMapActions = () => {
    const navigate = useNavigate();

    const navigateToDashboard = () => {
        navigate(RoutingKeys[Routes.EXPLORE]);
    };

    return { navigateToDashboard };
};

export default useSimulationMapActions;
