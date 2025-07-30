import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../shared/types/ReducerType';
import { SolarEstimateInputActions } from './SolarEstimateInputActions';
import { SolarEstimateInputType } from './SolarEstimateInputDefaults';

const SolarEstimateInputReducer: ReducerType<
    SolarEstimateInputType,
    IReducerAction
> = (state: SolarEstimateInputType, action: IReducerAction) => {
    switch (action.type) {
        case SolarEstimateInputActions.SET_SOLAR_PANEL_INPUTS:
            return { ...state, solarPanelMetrics: action.payload };
        case SolarEstimateInputActions.SET_FINANCIAL_INPUTS:
            return { ...state, financialMetrics: action.payload };
        default:
            return state;
    }
};

export default SolarEstimateInputReducer;
