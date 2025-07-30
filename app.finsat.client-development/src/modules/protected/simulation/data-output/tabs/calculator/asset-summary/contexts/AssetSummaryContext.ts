import React from 'react';
import { AssetSummaryType } from '../../state/AssetSummaryDefaults';
import { IReducerAction } from '@models/IReducerAction';

interface AssetSummaryContextType {
    state: AssetSummaryType | undefined;
    dispatch: React.Dispatch<IReducerAction>;
}

const AssetSummaryContext = React.createContext<AssetSummaryContextType>(
    {} as AssetSummaryContextType
);

export default AssetSummaryContext;
