import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../../../shared/types/ReducerType';
import { SimulationDataActions } from './SimulationDataActions';
import { SimulationData } from './SimulationDataDefaults';

const SimulationDataReducer: ReducerType<
    Array<SimulationData>,
    IReducerAction
> = (state: Array<SimulationData>, action: IReducerAction) => {
    switch (action.type) {
        case SimulationDataActions.SET_SIMULATIONS_DATA:
            return action.payload;
        default:
            return state;
    }
};

export default SimulationDataReducer;
