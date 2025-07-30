import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../shared/types/ReducerType';
import { DestinationLookupActions } from './DestinationLookupActions';
import { DestinationCoordinates } from './DestinationLookupDefaults';

const DestinationLookupReducer: ReducerType<
    DestinationCoordinates | undefined,
    IReducerAction
> = (state: DestinationCoordinates | undefined, action: IReducerAction) => {
    switch (action.type) {
        case DestinationLookupActions.SET_DESTINATION:
            return action.payload;
        case DestinationLookupActions.CLEAR_DESTINATION:
            return undefined;
        default:
            return state;
    }
};

export default DestinationLookupReducer;
