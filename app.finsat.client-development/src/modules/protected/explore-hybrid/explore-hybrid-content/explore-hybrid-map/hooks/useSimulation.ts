import useError from '@hooks/useError';
import useSimulationDataContext from '../contexts/simulation-data/useSimulationDataContext';
import { SimulationDataActions } from '../state/simulation-data/SimulationDataActions';
import useSimulationApi from './useSimulationApi';
import useLocationFrame from 'modules/protected/explore-hybrid/hooks/location-frame/useLocationFrame';

const useSimulation = () => {
    const simulationDataContext = useSimulationDataContext();
    const { locationFrame: lookup } = useLocationFrame();
    const error = useError();

    const simulationApi = useSimulationApi();

    const fetchSimulationKeys = () => {
        if (lookup === undefined) {
            return;
        }

        const {
            topLeft: northWest,
            topRight: northEast,
            bottomLeft: southWest,
            bottomRight: southEast
        } = lookup;

        simulationApi
            .getSimulationKeysForLocation(
                northEast,
                northWest,
                southEast,
                southWest
            )
            .then((response) => {
                const { data } = response;

                simulationDataContext.dispatch({
                    type: SimulationDataActions.SET_SIMULATIONS_DATA,
                    payload: data
                });
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            });
    };

    return { simulations: simulationDataContext.state, fetchSimulationKeys };
};

export default useSimulation;
