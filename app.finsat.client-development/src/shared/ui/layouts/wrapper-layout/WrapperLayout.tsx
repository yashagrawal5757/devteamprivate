import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useError from '../../../hooks/useError';
import Toast from '../../toast/Toast';
import useSuccess from '../../../hooks/useSuccess';
import useLoading from '../../../hooks/useLoading';
import Loader from '../../loader/Loader';
import useWarning from '@hooks/useWarning';

const AlertWrapperLayout = () => {
    const { error, clearErrorMessage } = useError();
    const { success, clearSuccessMessage } = useSuccess();
    const { warning, clearWarningMessage } = useWarning();
    const { loading } = useLoading();

    useEffect(() => {
        if (error.isError) {
            const errorTimeout = setTimeout(() => {
                clearErrorMessage();
            }, 5000);

            return () => clearTimeout(errorTimeout);
        }

        if (success.isSuccess) {
            const successTimeout = setTimeout(() => {
                clearSuccessMessage();
            }, 5000);

            return () => clearTimeout(successTimeout);
        }

        if (warning.isWarning) {
            const warningTimeout = setTimeout(() => {
                clearWarningMessage();
            }, 5000);

            return () => clearTimeout(warningTimeout);
        }
    }, [error, success, warning]);

    return (
        <div>
            {loading.isLoading && <Loader />}
            {error.isError && (
                <Toast
                    text={error.message}
                    type="error"
                    onClose={clearErrorMessage}
                />
            )}
            {success.isSuccess && (
                <Toast
                    text={success.message}
                    type="success"
                    onClose={clearSuccessMessage}
                />
            )}
            {warning.isWarning && (
                <Toast
                    text={warning.message}
                    type="warning"
                    onClose={clearWarningMessage}
                />
            )}
            <Outlet />
        </div>
    );
};

export default AlertWrapperLayout;
