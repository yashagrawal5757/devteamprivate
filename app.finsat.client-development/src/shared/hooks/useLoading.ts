import { LoadingActions } from '../../state/loading/LoadingActions';
import useLoadingContext from '../contexts/loading/useLoadingContext';

const useLoading = () => {
    const loadingContext = useLoadingContext();

    const load = (): void => {
        loadingContext.dispatch({
            type: LoadingActions.LOADING
        });
    };

    const loaded = (): void => {
        loadingContext.dispatch({
            type: LoadingActions.LOADED
        });
    };

    return { loading: loadingContext.state, load, loaded };
};

export default useLoading;
