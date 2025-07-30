import React from 'react';
import useWaitlist from './hooks/useWaitlist';

const Waitlist = () => {
    const { navigateToLogin } = useWaitlist();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <img
                src="/logo-black.png"
                alt="Logo"
                className="mx-auto mb-16 mt-6 w-36 h-auto"
            />
            <div className="bg-white shadow-lg rounded-lg max-w-4xl p-16 w-3/4 text-center">
                <h1 className="text-2xl font-bold mb-4">Welcome to FinSat</h1>
                <p className="mb-4 mt-8">Thank you for joining us!</p>
                <p className="mb-4">You are successfully registered.</p>
                {/* <p className="mb-4 mt-8">Thank you for joining our waitlist!</p>
                <p className="mb-4">We will notify you as soon as possible.</p> */}
                <p className="mt-12">
                    Return to{' '}
                    <a
                        href="#"
                        onClick={navigateToLogin}
                        className="font-medium text-primary hover:text-primary_hover"
                    >
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Waitlist;
