import HybridPaginationDefaults, {
    HybridPaginationType
} from './HybridPaginationDefaults';
import { HybridPaginationActions } from './HybridPaginationActions';
import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '@custom-types/ReducerType';

const HybridPaginationReducer: ReducerType<
    HybridPaginationType,
    IReducerAction
> = (state: HybridPaginationType, action: IReducerAction) => {
    switch (action.type) {
        case HybridPaginationActions.SET_PAGINATION:
            return action.payload;
        case HybridPaginationActions.RESET_PAGINATION:
            return HybridPaginationDefaults;
        default:
            return state;
    }
};

export default HybridPaginationReducer;
