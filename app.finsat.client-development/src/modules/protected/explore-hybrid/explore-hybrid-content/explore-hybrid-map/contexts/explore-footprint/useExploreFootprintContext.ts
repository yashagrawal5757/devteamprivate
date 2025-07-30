import { useContext } from "react";
import createDataContext from "@contexts/createDataContext";
import ExploreFootprintReducer from "../../state/explore-footprint/ExploreFootprintReducer";
import ExploreFootprintContext from "./ExploreFootprintContext";
import ExploreFootprintDefaults from "../../state/explore-footprint/ExploreFootprintDefaults";

export const ExploreFootprintContextProvider = createDataContext(
    ExploreFootprintReducer,
    ExploreFootprintDefaults,
    ExploreFootprintContext
);

export default function useExploreFootprintContext () {
    return useContext(ExploreFootprintContext);
}