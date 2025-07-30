import React from 'react';
import useLogin from './hooks/useLogin';
// import { useTranslation } from 'react-i18next'; translations to be added
import LoginForm from './components/login-form/LoginForm';

const Login = () => {
    const { onSubmit, navigateToRegister } = useLogin();
    // const { t } = useTranslation();

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
                        Welcome to FinSat
                    </h2>
                    <p className="mb-6 text-center text-sm">
                        Join our community and quickly indentify your blind
                        spots about climate risk today.
                    </p>
                    <LoginForm
                        onSubmit={({ email, password }) =>
                            onSubmit(email, password)
                        }
                    />
                    <p className="mt-6 text-center text-sm text-accent">
                        Don't have an account?{' '}
                        <a
                            href="#"
                            className="font-medium text-black hover:text-primary_hover"
                            onClick={navigateToRegister}
                        >
                            Register
                        </a>
                    </p>
                    <p className="mt-6 text-center text-sm text-accent">
                        <a
                            href="/legal-disclaimer"
                            target="_blank"
                            className="font-medium text-black hover:text-primary_hover"
                        >
                            Legal Disclaimer
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
