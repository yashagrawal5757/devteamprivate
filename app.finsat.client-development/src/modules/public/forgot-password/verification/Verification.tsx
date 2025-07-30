import React from 'react';

const Verification = () => {
    return (
        <div>
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
                            Forgotten your password?
                        </h2>
                        <p className="mb-6 text-center">
                            We have sent you a link to reset your password via
                            the email address you provided.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verification;
