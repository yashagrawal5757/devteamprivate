import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../shared/types/ReducerType';
import { PowerUnitType } from './PowerUnitDefaults';
import { PowerUnitActions } from './PowerUnitActions';

const PowerUnitReducer: ReducerType<PowerUnitType, IReducerAction> = (
    state: PowerUnitType,
    action: IReducerAction
) => {
    switch (action.type) {
        case PowerUnitActions.SET_POWER_UNIT:
            return action.payload;
        default:
            return state;
    }
};

export default PowerUnitReducer;
