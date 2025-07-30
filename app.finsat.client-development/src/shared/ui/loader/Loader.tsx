import React from 'react';

const Loader = () => {
    return (
        <div
            className="absolute inset-0 bg-black bg-opacity-50 h-screen w-screen z-120"
            role="status"
        >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img
                    src="/logo-white.png"
                    alt="Loading"
                    className="w-8 h-8 animate-spin"
                />
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;
