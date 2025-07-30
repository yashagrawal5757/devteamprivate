import React from 'react';
import { MdOutlineFlood } from 'react-icons/md';
import useExploreMap from '../../../hooks/useExploreMap';

const MapSimulationActions = () => {
    const { showSimulationOverlay, toggleSimulationOverlay } = useExploreMap();

    return (
        <div className="absolute bottom-4 left-4 flex space-x-2 bg-white bg-opacity-50 p-2 rounded-full">
            <button
                className={`px-3 py-2 text-white bg-gray-500 rounded-full shadow hover:bg-primary ${showSimulationOverlay ? 'bg-primary' : 'bg-gray-500'}`}
                onClick={toggleSimulationOverlay}
            >
                <MdOutlineFlood />
            </button>
        </div>
    );
};

export default MapSimulationActions;
