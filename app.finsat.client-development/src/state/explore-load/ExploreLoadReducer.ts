import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../shared/types/ReducerType';
import { ExploreLoadType } from './ExploreLoadDefaults';
import { ExploreLoadActions } from './ExploreLoadActions';

const ExploreLoadReducer: ReducerType<ExploreLoadType, IReducerAction> = (
    state: ExploreLoadType,
    action: IReducerAction
) => {
    switch (action.type) {
        case ExploreLoadActions.SET_EXPLORE_LOADING:
            return { isExploreLoading: true };
        case ExploreLoadActions.SET_EXPLORE_LOADED:
            return { isExploreLoading: false };
        default:
            return state;
    }
};

export default ExploreLoadReducer;
