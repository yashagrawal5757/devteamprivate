import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../shared/types/ReducerType';
import { ExistingWatchlist } from './ExistingWatchlistsDefaults';
import { ExistingWatchlistsActions } from './ExistingWatchlistsActions';

const ExistingWatchlistsReducer: ReducerType<
    Array<ExistingWatchlist>,
    IReducerAction
> = (state: Array<ExistingWatchlist>, action: IReducerAction) => {
    switch (action.type) {
        case ExistingWatchlistsActions.SET_WATCHLISTS:
            return action.payload;
        default:
            return state;
    }
};

export default ExistingWatchlistsReducer;
