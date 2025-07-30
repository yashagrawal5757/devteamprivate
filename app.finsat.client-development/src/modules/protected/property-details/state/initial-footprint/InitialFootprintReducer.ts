import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../shared/types/ReducerType';
import { InitialFootprintType } from './InitialFootprintDefaults';
import { InitialFootprintActions } from './InitialFootprintActions';

const InitialFootprintReducer: ReducerType<
    InitialFootprintType,
    IReducerAction
> = (state: InitialFootprintType, action: IReducerAction) => {
    switch (action.type) {
        case InitialFootprintActions.SET_INITIAL_FOOTPRINT:
            return { footprint: action.payload };
        default:
            return state;
    }
};

export default InitialFootprintReducer;
