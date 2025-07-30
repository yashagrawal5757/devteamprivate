import { SuccessActions } from '../../state/success/SuccessActions';
import useSuccessContext from '../contexts/success/useSuccessContext';

const useSuccess = () => {
    const successContext = useSuccessContext();

    const setSuccessMessage = (message: string): void => {
        successContext.dispatch({
            type: SuccessActions.SET_SUCCESS,
            payload: message
        });
    };

    const clearSuccessMessage = (): void => {
        successContext.dispatch({
            type: SuccessActions.CLEAR_SUCCESS
        });
    };

    return {
        success: successContext.state,
        setSuccessMessage,
        clearSuccessMessage
    };
};

export default useSuccess;
