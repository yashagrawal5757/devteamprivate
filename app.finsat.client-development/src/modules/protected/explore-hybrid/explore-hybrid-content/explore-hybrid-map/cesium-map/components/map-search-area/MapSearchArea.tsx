import useLocationFrame from 'modules/protected/explore-hybrid/hooks/location-frame/useLocationFrame';
import React from 'react';

type MapSearchAreaProps = {
    onClick: () => void;
};

const MapSearchArea = ({ onClick }: MapSearchAreaProps) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const { locationFrame } = useLocationFrame();

    React.useEffect(() => {
        if (!locationFrame) {
            setIsVisible(false);
        }

        setIsVisible(true);
    }, [locationFrame]);

    return (
        <>
            {isVisible && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-white bg-opacity-50 p-2 rounded-full">
                    <button
                        className="px-3 py-2 text-white text-sm bg-gray-500 rounded-full shadow hover:bg-primary"
                        onClick={() => {
                            setIsVisible(false);
                            onClick();
                        }}
                    >
                        Search this area
                    </button>
                </div>
            )}
        </>
    );
};

export default MapSearchArea;
