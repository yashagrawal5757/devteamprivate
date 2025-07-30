import React from 'react';
import { HybridPaginationContextProvider } from './contexts/hybrid-pagination/useHybridPaginationContext';
import { PropertiesContextProvider } from './contexts/properties/usePropertiesContext';
import { LocationFrameContextProvider } from './contexts/location-frame/useLocationFrameContext';
import { PinPointsContextProvider } from './contexts/pin-points/usePinPointsContext';
import ExploreHybridContent from './explore-hybrid-content/ExploreHybridContent';
import { ExploreWatchlistContextProvider } from './contexts/explore-watchlist/useExploreWatchlistContext';
import { RegionSunHoursContextProvider } from './contexts/region-sun-hours/useRegionSunHoursContext';
import { PropertiesLookupLimitContextProvider } from './contexts/properties-lookup-limit/usePropertiesLookupLimitContext';
import { SFPinPointsContextProvider } from './contexts/sf-pin-points/useSFPinPointsContext';

const ExploreHybrid = () => {
    return (
        <HybridPaginationContextProvider>
            <PropertiesContextProvider>
                <LocationFrameContextProvider>
                    <PinPointsContextProvider>
                        <SFPinPointsContextProvider>
                            <ExploreWatchlistContextProvider>
                                <RegionSunHoursContextProvider>
                                    <PropertiesLookupLimitContextProvider>
                                        <ExploreHybridContent />
                                    </PropertiesLookupLimitContextProvider>
                                </RegionSunHoursContextProvider>
                            </ExploreWatchlistContextProvider>
                        </SFPinPointsContextProvider>
                    </PinPointsContextProvider>
                </LocationFrameContextProvider>
            </PropertiesContextProvider>
        </HybridPaginationContextProvider>
    );
};

export default ExploreHybrid;
