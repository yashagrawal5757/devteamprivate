import React, { useEffect } from 'react';
import ResetPasswordForm from './components/reset-password-form/ResetPasswordForm';
import useResetPassword from './hooks/useResetPassword';
import useLoading from '@hooks/useLoading';

const ResetPassword = () => {
    const {
        tokenVerification,
        getToken,
        navigateToLogin,
        onSubmit,
        onVerifyToken
    } = useResetPassword();
    const loading = useLoading();

    useEffect(() => {
        const token = getToken();

        if (!token) {
            return;
        }

        onVerifyToken(token);
    }, []);

    const VerifyToken = () => {
        return (
            <>
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Please wait
                </h2>
                <p className="mb-6 text-center">
                    Please wait while we verify your token
                </p>
            </>
        );
    };

    const TokenExpire = () => {
        return (
            <>
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Please wait
                </h2>
                <p className="mb-6 text-center">Your token has expired</p>
            </>
        );
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="text-white flex items-center justify-center w-full md:w-6/11 h-1/2 md:h-screen p-8 md:p-12 bg-primary">
                <div className="text-center w-full md:w-1/2">
                    <img
                        src="logo.png"
                        alt="FinSat Logo"
                        className="mx-auto mb-4 w-40 md:w-full h-auto"
                    />
                </div>
            </div>
            <div className="bg-white flex items-center justify-center w-full md:w-5/11 h-1/2 md:h-screen p-8 md:p-12">
                <div className="w-full max-w-md px-4 md:px-8">
                    {loading.loading.isLoading && <VerifyToken />}
                    {tokenVerification ? (
                        <>
                            <h2 className="text-2xl font-bold mb-6 text-center">
                                Reset Password
                            </h2>
                            <p className="mb-6 text-center">
                                Please enter your new password.
                            </p>
                            <ResetPasswordForm
                                onSubmit={({ password }) =>
                                    onSubmit(password, getToken() ?? '')
                                }
                            />
                            <p className="mt-6 text-center text-sm text-accent">
                                Back to{' '}
                                <a
                                    href="#"
                                    className="font-medium text-black hover:text-primary_hover"
                                    onClick={navigateToLogin}
                                >
                                    Login
                                </a>
                            </p>
                        </>
                    ) : (
                        <TokenExpire />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
