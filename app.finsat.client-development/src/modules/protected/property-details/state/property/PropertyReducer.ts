import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../shared/types/ReducerType';
import { DetailedPropertyType } from './PropertyDefaults';
import { PropertyActions } from './PropertyActions';

const PropertyReducer: ReducerType<
    DetailedPropertyType | undefined,
    IReducerAction
> = (state: DetailedPropertyType | undefined, action: IReducerAction) => {
    switch (action.type) {
        case PropertyActions.SET_PROPERTY:
            return action.payload;
        case PropertyActions.CLEAR_PROPERTY:
            return undefined;
        default:
            return state;
    }
};

export default PropertyReducer;
