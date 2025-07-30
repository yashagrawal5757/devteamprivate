import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../shared/types/ReducerType';
import { WarningActions } from './WarningActions';
import { WarningType } from './WarningDefaults';

const WarningReducer: ReducerType<WarningType, IReducerAction> = (
    state: WarningType,
    action: IReducerAction
) => {
    switch (action.type) {
        case WarningActions.SET_WARNING:
            return { isWarning: true, message: action.payload };
        case WarningActions.CLEAR_WARNING:
            return { isWarning: false, message: '' };
        default:
            return state;
    }
};

export default WarningReducer;
