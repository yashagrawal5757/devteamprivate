import useExploreFootprintContext from "../../contexts/explore-footprint/useExploreFootprintContext";
import { ExploreEditorActions } from "../../state/explore-editor/ExploreEditorAction";

const useExploreFootprint = () => {
    const exploreFootprintContext = useExploreFootprintContext();

    const setExploreFootprint = (id: string | undefined = undefined, footprint: Array<[number, number]>) => {
        let payload: any = { id: id, data: footprint };
        exploreFootprintContext.dispatch({
            type: ExploreEditorActions.SET_EXPLORE_FOOTPRINT,
            payload: payload
        })
    };

    const updateExploreFootprintById = (
        id: string,
        footprint: Array<[number, number]>
    ) => {
        let payload: any = { id: id, data: footprint };
        exploreFootprintContext.dispatch({
            type: ExploreEditorActions.UPDATE_EXPLORE_FOOTPRINT_BY_ID,
            payload: payload
        });
    }

    const removeExploreFootprintById = (
        id: string
    ): void => {
        exploreFootprintContext.dispatch({
            type: ExploreEditorActions.REMOVE_EXPLORE_FOOTPRINT_BY_ID,
            payload: id
        });
    }


    const clearExploreFootprint = (): void => {
        exploreFootprintContext.dispatch({
            type: ExploreEditorActions.CLEAR_EXPLORE_FOOTPRINT
        });
    };

    return {
        footprint: exploreFootprintContext.state,
        setExploreFootprint,
        updateExploreFootprintById,
        removeExploreFootprintById,
        clearExploreFootprint
    };
}

export default useExploreFootprint;