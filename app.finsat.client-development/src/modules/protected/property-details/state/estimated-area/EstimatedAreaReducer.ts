import ReducerType from "@custom-types/ReducerType";
import { IReducerAction } from "@models/IReducerAction";
import { EstimatedAreaActions } from "./EstimatedAreaActions";

const EstimatedAreaReducer: ReducerType<
    number | undefined,
    IReducerAction
> = (state: number | undefined, action: IReducerAction) => {
    switch (action.type) {
        case EstimatedAreaActions.SET_ESTIMATED_AREA:
            return action.payload;
        default:
            return state;
    }
}

export default EstimatedAreaReducer;