import ReducerType from "@custom-types/ReducerType";
import { ExploreSFModalType } from "./ExploreSFModalDefaults";
import { IReducerAction } from "@models/IReducerAction";
import { ExploreSFModalActions } from "./ExploreSFModalActions";

const ExploreSFModalReducer: ReducerType<
    ExploreSFModalType,
    IReducerAction
> = (state: ExploreSFModalType, action: IReducerAction) => {
    switch (action.type) {
        case ExploreSFModalActions.SHOW_MODAL:
            return { ...state, displayModal: action.payload }
        case ExploreSFModalActions.HIDE_MODAL:
            return { ...state, displayModal: false }
        default:
            return state;
    }
}

export default ExploreSFModalReducer;