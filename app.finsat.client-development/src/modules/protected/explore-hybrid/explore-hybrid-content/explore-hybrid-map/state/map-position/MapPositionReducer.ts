import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../../../shared/types/ReducerType';
import { MapPositionActions } from './MapPositionActions';
import MapStorageService, {
    MapPositionType
} from '../../services/map.storage.service';

const MapPositionReducer: ReducerType<
    MapPositionType | undefined,
    IReducerAction
> = (state: MapPositionType | undefined, action: IReducerAction) => {
    switch (action.type) {
        case MapPositionActions.SET_POSITION:
            MapStorageService.setMapPosition(action.payload);
            return action.payload;
        default:
            return state;
    }
};

export default MapPositionReducer;
