import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../../../shared/types/ReducerType';
import { ShowSimulationAreaOnMapActions } from './ShowSimulationAreaOnMapActions';
import MapStorageService from '../../services/map.storage.service';

const ShowSimulationAreaOnMapReducer: ReducerType<boolean, IReducerAction> = (
    state: boolean,
    action: IReducerAction
) => {
    switch (action.type) {
        case ShowSimulationAreaOnMapActions.SET_SHOW_SIMULATION:
            MapStorageService.setShowSimulationAreasOption(action.payload);
            return action.payload;
        case ShowSimulationAreaOnMapActions.TOGGLE_SHOW_SIMULATION:
            MapStorageService.setShowSimulationAreasOption(!state);
            return !state;
        default:
            return state;
    }
};

export default ShowSimulationAreaOnMapReducer;
