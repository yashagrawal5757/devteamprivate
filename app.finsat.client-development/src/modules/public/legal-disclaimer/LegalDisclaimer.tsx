import React from 'react';

const LegalDisclaimer = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <img
                src="/logo-black.png"
                alt="Logo"
                className="mx-auto mb-12 mt-6 w-36 h-auto"
            />
            <div className="bg-white shadow-lg rounded-lg max-w-4xl p-8">
                <h1 className="text-2xl font-bold mb-4">Legal Disclaimer</h1>
                <h2 className="text-xl font-bold mb-4">FinSat Inc.</h2>
                <p className="mt-4">224 W 35th St.</p>
                <p>New York, NY</p>
                <p>10001</p>
                <p className="mt-4">Email: info@finsat.space</p>
                <p>Web: finsat.space</p>
                <p className="mt-4">
                    Legal domicile of the company: Delaware (USA)
                </p>
                <p>Commercial Register-Nr.: 7677608</p>
            </div>
        </div>
    );
};

export default LegalDisclaimer;
