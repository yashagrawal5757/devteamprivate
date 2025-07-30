import React from 'react';
import SimulationDataOutput from './data-output/SimulationDataOutput';
import SimulationModel from './model/SimulationModel';

const Simulation = () => {
    return (
        <div className="h-full w-full flex flex-row">
            <div className="w-3/10">
                <SimulationDataOutput />
            </div>
            <div className="w-7/10">
                <SimulationModel />
            </div>
        </div>
    );
};

export default Simulation;
