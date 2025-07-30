import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../shared/types/ReducerType';
import { DashboardDataType } from './DashboardDefaults';
import { DashboardActions } from './DashboardActions';

const DashboardReducer: ReducerType<DashboardDataType, IReducerAction> = (
    state: DashboardDataType,
    action: IReducerAction
) => {
    switch (action.type) {
        case DashboardActions.SET_DASHBOARD_DATA:
            return {
                annualPredictions: action.payload.annualPredictions,
                monthlyPredictions: action.payload.monthlyPredictions,
                cashFlowPredictions: action.payload.cashFlowPredictions
            };
        default:
            return state;
    }
};

export default DashboardReducer;
