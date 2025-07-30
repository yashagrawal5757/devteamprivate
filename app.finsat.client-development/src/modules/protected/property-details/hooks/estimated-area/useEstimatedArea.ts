import useEstimatedAreaContext from "../../contexts/estimated-area/useEstimatedAreaContext";
import { EstimatedAreaActions } from "../../state/estimated-area/EstimatedAreaActions";

const useEstimatedArea = () => {
    const estimatedAreaContext = useEstimatedAreaContext();

    const setEstimatedArea = (estimatedArea: number) => {
        estimatedAreaContext.dispatch({
            type: EstimatedAreaActions.SET_ESTIMATED_AREA,
            payload: estimatedArea
        })
    };

    return {
        estimatedArea: estimatedAreaContext.state,
        setEstimatedArea
    }
}

export default useEstimatedArea;