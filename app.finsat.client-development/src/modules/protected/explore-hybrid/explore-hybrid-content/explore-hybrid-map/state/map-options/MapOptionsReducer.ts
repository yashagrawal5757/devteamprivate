import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../../../shared/types/ReducerType';
import { MapOptionsActions } from './MapOptionsActions';
import MapOptionsDefaults from './MapOptionsDefaults';
import MapStorageService, {
    MapOptionsType
} from '../../services/map.storage.service';

const MapOptionsReducer: ReducerType<MapOptionsType, IReducerAction> = (
    state: MapOptionsType,
    action: IReducerAction
) => {
    switch (action.type) {
        case MapOptionsActions.SET_OPTIONS:
            const updatedState = { ...state, ...action.payload };
            MapStorageService.setMapOptions(updatedState);
            return updatedState;
        case MapOptionsActions.CLEAR_OPTIONS:
            return MapOptionsDefaults;
        default:
            return state;
    }
};

export default MapOptionsReducer;
