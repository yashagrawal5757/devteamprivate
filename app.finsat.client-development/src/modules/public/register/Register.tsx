import React from 'react';
import RegisterForm from './components/register-form/RegisterForm';
import useRegister from './hooks/useRegister';
// import { useTranslation } from 'react-i18next';

const Register = () => {
    const { onSubmit, navigateToLogin } = useRegister();
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
            <div className="bg-white flex w-full md:w-5/11 h-1/2 md:h-screen p-8 md:p-12 overflow-y-auto items-start">
                <div className="w-full mx-auto max-w-md px-4 md:px-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Join the CityL3ns platform
                    </h2>
                    <p className="mb-6 text-center text-sm">
                        Start your free trial.
                    </p>
                    <RegisterForm
                        onSubmit={({
                            name,
                            email,
                            password,
                            sector,
                            interest,
                            company,
                            surveys
                        }) =>
                            onSubmit(
                                name,
                                email,
                                password,
                                sector,
                                interest,
                                company,
                                surveys
                            )
                        }
                    />
                    <p className="mt-6 text-center text-sm text-accent">
                        Already have an account?{' '}
                        <a
                            href="#"
                            className="font-medium text-black hover:text-primary_hover"
                            onClick={navigateToLogin}
                        >
                            Login
                        </a>
                    </p>
                    <p className="mt-12 text-center text-sm text-accent w-full md:w-4/5 ml-auto mr-auto">
                        By signing up to create an account I accept Company's{' '}
                        <a
                            href="/privacy-policy"
                            target="_blank"
                            className="font-medium text-primary hover:text-primary_hover"
                        >
                            Terms of Use and Privacy Policy.
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
