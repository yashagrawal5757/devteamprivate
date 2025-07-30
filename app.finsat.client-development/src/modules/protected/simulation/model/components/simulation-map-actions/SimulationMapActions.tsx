import React from 'react';
import useSimulationMapActions from './hooks/useSimulationMapActions';

const SimulationMapActions = () => {
    const { navigateToDashboard } = useSimulationMapActions();

    return (
        <div className="absolute top-4 right-4 flex space-x-2 bg-white bg-opacity-50 rounded-full">
            <button
                className={`px-4 py-2 text-white bg-gray-500 rounded-full shadow ${false ? 'bg-transparent' : 'bg-gray-500'}`}
                onClick={navigateToDashboard}
            >
                Return to map
            </button>
        </div>
    );
};

export default SimulationMapActions;
