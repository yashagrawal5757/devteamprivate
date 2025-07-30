import useExploreLoadContext from '@contexts/explore-load/useExploreLoadContext';
import { ExploreLoadActions } from '@state/explore-load/ExploreLoadActions';

const useExploreLoad = () => {
    const exploreLoadContext = useExploreLoadContext();

    const exploreLoading = (): void => {
        exploreLoadContext.dispatch({
            type: ExploreLoadActions.SET_EXPLORE_LOADING
        });
    };

    const exploreLoaded = (): void => {
        exploreLoadContext.dispatch({
            type: ExploreLoadActions.SET_EXPLORE_LOADED
        });
    };

    return {
        exploreLoad: exploreLoadContext.state,
        exploreLoading,
        exploreLoaded
    };
};

export default useExploreLoad;
