import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../../../shared/types/ReducerType';
import { PropertiesSelectQueueType } from './PropertiesSelectQueueDefaults';
import { PropertiesSelectQueueActions } from './PropertiesSelectQueueActions';

const PropertiesSelectQueueReducer: ReducerType<
    Array<PropertiesSelectQueueType>,
    IReducerAction
> = (state: Array<PropertiesSelectQueueType>, action: IReducerAction) => {
    switch (action.type) {
        case PropertiesSelectQueueActions.INSERT_WATCHLIST:
            return [
                ...state,
                {
                    id: action.payload,
                    isSelectAllActive: false,
                    queue: []
                }
            ];
        case PropertiesSelectQueueActions.ADD_TO_QUEUE:
            return state.map((propertySelect) => {
                if (propertySelect.id === action.payload.watchlistId) {
                    propertySelect.queue = [
                        ...propertySelect.queue,
                        action.payload.variationId
                    ];
                }

                return propertySelect;
            });
        case PropertiesSelectQueueActions.REMOVE_FROM_QUEUE:
            return state.map((propertySelect) => {
                if (propertySelect.id === action.payload.watchlistId) {
                    propertySelect.queue = propertySelect.queue.filter(
                        (variationId) =>
                            variationId !== action.payload.variationId
                    );
                }

                return propertySelect;
            });
        case PropertiesSelectQueueActions.EMPTY_QUEUE:
            return state.map((propertySelect) => {
                if (propertySelect.id === action.payload) {
                    propertySelect.queue = [];
                }

                return propertySelect;
            });
        case PropertiesSelectQueueActions.TOGGLE_SELECT_ALL_VALUE:
            return state.map((propertySelect) => {
                if (propertySelect.id === action.payload) {
                    propertySelect.isSelectAllActive =
                        !propertySelect.isSelectAllActive;
                }

                return propertySelect;
            });
        case PropertiesSelectQueueActions.SET_SELECT_ALL_VALUE:
            return state.map((propertySelect) => {
                if (propertySelect.id === action.payload.watchlistId) {
                    propertySelect.isSelectAllActive =
                        action.payload.isSelectAllActive;
                }

                return propertySelect;
            });
        case PropertiesSelectQueueActions.REMOVE_WATCHLIST:
            return state.filter(
                (propertySelect) => propertySelect.id !== action.payload
            );
        case PropertiesSelectQueueActions.REMOVE_ALL_WATCHLISTS:
            return [];
        default:
            return state;
    }
};

export default PropertiesSelectQueueReducer;
