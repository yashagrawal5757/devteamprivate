import useError from '@hooks/useError';
import useLoading from '@hooks/useLoading';
import useSuccess from '@hooks/useSuccess';
import useToggle from '@hooks/useToggle';
import { AxiosResponse } from 'axios';
import useExistingWatchlists from './useExistingWatchlists';
import { AddToWatchlistType } from '@enums/AddToWatchlistType';
import useLocationFrame from 'modules/protected/explore-hybrid/hooks/location-frame/useLocationFrame';
import useExploreWatchlistApi, {
    WatchlistResponse
} from 'modules/protected/explore-hybrid/hooks/watchlist/useExploreWatchlistApi';
import usePinPoints from 'modules/protected/explore-hybrid/hooks/pin-points/usePinPoints';

const useExploreWatchlistModal = () => {
    const {
        isActive: isAddNewWatchlistActive,
        toggle: addNewWatchlistToggle,
        setToggle: setAddNewWatchlistToggle
    } = useToggle();

    const { setWatchlists, prependWatchlist } = useExistingWatchlists();
    const { locationFrame } = useLocationFrame();
    const { pinPoints } = usePinPoints();

    const error = useError();
    const success = useSuccess();
    const loading = useLoading();
    const exploreApi = useExploreWatchlistApi();

    const onGetWatchlists = (search?: string | undefined) => {
        if (search) {
            loading.load();
        }

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

    const onAddNewWatchlist = (name: string) => {
        loading.load();

        exploreApi
            .addNewWatchlist(name)
            .then((response: AxiosResponse<WatchlistResponse, any>) => {
                const { data } = response;
                const newWatchlist = data;

                prependWatchlist(newWatchlist);
                addNewWatchlistToggle();

                success.setSuccessMessage('Watchlist has been created');
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const onAddPropertyToWatchlist = (
        id: string,
        type: AddToWatchlistType,
        buildingIds: Array<string>
    ) => {
        loading.load();

        var buildings = pinPoints
            .filter((pinPoint) => buildingIds.includes(pinPoint.id))
            .map((pinPoint) => ({
                osmId: pinPoint.id,
                name: pinPoint.name,
                latitude: pinPoint.latitude,
                longitude: pinPoint.longitude
            }));

        exploreApi
            .addPropertyToWatchlist(id, type, buildings)
            .then(() => {
                success.setSuccessMessage(
                    'Property has been added to watchlist'
                );
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const onAddAllPropertiesToWatchlist = (
        id: string,
        type: AddToWatchlistType
    ) => {
        loading.load();

        const boundingBox = locationFrame;

        exploreApi
            .addAllPropertiesToWatchlist(
                id,
                type,
                boundingBox
            )
            .then(() => {
                success.setSuccessMessage(
                    'All properties have been added to watchlist'
                );
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    return {
        isAddNewWatchlistActive,
        addNewWatchlistToggle,
        setAddNewWatchlistToggle,
        onGetWatchlists,
        onAddNewWatchlist,
        onAddPropertyToWatchlist,
        onAddAllPropertiesToWatchlist
    };
};

export default useExploreWatchlistModal;
