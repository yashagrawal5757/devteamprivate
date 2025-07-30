import useWarningContext from '@contexts/warning/useWarningContext';
import { WarningActions } from '@state/warning/WarningActions';

const useWarning = () => {
    const warningContext = useWarningContext();

    const setWarningMessage = (message: string): void => {
        warningContext.dispatch({
            type: WarningActions.SET_WARNING,
            payload: message
        });
    };

    const clearWarningMessage = (): void => {
        warningContext.dispatch({
            type: WarningActions.CLEAR_WARNING
        });
    };

    return {
        warning: warningContext.state,
        setWarningMessage,
        clearWarningMessage
    };
};

export default useWarning;
