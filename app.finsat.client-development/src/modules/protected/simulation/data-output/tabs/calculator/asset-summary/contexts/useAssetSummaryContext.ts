import React from 'react';
import AssetSummaryContext from './AssetSummaryContext';
import AssetSummaryReducer from '../../state/AssetSummaryReducer';
import AssetSummaryDefaults from '../../state/AssetSummaryDefaults';
import createDataContext from '@contexts/createDataContext';

export const AssetSummaryContextProvider = createDataContext(
    AssetSummaryReducer,
    AssetSummaryDefaults,
    AssetSummaryContext
);

export default function useAssetSummaryContext() {
    return React.useContext(AssetSummaryContext);
}
