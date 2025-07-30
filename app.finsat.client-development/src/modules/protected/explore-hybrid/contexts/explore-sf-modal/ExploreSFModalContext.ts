import { ExploreSFModalType } from "@explore/explore-hybrid-content/explore-hybrid-map/state/explore-hybrid-sf-modal/ExploreSFModalDefaults";
import { IReducerAction } from "@models/IReducerAction";
import { createContext, Dispatch } from "react";

interface ExploreSFModalContextType {
    state: ExploreSFModalType;
    dispatch: Dispatch<IReducerAction>;
}

const ExploreSFModalContext = createContext<ExploreSFModalContextType>(
    {} as ExploreSFModalContextType
)

export default ExploreSFModalContext;