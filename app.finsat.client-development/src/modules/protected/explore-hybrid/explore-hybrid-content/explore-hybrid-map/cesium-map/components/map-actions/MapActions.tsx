import React, { MutableRefObject, useEffect, useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import { GrSatellite } from 'react-icons/gr';
import { SlLayers } from 'react-icons/sl';
import { VscZoomIn, VscZoomOut } from 'react-icons/vsc';
import { CesiumComponentRef } from 'resium';
import { Viewer as CesiumViewer } from 'cesium';
import useExploreMap from '../../../hooks/useExploreMap';
import {
    MapPerspective,
    MapRenderType,
    MapTerrainType
} from '../../../services/map.storage.service';

type MapActionsProps = {
    mapViewerRef:
        | CesiumComponentRef<CesiumViewer>
        | null
        | MutableRefObject<CesiumComponentRef<CesiumViewer> | null>;
};

const MapActions = ({ mapViewerRef }: MapActionsProps) => {
    const {
        mapOptions,
        userLocation,
        setPhotorealistic,
        setNormal,
        setThreeDimensional,
        setTwoDimensional,
        setStreet,
        setSatellite,
        zoomIn,
        zoomOut,
        activateUserLocation,
        deactivateUserLocation
    } = useExploreMap();

    const [isLayerButtonActive, setLayerButtonActive] =
        useState<boolean>(false);
    const [is3dButtonActive, set3dButtonActive] = useState<boolean>(false);
    const [isTerrainButtonActive, setTerrainButtonActive] =
        useState<boolean>(false);
    const [isUserLocationButtonActive, setIsUserLocationButtonActive] =
        useState<boolean>(false);
    const [is3dButtonDisabled, set3dButtonDisabled] = useState<boolean>(false);
    const [isTerrainButtonDisabled, setTerrainButtonDisabled] =
        useState<boolean>(false);

    useEffect(() => {
        setLayerButtonActive(
            mapOptions.renderType === MapRenderType.PHOTOREALISTIC
        );
        setTerrainButtonActive(
            mapOptions.terrainType === MapTerrainType.SATELLITE
        );
        set3dButtonActive(
            mapOptions.perspective === MapPerspective.THREE_DIMENSION &&
                mapOptions.renderType === MapRenderType.NORMAL
        );

        set3dButtonDisabled(
            mapOptions.renderType === MapRenderType.PHOTOREALISTIC
        );
        setTerrainButtonDisabled(
            mapOptions.renderType === MapRenderType.PHOTOREALISTIC
        );
    }, [mapOptions]);

    useEffect(() => {
        setIsUserLocationButtonActive(userLocation !== undefined);
    }, [userLocation]);

    const handleLayerType = (isActive: boolean) => {
        if (isActive) {
            setPhotorealistic();
            return;
        }

        setNormal();
    };

    const handlePerspective = (isActive: boolean) => {
        if (isActive) {
            setThreeDimensional();
            return;
        }

        setTwoDimensional();
    };

    const handleTerrainType = (isActive: boolean) => {
        if (isActive) {
            setSatellite();
            return;
        }

        setStreet();
    };

    const handleUserLocation = (isActive: boolean) => {
        if (isActive) {
            activateUserLocation(mapViewerRef);
            return;
        }

        deactivateUserLocation();
    };

    return (
        <div className="absolute bottom-4 right-4 flex space-x-2 bg-white bg-opacity-50 p-2 rounded-full">
            <button
                className={`px-3 py-2 text-white bg-gray-500 rounded-full shadow hover:bg-primary ${isLayerButtonActive ? 'bg-primary' : 'bg-gray-500'}`}
                onClick={() => handleLayerType(!isLayerButtonActive)}
            >
                <SlLayers />
            </button>
            <button
                className="px-3 py-2 text-white bg-gray-500 rounded-full shadow hover:bg-primary"
                onClick={() => zoomIn(mapViewerRef)}
            >
                <VscZoomIn />
            </button>
            <button
                className="px-3 py-2 text-white bg-gray-500 rounded-full shadow hover:bg-primary"
                onClick={() => zoomOut(mapViewerRef)}
            >
                <VscZoomOut />
            </button>
            <button
                className={`px-3 py-2 text-white rounded-full shadow hover:bg-primary ${isUserLocationButtonActive ? 'bg-primary' : 'bg-gray-500'}`}
                onClick={() => handleUserLocation(!isUserLocationButtonActive)}
            >
                <FaLocationArrow />
            </button>
            {/* <button className="px-3 py-2 text-white bg-gray-500 rounded-full shadow hover:bg-primary">
                <ImLocation2 />
            </button> */}
            <button
                className={`px-3 py-2 text-white rounded-full shadow ${is3dButtonActive ? '' : !is3dButtonDisabled ? 'hover:bg-primary' : ''} text-sm ${is3dButtonDisabled ? 'disabled' : is3dButtonActive ? 'bg-primary' : 'bg-gray-500'}`}
                onClick={() => handlePerspective(!is3dButtonActive)}
                disabled={is3dButtonDisabled}
            >
                3D
            </button>
            <button
                className={`px-3 py-2 text-white rounded-full shadow ${isTerrainButtonActive ? '' : !isTerrainButtonDisabled ? 'hover:bg-primary' : ''} text-sm ${isTerrainButtonDisabled ? 'disabled' : isTerrainButtonActive ? 'bg-primary' : 'bg-gray-500'}`}
                onClick={() => handleTerrainType(!isTerrainButtonActive)}
                disabled={isTerrainButtonDisabled}
            >
                <GrSatellite />
            </button>
        </div>
    );
};

export default MapActions;
