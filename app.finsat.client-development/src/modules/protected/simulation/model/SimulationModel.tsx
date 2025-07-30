import React from 'react';
import BabylonJsScene from './BabylonJsScene';
import useSimulation from './hooks/useSimulation';
import SimulationMapActions from './components/simulation-map-actions/SimulationMapActions';
import SimulationControlsInfo from './components/simulation-controls-info/SimulationControlsInfo';

const SimulationModel = () => {
    const { displaySimulation } = useSimulation();

    return (
        <div className="relative w-full h-full">
            {/* <BabylonJsScene
                antialias
                onSceneReady={displaySimulation}
                onRender={undefined}
                id="simulation-canvas"
            /> */}
            <iframe
                src={'https://simulation.finsat.space'}
                width={'100%'}
                height={'100%'}
                allowFullScreen
                title="Simulation"
            ></iframe>
            <SimulationMapActions />
            <SimulationControlsInfo />
        </div>
    );
};

export default SimulationModel;
