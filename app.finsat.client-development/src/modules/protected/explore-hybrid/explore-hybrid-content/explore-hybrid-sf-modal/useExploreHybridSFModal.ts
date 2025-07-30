import useExploreSFModalContext from "@explore/contexts/explore-sf-modal/useExploreSFModalContext"
import { ExploreSFModalActions } from "../explore-hybrid-map/state/explore-hybrid-sf-modal/ExploreSFModalActions";

const useExploreHybridSFModal = () => {
    const ExploreSFModalContext = useExploreSFModalContext();

    const openModal = (modalAction: boolean) => {
        ExploreSFModalContext.dispatch({
            type: ExploreSFModalActions.SHOW_MODAL,
            payload: modalAction
        });
    }

    const closeModal = () => {
        ExploreSFModalContext.dispatch({
            type: ExploreSFModalActions.SHOW_MODAL,
            payload: false
        })
    }

    return {
        exploreSFModal: ExploreSFModalContext.state,
        openModal,
        closeModal
    };
}

export default useExploreHybridSFModal;