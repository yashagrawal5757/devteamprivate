import { useState } from "react";

const useWindowDimensions = () => {
    const [dimensions, setDimensions] = useState({
        height: document.getElementById('map-section')?.clientHeight ?? 0,
            width: document.getElementById('map-section')?.clientWidth ?? 0
    });

    const handleResize = () => {
        setDimensions({
            height: document.getElementById('map-section')?.clientHeight ?? 0,
            width: document.getElementById('map-section')?.clientWidth ?? 0
        });
    }

    return { dimensions, handleResize };
}

export default useWindowDimensions;