import useInitialFootprintContext from '../../contexts/initial-footprint/useInitialFootprintContext';
import { InitialFootprintActions } from '../../state/initial-footprint/InitialFootprintActions';

const useInitialFootprint = () => {
    const initialFootprintContext = useInitialFootprintContext();

    const setInitialFootprint = (footprint: Array<[number, number]>) => {
        initialFootprintContext.dispatch({
            type: InitialFootprintActions.SET_INITIAL_FOOTPRINT,
            payload: footprint
        });
    };

    return {
        initialFootprint: initialFootprintContext.state,
        setInitialFootprint
    };
};

export default useInitialFootprint;
