import React from 'react';
import { SimulationDataContextProvider } from './contexts/simulation-data/useSimulationDataContext';
import { MapPositionContextProvider } from './contexts/map-position/useMapPositionContext';
import { MapOptionsContextProvider } from './contexts/map-options/useMapOptionsContext';
import { UserLocationContextProvider } from './contexts/user-location/useUserLocationContext';
import { ShowSimulationAreaOnMapContextProvider } from './contexts/show-simulation/useShowSimulationAreaOnMapContext';
import CesiumMap from './cesium-map/CesiumMap';
import { PropertyFrameContextProvider } from './contexts/property-frame/usePropertyFrameContext';
import { ExploreSFModalContextProvider } from '@explore/contexts/explore-sf-modal/useExploreSFModalContext';
import { ExploreFootprintContextProvider } from './contexts/explore-footprint/useExploreFootprintContext';
import { ExploreSegmentationContextProvider } from './contexts/explore-sam-model/explore-segmentation/useExploreSegmentationContext';
import { ExploreEditorContextProvider } from './contexts/explore-sam-model/explore-editor/useExploreEditorContext';

type ExploreHybridMapProps = {
    onSearchFrame: () => void;
};

const ExploreHybridMap = ({ onSearchFrame }: ExploreHybridMapProps) => {
    return (
        <ExploreSFModalContextProvider>
            <SimulationDataContextProvider>
                <MapPositionContextProvider>
                    <MapOptionsContextProvider>
                        <UserLocationContextProvider>
                            <ShowSimulationAreaOnMapContextProvider>
                                <PropertyFrameContextProvider>
                                    <ExploreFootprintContextProvider>
                                        <ExploreSegmentationContextProvider>
                                            <ExploreEditorContextProvider>
                                                <CesiumMap onSearchFrame={onSearchFrame} />
                                            </ExploreEditorContextProvider>
                                        </ExploreSegmentationContextProvider>
                                    </ExploreFootprintContextProvider>
                                </PropertyFrameContextProvider>
                            </ShowSimulationAreaOnMapContextProvider>
                        </UserLocationContextProvider>
                    </MapOptionsContextProvider>
                </MapPositionContextProvider>
            </SimulationDataContextProvider>
        </ExploreSFModalContextProvider>
    );
};

export default ExploreHybridMap;
