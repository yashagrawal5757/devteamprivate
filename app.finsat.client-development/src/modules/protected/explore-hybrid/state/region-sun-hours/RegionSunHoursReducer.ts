import ReducerType from '@custom-types/ReducerType';
import { IReducerAction } from '@models/IReducerAction';
import { RegionSunHours } from './RegionSunHoursDefaults';
import { RegionSunHoursActions } from './RegionSunHoursActions';

const RegionSunHoursReducer: ReducerType<RegionSunHours, IReducerAction> = (
    state: RegionSunHours,
    action: IReducerAction
) => {
    switch (action.type) {
        case RegionSunHoursActions.SET_REGION_SUN_HOURS:
            return action.payload;
        default:
            return state;
    }
};

export default RegionSunHoursReducer;
