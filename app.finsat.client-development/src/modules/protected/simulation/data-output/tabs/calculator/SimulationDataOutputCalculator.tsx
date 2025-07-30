import React from 'react';
import AdaptationMeasuresForm from './adaptation-measures-form/AdaptationMeasuresForm';
import AssetSummary from './asset-summary/AssetSummary';
import { AssetSummaryContextProvider } from './asset-summary/contexts/useAssetSummaryContext';

const SimulationDataOutputCalculator = () => {
    return (
        <AssetSummaryContextProvider>
            <AdaptationMeasuresForm onSubmit={() => {}} />
            <AssetSummary />
        </AssetSummaryContextProvider>
    );
};

export default SimulationDataOutputCalculator;
