import ReducerType from '@custom-types/ReducerType';
import { Property } from './PropertiesDefaults';
import { IReducerAction } from '@models/IReducerAction';
import { PropertiesActions } from './PropertiesActions';

const PropertiesReducer: ReducerType<Array<Property>, IReducerAction> = (
    state: Array<Property>,
    action: IReducerAction
) => {
    switch (action.type) {
        case PropertiesActions.SET_PROPERTIES:
            return action.payload;
        case PropertiesActions.APPEND_PROPERTIES:
            return [...state, ...action.payload];
        case PropertiesActions.CLEAR_PROPERTIES:
            return [];
        default:
            return state;
    }
};

export default PropertiesReducer;
