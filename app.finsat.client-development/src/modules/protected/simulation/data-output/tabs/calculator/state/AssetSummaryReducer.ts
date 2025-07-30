import { IReducerAction } from '@models/IReducerAction';
import { AssetSummaryActions } from './AssetSummaryActions';
import { AssetSummaryType } from './AssetSummaryDefaults';
import ReducerType from '../../../../../../../shared/types/ReducerType';

const AssetSummaryReducer: ReducerType<
    AssetSummaryType | undefined,
    IReducerAction
> = (state: AssetSummaryType | undefined, action: IReducerAction) => {
    switch (action.type) {
        case AssetSummaryActions.SET_ASSET_SUMMARY:
            return action.payload;
        case AssetSummaryActions.CLEAR_ASSET_SUMMARY:
            return undefined;
        default:
            return state;
    }
};

export default AssetSummaryReducer;
