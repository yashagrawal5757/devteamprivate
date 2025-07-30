import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../../../shared/types/ReducerType';
import { UserLocationActions } from './UserLocationActions';
import { UserLocation } from './UserLocationDefaults';

const UserLocationReducer: ReducerType<
    UserLocation | undefined,
    IReducerAction
> = (state: UserLocation | undefined, action: IReducerAction) => {
    switch (action.type) {
        case UserLocationActions.SET_LOCATION:
            return action.payload;
        case UserLocationActions.CLEAR_LOCATION:
            return undefined;
        default:
            return state;
    }
};

export default UserLocationReducer;
