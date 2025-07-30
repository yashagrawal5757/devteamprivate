import { IReducerAction } from "@models/IReducerAction";
import { ExploreFootprint } from "../../state/explore-footprint/ExploreFootprintDefaults";
import { createContext } from "react";

interface ExploreFootprintContextType {
    state: ExploreFootprint;
    dispatch: React.Dispatch<IReducerAction>;
}

const ExploreFootprintContext = createContext<ExploreFootprintContextType>(
    {} as ExploreFootprintContextType
);

export default ExploreFootprintContext;