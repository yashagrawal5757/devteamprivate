import React from 'react';
import PropertyDetailsContent from './property-details-content/PropertyDetailsContent';
import { PropertyContextProvider } from './contexts/property/usePropertyContext';
import { VariationsContextProvider } from './contexts/variations/useVariationsContext';
import { PropertyDetailsWatchlistContextProvider } from './contexts/property-details-watchlist/usePropertyDetailsWatchlistContext';
import { SolarEstimateInputContextProvider } from './contexts/solar-estimate-input/useSolarEstimateInputContext';
import { SolarGenerationOutputContextProvider } from './contexts/solar-generation-output/useSolarGenerationOutputContext';
import { SolarFinancialOutputContextProvider } from './contexts/solar-financial-output/useSolarFinancialOutputContext';
import { PropertyFootprintContextProvider } from './contexts/property-footprint/usePropertyFootprintContext';
import { PropertyEditorContextProvider } from './contexts/property-editor/usePropertyEditorContext';
import { PropertyPolygonRefProvider } from './contexts/property-editor/PropertyPolygonRefContext';
import { InitialFootprintContextProvider } from './contexts/initial-footprint/useInitialFootprintContext';
import { PropertyEditorActionsStackContextProvider } from './contexts/property-editor-actions-stack/usePropertyEditorActionsStackContext';
import { EstimatedAreaContextProvider } from './contexts/estimated-area/useEstimatedAreaContext';
import PropertyEditorManagerContext from './contexts/property-editor-manager/PropertyEditorManagerContext';
import { PropertyEditorManagerContextProvider } from './contexts/property-editor-manager/usePropertyEditorManagerContext';

const PropertyDetails = () => {
    return (
        <PropertyContextProvider>
            <InitialFootprintContextProvider>
                <PropertyFootprintContextProvider>
                    <PropertyEditorContextProvider>
                        <PropertyEditorManagerContextProvider>
                            <PropertyEditorActionsStackContextProvider>
                                <VariationsContextProvider>
                                    <PropertyDetailsWatchlistContextProvider>
                                        <SolarGenerationOutputContextProvider>
                                            <SolarFinancialOutputContextProvider>
                                                <SolarEstimateInputContextProvider>
                                                    <PropertyPolygonRefProvider>
                                                        <EstimatedAreaContextProvider>
                                                            <PropertyDetailsContent />
                                                        </EstimatedAreaContextProvider>
                                                    </PropertyPolygonRefProvider>
                                                </SolarEstimateInputContextProvider>
                                            </SolarFinancialOutputContextProvider>
                                        </SolarGenerationOutputContextProvider>
                                    </PropertyDetailsWatchlistContextProvider>
                                </VariationsContextProvider>
                            </PropertyEditorActionsStackContextProvider>
                        </PropertyEditorManagerContextProvider>
                    </PropertyEditorContextProvider>
                </PropertyFootprintContextProvider>
            </InitialFootprintContextProvider>
        </PropertyContextProvider>
    );
};

export default PropertyDetails;
