import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../shared/types/ReducerType';
import { LocationFrameActions } from './LocationFrameActions';
import { LocationFrameType } from './LocationFrameDefaults';

const LocationFrameReducer: ReducerType<
    LocationFrameType | undefined,
    IReducerAction
> = (state: LocationFrameType | undefined, action: IReducerAction) => {
    switch (action.type) {
        case LocationFrameActions.SET_FRAME:
            return action.payload;
        case LocationFrameActions.CLEAR_FRAME:
            return undefined;
        default:
            return state;
    }
};

export default LocationFrameReducer;
