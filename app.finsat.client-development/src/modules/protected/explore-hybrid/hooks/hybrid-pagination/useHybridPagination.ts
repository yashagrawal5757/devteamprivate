import useHybridPaginationContext from '../../contexts/hybrid-pagination/useHybridPaginationContext';
import { HybridPaginationActions } from '../../state/hybrid-pagination/HybridPaginationActions';
import { HybridPaginationType } from '../../state/hybrid-pagination/HybridPaginationDefaults';

const useHybridPagination = () => {
    const context = useHybridPaginationContext();

    const setPagination = (pagination: HybridPaginationType): void => {
        context.dispatch({
            type: HybridPaginationActions.SET_PAGINATION,
            payload: pagination
        });
    };

    return {
        pagination: context.state,
        setPagination
    };
};

export default useHybridPagination;
