import { Engine, Scene } from '@babylonjs/core';
import React, { useEffect, useRef } from 'react';
import SimulationMapActions from './components/simulation-map-actions/SimulationMapActions';

const BabylonJsScene = ({
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    ...rest
}: any) => {
    const reactCanvas = useRef(null);

    useEffect(() => {
        const { current: canvas } = reactCanvas;

        if (!canvas) return;

        const engine = new Engine(
            canvas,
            antialias,
            engineOptions,
            adaptToDeviceRatio
        );
        const scene = new Scene(engine, sceneOptions);
        if (scene.isReady()) {
            onSceneReady(scene);
        } else {
            scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
        }

        engine.runRenderLoop(() => {
            if (typeof onRender === 'function') onRender(scene);
            scene.render();
        });

        const resize = () => {
            scene.getEngine().resize();
        };

        if (window) {
            window.addEventListener('resize', resize);
        }

        return () => {
            scene.getEngine().dispose();

            if (window) {
                window.removeEventListener('resize', resize);
            }
        };
    }, [
        antialias,
        engineOptions,
        adaptToDeviceRatio,
        sceneOptions,
        onRender,
        onSceneReady
    ]);

    return (
        <>
            <canvas className="w-full h-full" ref={reactCanvas} {...rest} />
            <SimulationMapActions />
        </>
    );
};

export default BabylonJsScene;
