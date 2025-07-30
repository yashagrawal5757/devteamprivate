import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../shared/types/ReducerType';
import { SolarGenerationOutputType } from './SolarGenerationOutputDefaults';
import { SolarGenerationOutputActions } from './SolarGenerationOutputActions';

const SolarGenerationOutputReducer: ReducerType<
    SolarGenerationOutputType | undefined,
    IReducerAction
> = (state: SolarGenerationOutputType | undefined, action: IReducerAction) => {
    switch (action.type) {
        case SolarGenerationOutputActions.SET_SOLAR_GENERATION_CALCULATIONS:
            return {
                hmac: action.payload.hmac,
                monthlyMetrics: action.payload.monthlyMetrics,
                annualMetrics: action.payload.annualMetrics,
                overallMetrics: action.payload.overallMetrics,
                predictedMetrics: action.payload.predictedMetrics
            };
        default:
            return state;
    }
};

export default SolarGenerationOutputReducer;
