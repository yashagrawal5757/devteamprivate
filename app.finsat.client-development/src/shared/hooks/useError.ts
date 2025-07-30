import { AxiosError } from 'axios';
import { ErrorActions } from '../../state/error/ErrorActions';
import useErrorContext from '../contexts/error/useErrorContext';

const useError = () => {
    const errorContext = useErrorContext();

    const parseAndSetErrorMessage = (error: AxiosError): void => {
        if (error.response) {
            setErrorMessage(`${error.response.data}`);

            return;
        }

        setErrorMessage(error.message);
    };

    const setErrorMessage = (message: string): void => {
        errorContext.dispatch({
            type: ErrorActions.SET_ERROR,
            payload: message
        });
    };

    const clearErrorMessage = (): void => {
        errorContext.dispatch({
            type: ErrorActions.CLEAR_ERROR
        });
    };

    return {
        error: errorContext.state,
        setErrorMessage,
        clearErrorMessage,
        parseAndSetErrorMessage
    };
};

export default useError;
