import React from 'react';
import useForgotPasswordEmail from './hooks/useForgotPasswordEmail';
import ForgotPasswordEmailForm from './components/forgot-password-email-form/ForgotPasswordEmailForm';

const ForgotPasswordEmail = () => {
    const { navigateToLogin, onSubmit } = useForgotPasswordEmail();

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
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Forgot Password
                    </h2>
                    <p className="mb-6 text-center">
                        Please enter your email address, so we can send you the
                        verification link for reseting password.
                    </p>
                    <ForgotPasswordEmailForm
                        onSubmit={({ email }) => onSubmit(email)}
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
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordEmail;
