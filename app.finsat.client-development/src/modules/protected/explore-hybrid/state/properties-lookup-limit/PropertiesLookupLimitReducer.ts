import ReducerType from '@custom-types/ReducerType';
import { IReducerAction } from '@models/IReducerAction';
import { PropertiesLookupLimit } from './PropertiesLookupLimitDefaults';
import { PropertiesLookupLimitActions } from './PropertiesLookupLimitActions';

const PropertiesLookupLimitReducer: ReducerType<
    PropertiesLookupLimit,
    IReducerAction
> = (state: PropertiesLookupLimit, action: IReducerAction) => {
    switch (action.type) {
        case PropertiesLookupLimitActions.SET_LOAD_MORE:
            return { isLoadMore: action.payload };
        default:
            return state;
    }
};

export default PropertiesLookupLimitReducer;
