import React, { useEffect, useState } from 'react';

const PropertyEditorAILoading = () => {
    const [messageIndex, setMessageIndex] = useState(0);
    const [dots, setDots] = useState('');

    const messages = [
        'Getting things ready.',
        'Fetching the data.',
        'Almost there.',
        'Just a moment.',
        'Preparing the results.'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setDots('');

        const dotInterval = setInterval(() => {
            setDots((prevDots) => {
                if (prevDots.length < 3) {
                    return prevDots + '.';
                }
                return prevDots;
            });
        }, 500);

        return () => clearInterval(dotInterval);
    }, [messageIndex]);

    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 h-full w-full z-[99999]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <p className="text-white text-lg font-semibold">
                    {/* {messages[messageIndex]}
                    {dots} */}
                    <img src="/ai-processing.svg" alt="Processing AI" />

                </p>
            </div>
        </div>
    );
};

export default PropertyEditorAILoading;
