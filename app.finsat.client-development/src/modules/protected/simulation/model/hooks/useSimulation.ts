import { ArcRotateCamera, Scene, SceneLoader, Vector3 } from '@babylonjs/core';

const useSimulation = () => {
    const displaySimulation = (scene: Scene) => {
        const camera = new ArcRotateCamera(
            'camera1',
            Math.PI / 2,
            Math.PI / 4,
            10,
            Vector3.Zero(),
            scene
        );

        const canvas = scene.getEngine().getRenderingCanvas();

        camera.attachControl(canvas, true);

        SceneLoader.LoadAssetContainer(
            '',
            'scene.babylon',
            scene,
            function (container) {
                container.addAllToScene();

                container.meshes.forEach((mesh) => {
                    mesh.animations.forEach((animation) => {
                        scene.beginAnimation(
                            mesh,
                            0,
                            animation.getKeys()[animation.getKeys().length - 1]
                                .frame,
                            true
                        );
                    });
                });
            },
            null,
            (_, message) => {
                console.error('Failed to load scene:', message);
            }
        );
    };

    return { displaySimulation };
};

export default useSimulation;
