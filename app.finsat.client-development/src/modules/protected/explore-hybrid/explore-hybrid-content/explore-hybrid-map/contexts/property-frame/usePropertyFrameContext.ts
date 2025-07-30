import PropertyFrameReducer from "../../state/property-frame/PropertyFrameReducer";
import PropertyFrameDefaults from "../../state/property-frame/PropertyFrameDefaults";
import PropertyFrameContext from "./PropertyFrameContext";
import createDataContext from "@contexts/createDataContext";
import { useContext } from "react";

export const PropertyFrameContextProvider = createDataContext(
    PropertyFrameReducer,
    PropertyFrameDefaults,
    PropertyFrameContext
);

export default function usePropertyFrameContext() {
    return useContext(PropertyFrameContext);
};