import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../shared/types/ReducerType';
import { WaitlistUsersActions } from './WaitlistUsersActions';
import { WaitlistUsersType } from './WaitlistUsersDefaults';

const WaitlistUsersReducer: ReducerType<WaitlistUsersType[], IReducerAction> = (
    state: WaitlistUsersType[],
    action: IReducerAction
) => {
    switch (action.type) {
        case WaitlistUsersActions.SET_USERS:
            return action.payload;
        case WaitlistUsersActions.CLEAR_USERS:
            return [];
        case WaitlistUsersActions.CLEAR_USER:
            return state.filter(
                (waitlistUser) => waitlistUser.id !== action.payload.id
            );
        default:
            return state;
    }
};

export default WaitlistUsersReducer;
