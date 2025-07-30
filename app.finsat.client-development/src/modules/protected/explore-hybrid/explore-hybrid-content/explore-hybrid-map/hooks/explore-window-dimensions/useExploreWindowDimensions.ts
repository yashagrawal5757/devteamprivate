import { useEffect, useState } from "react";
import { CesiumComponentRef } from "resium";
import {
    Viewer as CesiumViewer,
} from 'cesium';

const useExploreWindowDimensions = (viewerRef: React.RefObject<CesiumComponentRef<CesiumViewer> | null>) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const updateDimensions = () => {
        const viewer = viewerRef.current?.cesiumElement;
        setDimensions({
            width: viewer?.canvas?.width ?? 0,
            height: viewer?.canvas?.height ?? 0,
        });
    };

    useEffect(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [viewerRef.current]);

    return { dimensions, updateDimensions };
};

export default useExploreWindowDimensions;