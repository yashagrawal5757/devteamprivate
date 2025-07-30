import { Cartesian3, Cartographic, Math as CesiumMath } from 'cesium';
import { useCallback, useRef } from 'react';

const usePropertyPolygonRef = () => {
    const polygonShapeRefs = useRef(new Set());
    const polygonObsticleRefs = useRef(new Set());

    const addPolygonShapeRef = useCallback((child: any) => {
        polygonShapeRefs.current.add(child);
    }, []);

    const removePolygonShapeRef = useCallback((child: any) => {
        polygonShapeRefs.current.delete(child);
    }, []);

    const addPolygonObsticleRef = useCallback((child: any) => {
        polygonObsticleRefs.current.add(child);
    }, []);

    const removePolygonObsticleRef = useCallback((child: any) => {
        polygonObsticleRefs.current.delete(child);
    }, []);

    const getPolygonFootprint = (): Array<Array<[number, number]>> => {
        let shapes = Array.from(polygonShapeRefs.current).map((child: any) =>
            child.getState()
        );

        shapes = shapes.map((shape) => {
            return shape.map((cartesianFootprint: Cartesian3) => {
                const cartographic =
                    Cartographic.fromCartesian(cartesianFootprint);
                const longitude = CesiumMath.toDegrees(cartographic.longitude);
                const latitude = CesiumMath.toDegrees(cartographic.latitude);

                return [latitude, longitude];
            });
        });

        return shapes;
    };

    const getPolygons = (): [any, any] => {
        let shapes = Array.from(polygonShapeRefs.current).map((child: any) =>
            child.getState()
        );

        shapes = shapes.map((shape) => {
            return shape.map((cartesianFootprint: Cartesian3) => {
                const cartographic =
                    Cartographic.fromCartesian(cartesianFootprint);
                const longitude = CesiumMath.toDegrees(cartographic.longitude);
                const latitude = CesiumMath.toDegrees(cartographic.latitude);

                return [latitude, longitude];
            });
        });

        let obsticles = Array.from(polygonObsticleRefs.current).map(
            (child: any) => child.getState()
        );

        obsticles = obsticles.map((obsticle) => {
            return obsticle.map((cartesianFootprint: Cartesian3) => {
                const cartographic =
                    Cartographic.fromCartesian(cartesianFootprint);
                const longitude = CesiumMath.toDegrees(cartographic.longitude);
                const latitude = CesiumMath.toDegrees(cartographic.latitude);

                return [latitude, longitude];
            });
        });

        return [shapes, obsticles];
    };

    return {
        addPolygonShapeRef,
        removePolygonShapeRef,
        addPolygonObsticleRef,
        removePolygonObsticleRef,
        getPolygonFootprint,
        getPolygons
    };
};

export default usePropertyPolygonRef;
