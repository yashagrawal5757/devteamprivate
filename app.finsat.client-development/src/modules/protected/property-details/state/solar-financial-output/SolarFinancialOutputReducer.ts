import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../shared/types/ReducerType';
import { SolarFinancialOutputType } from './SolarFinancialOutputDefaults';
import { SolarFinancialOutputActions } from './SolarFinancialOutputActions';

const SolarFinancialOutputReducer: ReducerType<
    SolarFinancialOutputType | undefined,
    IReducerAction
> = (state: SolarFinancialOutputType | undefined, action: IReducerAction) => {
    switch (action.type) {
        case SolarFinancialOutputActions.SET_SOLAR_FINANCIAL_CALCULATIONS:
            return {
                predictions: action.payload.predictions,
                input: action.payload.input
            };
        default:
            return state;
    }
};

export default SolarFinancialOutputReducer;
