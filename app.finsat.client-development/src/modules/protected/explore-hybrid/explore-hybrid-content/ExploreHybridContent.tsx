import React, { useCallback, useEffect } from 'react';
import useHybridSolution from '../hooks/hybrid-solution/useHybridSolution';
import useHybridPagination from '../hooks/hybrid-pagination/useHybridPagination';
import useProperties from '../hooks/properties/useProperties';
import { HybridPaginationType } from '../state/hybrid-pagination/HybridPaginationDefaults';
import _ from 'lodash';
import ExploreHybridProperties from './explore-hybrid-properties/ExploreHybridProperties';
import ExploreHybridMap from './explore-hybrid-map/ExploreHybridMap';
import useLocationFrame from '../hooks/location-frame/useLocationFrame';
import usePinPoints from '../hooks/pin-points/usePinPoints';
import { PinPoint } from '../state/pin-points/PinPointsDefaults';
import { ExistingWatchlistsContextProvider } from './explore-hybrid-watchlist-modal/contexts/existing-watchlists/useExistingWatchlistsContext';
import ExploreHybridWatchlistModal from './explore-hybrid-watchlist-modal/ExploreHybridWatchlistModal';
import useRegionSunHours from '../hooks/region-sun-hours/useRegionSunHours';
import useDestinationLookup from '@hooks/useDestinationLookup';
import usePropertiesLookupLimit from '../hooks/hybrid-solution/usePropertiesLookupLimit';
import useLoading from '@hooks/useLoading';
import {
    useLocation,
    useNavigationType,
    NavigationType
} from 'react-router-dom';
import useExploreLoad from '@hooks/useExploreLoad';
import useSFPinPoints from '@explore/hooks/sf-pin-points/useSFPinPoints';
import ExploreHybridSFModal from './explore-hybrid-sf-modal/ExploreHybridSFModal';
import useToggle from '@hooks/useToggle';
import { SpatialFeatureType } from '@enums/SpatialFeatureType';
import useExploreFootprint from './explore-hybrid-map/hooks/explore-footprint/useExploreFootprint';
import useGeometry from '@hooks/useGeometry';

const ExploreHybridContent = () => {
    const { getInitialPaginationAndPoints, hybridModelHandler } =
        useHybridSolution();
    const {
        setProperties,
        fetchSpatialFeatures,
        createSpatialFeature
    } = useProperties();
    const { locationFrame } = useLocationFrame();
    const { destination, clearDestination } = useDestinationLookup();
    const { setPinPoints } = usePinPoints();
    const { setSFPinPoints } = useSFPinPoints();
    const { getRegionSunHours } = useRegionSunHours();
    const { setLookupLimit } = usePropertiesLookupLimit();
    const { load, loaded } = useLoading();
    const { exploreLoading, exploreLoaded } = useExploreLoad();
        useGeometry();
    const location = useLocation();
    const navigationType = useNavigationType();


    const debouncedExploreFilter = useCallback(
        _.debounce(() => {
            load();
            exploreLoading();
            setLookupLimit(true);
            getRegionSunHours();
            setProperties([]);
            setPinPoints([]);
            getInitialPaginationAndPoints()
                .then(
                    ([pagination, points]: [
                        HybridPaginationType,
                        Array<PinPoint>
                    ]): Promise<void> => {
                        if (points.length === 0) {
                            exploreLoaded();

                            return Promise.resolve();
                        }

                        setPinPoints(points);
                        return hybridModelHandler(pagination);
                    }
                )
                .then(() => {
                    loaded();
                });
        }, 500),
        [locationFrame]
    );

    const debouncedSpatialFeatures = useCallback(
        _.debounce(() => {
            setSFPinPoints([]);
            fetchSpatialFeatures();
        }, 500),
        [locationFrame]
    );

    useEffect(() => {
        if (destination === undefined) {
            return;
        }

        if (locationFrame === undefined) {
            return;
        }

        debouncedExploreFilter();
        debouncedSpatialFeatures();

        clearDestination();
    }, [locationFrame]);

    useEffect(() => {
        if (navigationType === NavigationType.Pop) {
            exploreLoaded();
        }
    }, [location, navigationType]);

    return (
        <div className="flex flex-row h-full w-full relative">
            <div className="w-3/10">
                <ExploreHybridProperties />
            </div>
            <div className="w-7/10">
                <ExploreHybridMap onSearchFrame={() => {
                    debouncedExploreFilter();
                    debouncedSpatialFeatures();
                }} />
            </div>
            <ExistingWatchlistsContextProvider>
                <ExploreHybridWatchlistModal />
            </ExistingWatchlistsContextProvider>
        </div>
    );
};

export default ExploreHybridContent;
