import useError from '@hooks/useError';
import useLoading from '@hooks/useLoading';
import useSuccess from '@hooks/useSuccess';
import useToggle from '@hooks/useToggle';
import { AxiosResponse } from 'axios';
import { AddToWatchlistType } from '@enums/AddToWatchlistType';
import useExistingWatchlists from 'modules/protected/property-details/hooks/existing-watchlists/useExistingWatchlists';
import useExploreWatchlistApi, {
    WatchlistResponse
} from 'modules/protected/explore-hybrid/hooks/watchlist/useExploreWatchlistApi';
import usePinPoints from 'modules/protected/explore-hybrid/hooks/pin-points/usePinPoints';
import useProperty from 'modules/protected/property-details/hooks/property/useProperty';

const useAddPropertyToWatchlistModal = () => {
    const {
        isActive: isAddNewWatchlistActive,
        toggle: addNewWatchlistToggle,
        setToggle: setAddNewWatchlistToggle
    } = useToggle();

    const { setWatchlists, prependWatchlist } = useExistingWatchlists();

    const error = useError();
    const success = useSuccess();
    const loading = useLoading();
    const exploreApi = useExploreWatchlistApi();
    const { property } = useProperty();

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
        type: AddToWatchlistType
    ) => {
        loading.load();

        // var building = pinPoints
        //     .filter((pinPoint) => buildingIds.includes(pinPoint.id))
        //     .map((pinPoint) => ({
        //         osmId: pinPoint.id,
        //         name: pinPoint.name,
        //         latitude: pinPoint.latitude,
        //         longitude: pinPoint.longitude
        //     }));

        if (property === undefined) {
            return;
        }

        var building = {
            osmId: property.osmId,
            name: property.name,
            latitude: property.location.position.latitude,
            longitude: property.location.position.longitude
        }

        exploreApi
            .addPropertyToWatchlist(id, type, [building])
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

    return {
        isAddNewWatchlistActive,
        addNewWatchlistToggle,
        setAddNewWatchlistToggle,
        onGetWatchlists,
        onAddNewWatchlist,
        onAddPropertyToWatchlist
    };
};

export default useAddPropertyToWatchlistModal;
