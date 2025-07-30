import useError from '@hooks/useError';
import useLoading from '@hooks/useLoading';
import { AxiosResponse } from 'axios';
import useExploreWatchlistApi from 'modules/protected/explore-hybrid/hooks/watchlist/useExploreWatchlistApi';
import useExistingWatchlists from 'modules/protected/property-details/hooks/existing-watchlists/useExistingWatchlists';
import { WatchlistResponse } from 'modules/protected/property-details/hooks/watchlist/usePropertyDetailsWatchlistApi';

const useAddVariationModal = () => {
    const { setWatchlists } = useExistingWatchlists();

    const error = useError();
    const loading = useLoading();
    const exploreApi = useExploreWatchlistApi();

    const onGetWatchlists = (search?: string | undefined) => {
        loading.load();

        exploreApi
            .getWatchlists(search)
            .then((response: AxiosResponse<Array<WatchlistResponse>, any>) => {
                const { data } = response;
                const existingWatchlists = data;

                setWatchlists(existingWatchlists);
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    return {
        onGetWatchlists
    };
};

export default useAddVariationModal;
