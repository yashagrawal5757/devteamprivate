import {
    Cesium3DTileset,
    CesiumComponentRef,
    Entity,
    ImageryLayer,
    Viewer
} from 'resium';
import {
    Ion,
    createWorldTerrainAsync,
    Viewer as CesiumViewer,
    Color,
    Cartesian3,
    HeightReference,
    NearFarScalar,
    BillboardGraphics
} from 'cesium';
import './CesiumMap.css';
import MapActions from './components/map-actions/MapActions';
import { useCallback, useEffect, useRef, useState } from 'react';
import MapSimulationActions from './components/map-simulation-actions/MapSimulationActions';
import useToggle from '@hooks/useToggle';
import useExploreMap from '../hooks/useExploreMap';
import useImageryProvider from '../hooks/useImageryProvider';
import useTilesetResource from '../hooks/useTilesetResource';
import useMapPosition from '../hooks/useMapPosition';
import {
    MapPerspective,
} from '../services/map.storage.service';
import useSimulation from '../hooks/useSimulation';
import useGeometry from '@hooks/useGeometry';
import useLocationFrame from 'modules/protected/explore-hybrid/hooks/location-frame/useLocationFrame';
import usePinPoints from 'modules/protected/explore-hybrid/hooks/pin-points/usePinPoints';
import usePins from '../hooks/usePins';
import useExploreWatchlist from 'modules/protected/explore-hybrid/hooks/watchlist/useExploreWatchlist';
import { PinPoint } from 'modules/protected/explore-hybrid/state/pin-points/PinPointsDefaults';
import ExplorePropertyPinCard from 'modules/protected/explore-hybrid/components/explore-property-pin-card/ExplorePropertyPinCard';
import MapSearchArea from './components/map-search-area/MapSearchArea';
import useDestinationLookup from '@hooks/useDestinationLookup';
import usePropertiesLookupLimit from 'modules/protected/explore-hybrid/hooks/hybrid-solution/usePropertiesLookupLimit';
import Tooltip from '@ui/tooltip/Tooltip';
import MapPropertyFrame from './components/map-property-frame/MapPropertyFrame';
import useMapPropertyFrameTools from '../hooks/usePropertyMapTools';
import useSFPinPoints from '@explore/hooks/sf-pin-points/useSFPinPoints';
import useExploreWindowDimensions from '../hooks/explore-window-dimensions/useExploreWindowDimensions';
import ExploreHybridSFModal from '@explore/explore-hybrid-content/explore-hybrid-sf-modal/ExploreHybridSFModal';
import useExploreHybridSFModal from '@explore/explore-hybrid-content/explore-hybrid-sf-modal/useExploreHybridSFModal';
import useExploreFootprint from '../hooks/explore-footprint/useExploreFootprint';
import { SpatialFeatureType } from '@enums/SpatialFeatureType';
import useProperties from '@explore/hooks/properties/useProperties';
import useExploreSegmentation from '../hooks/explore-sam-model/useExploreSegmentation';

Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_ION_TOKEN!;

export const MAP_MAXIMUM_HEIGHT_FOR_FETCH = 1200;

type Pin = {
    buildingId: string;
    name: string;
    position: Cartesian3;
    billboard: BillboardGraphics | BillboardGraphics.ConstructorOptions;
};

type HighlightedPin = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    type: 'SFP' | 'BP';
}

type CesiumMapProps = {
    onSearchFrame: () => void;
};

const CesiumMap = ({ onSearchFrame }: CesiumMapProps) => {
    const [selectedPin, setSelectedPin] = useState<HighlightedPin | undefined>(
        undefined
    );
    const viewerRef = useRef<CesiumComponentRef<CesiumViewer> | null>(null);
    const {
        isActive: isViewerRefInitialized,
        setToggle: setViewerRefInitialized
    } = useToggle();
    const { pinPoints } = usePinPoints();
    const { sfPinPoints } = useSFPinPoints();
    const { pins, sfPins, displayPins, displaySpatialFeaturePins, onCameraMove } = usePins();
    const {
        mapOptions,
        userLocation,
        showSimulationOverlay,
        moveCameraToLocation,
        navigateToSimulation
    } = useExploreMap();
    const { destination } = useDestinationLookup();
    const { getProvider } = useImageryProvider();
    const tilesetResource = useTilesetResource();
    const { simulations } = useSimulation();
    const { calculateCentroid } = useGeometry();
    const { position: mapPosition } = useMapPosition();
    const { locationFrame } = useLocationFrame();
    const { fetchSimulationKeys } = useSimulation();
    const modalRef = useRef<HTMLDivElement>(null);
    const { addToWatchlistQueue, toggleWatchlistModal } = useExploreWatchlist();
    const { lookupLimit } = usePropertiesLookupLimit();
    const { haversineDistanceMeters, calculateFootprintCentroid } = useGeometry();
    const { getMapPropertySnapshotAsBase64, setBase64Image, setBoundingBox, base64Image, boundingBox, clearBase64Image, clearBoundingBox } = useMapPropertyFrameTools();
    const { footprint: exploreFootprint } = useExploreFootprint();
    const geometry = useGeometry();
    const [isZoomRange, setIsZoomRange] = useState(true);
    const { dimensions } = useExploreWindowDimensions(viewerRef);
    const { exploreSFModal, closeModal: closeSFModal } = useExploreHybridSFModal();
    const { createSpatialFeature } = useProperties();
    const { setEmbedding } = useExploreSegmentation();

    const terrainTypeCallback = useCallback(
        () => getProvider(mapOptions.terrainType),
        [mapOptions.terrainType]
    );

    useEffect(() => {
        if (destination === undefined) {
            return;
        }

        if (viewerRef === null) {
            return;
        }

        const { latitude, longitude } = destination;

        const interval = setInterval(() => {
            if (!viewerRef.current?.cesiumElement) {
                return;
            }

            if (!viewerRef.current?.cesiumElement?.camera) {
                return;
            }

            moveCameraToLocation(viewerRef, latitude, longitude);
            handleClosePropertyFrame();
            clearInterval(interval);
        }, 1000);
    }, [destination]);

    useEffect(() => {
        fetchSimulationKeys();

        if (locationFrame === undefined) {
            return;
        }
        /* This will enable or disable the detect objects buttons based on the height level */
        const distance = haversineDistanceMeters(
            locationFrame.topLeft,
            locationFrame.bottomRight
        );

        if (distance >= 1700) {
            setIsZoomRange(false);
            return;
        }
        setIsZoomRange(true);
    }, [locationFrame]);

    useEffect(() => {
        displayPins();
    }, [pinPoints]);

    useEffect(() => {
        displaySpatialFeaturePins();
    }, [sfPinPoints]);

    useEffect(() => {
        displaySpatialFeaturePins();
    }, [sfPinPoints]);

    const initiateSamModel = async () => {
        if (!viewerRef || !viewerRef.current || !viewerRef.current?.cesiumElement) {
            return;
        }

        const { scene } = viewerRef.current.cesiumElement;

        getMapPropertySnapshotAsBase64(viewerRef, true)
            .then(([meta, base64]) => { setBase64Image(`${meta},${base64}`); })
            .catch((error) => console.error(error));

        const coordinates = geometry.ellipsoidToCartesianCoordinates(
            scene.camera,
            scene
        );

        if (!coordinates) {
            return;
        }

        const [northwest, northeast, southwest, southeast] = coordinates;

        setBoundingBox({
            northeast: { latitude: northeast.latitude, longitude: northeast.longitude },
            northwest: { latitude: northwest.latitude, longitude: northwest.longitude },
            southeast: { latitude: southeast.latitude, longitude: southeast.longitude },
            southwest: { latitude: southwest.latitude, longitude: southwest.longitude },
        });
    }

    const handleCameraMove = (
        cesiumViewer: CesiumComponentRef<CesiumViewer> | null
    ) => {
        const cesiumElement = cesiumViewer!.cesiumElement!;

        const { scene } = cesiumElement;
        const { camera } = scene;

        camera.moveEnd.addEventListener(() => onCameraMove(camera, scene), {
            once: true
        });

        if (mapPosition === undefined) {
            return;
        }

        scene.camera.setView({
            destination: Cartesian3.fromRadians(
                mapPosition.longitude,
                mapPosition.latitude,
                mapPosition.height
            )
        });
    };

    const handlePinClick = (pin: Pin) => {
        const pinProperty = pinPoints.find(
            (pinPoint) => pinPoint.id === pin.buildingId
        );

        const sfPinProperty = sfPinPoints.find(
            (pinPoint) => pinPoint.id === pin.buildingId
        );


        if (pinProperty === undefined && sfPinProperty === undefined) {
            setSelectedPin(undefined);
            return;
        }

        let pinPoint: PinPoint | undefined = pinProperty || sfPinProperty;

        let highlightedPin: HighlightedPin = { ...pinPoint as PinPoint, type: 'BP' };

        if (sfPinProperty !== undefined) {
            highlightedPin.type = 'SFP';
        }

        setSelectedPin(highlightedPin);
    };

    const closeModal = () => {
        setSelectedPin(undefined);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                closeModal();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [closeModal]);

    const handleClosePropertyFrame = () => {
        clearBase64Image();
        clearBoundingBox();
        setEmbedding(undefined);
    };

    return (
        <div className="relative w-full h-full">
            <Viewer
                ref={(e) => {
                    if (e == null) {
                        return;
                    }

                    if (e.cesiumElement === undefined) {
                        return;
                    }

                    if (isViewerRefInitialized) {
                        return;
                    }

                    viewerRef.current = e;

                    setViewerRefInitialized(true);

                    handleCameraMove(e);
                }}
                className="w-full h-full"
                terrainProvider={createWorldTerrainAsync()}
                animation={false}
                timeline={false}
                fullscreenButton={false}
                baseLayerPicker={false}
                infoBox={false}
                homeButton={false}
                navigationHelpButton={false}
                projectionPicker={false}
                sceneModePicker={false}
                geocoder={false}
                selectionIndicator={false}
            >
                {userLocation !== undefined && (
                    <Entity
                        position={Cartesian3.fromDegrees(
                            userLocation.longitude,
                            userLocation.latitude
                        )}
                        point={{
                            pixelSize: 15,
                            color: Color.BLUE,
                            heightReference: HeightReference.CLAMP_TO_GROUND
                        }}
                    />
                )}
                {showSimulationOverlay &&
                    simulations.map(({ region, pointOfInterest }, index) => (
                        <div key={`simulation-${index}`}>
                            <Entity
                                position={(() => {
                                    const {
                                        northEast,
                                        northWest,
                                        southEast,
                                        southWest
                                    } = region;

                                    var centroid = calculateCentroid(
                                        northWest,
                                        northEast,
                                        southEast,
                                        southWest
                                    );

                                    return Cartesian3.fromDegrees(
                                        centroid.longitude,
                                        centroid.latitude,
                                        200
                                    );
                                })()}
                                onClick={() =>
                                    navigateToSimulation(pointOfInterest)
                                }
                                billboard={{
                                    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/play-button-3d-icon-download-in-png-blend-fbx-gltf-file-formats--media-video-player-multimedia-user-interface-pack-icons-5209346.png?f=webp',
                                    heightReference:
                                        HeightReference.CLAMP_TO_GROUND,
                                    height: 35,
                                    width: 35,
                                    scaleByDistance: new NearFarScalar(
                                        1.0e2,
                                        1.7,
                                        1.0e4,
                                        0
                                    )
                                }}
                            />
                            <Entity
                                onClick={({ position }) => {
                                    if (position === undefined) {
                                        return;
                                    }

                                    const {
                                        northEast,
                                        northWest,
                                        southEast,
                                        southWest
                                    } = region;

                                    var centroid = calculateCentroid(
                                        northWest,
                                        northEast,
                                        southEast,
                                        southWest
                                    );

                                    moveCameraToLocation(
                                        viewerRef,
                                        centroid.latitude,
                                        centroid.longitude,
                                        0.85
                                    );
                                }}
                                polygon={{
                                    material: Color.PURPLE.withAlpha(0.2),
                                    outline: true,
                                    outlineColor: Color.RED.withAlpha(1),
                                    outlineWidth: 10000,
                                    heightReference:
                                        HeightReference.CLAMP_TO_GROUND,
                                    hierarchy: Cartesian3.fromDegreesArray([
                                        region.northEast.longitude,
                                        region.northEast.latitude,
                                        region.northWest.longitude,
                                        region.northWest.latitude,
                                        region.southWest.longitude,
                                        region.southWest.latitude,
                                        region.southEast.longitude,
                                        region.southEast.latitude
                                    ])
                                }}
                                polyline={{
                                    material: Color.PURPLE.withAlpha(0.6),
                                    width: 3,
                                    clampToGround: true,
                                    positions: Cartesian3.fromDegreesArray([
                                        region.northEast.longitude,
                                        region.northEast.latitude,
                                        region.northWest.longitude,
                                        region.northWest.latitude,
                                        region.southWest.longitude,
                                        region.southWest.latitude,
                                        region.southEast.longitude,
                                        region.southEast.latitude,
                                        region.northEast.longitude,
                                        region.northEast.latitude
                                    ])
                                }}
                            />
                        </div>
                    ))}
                {mapOptions.perspective === MapPerspective.THREE_DIMENSION && (
                    <Cesium3DTileset
                        url={tilesetResource.getResource(mapOptions.renderType)}
                    />
                )}
                <>
                    <ImageryLayer imageryProvider={terrainTypeCallback()} />
                </>
                {lookupLimit.isLoadMore &&
                    pins.map((pin, index) => (
                        <Entity
                            key={index}
                            name={pin.buildingId}
                            position={pin.position}
                            billboard={pin.billboard}
                            onClick={() => handlePinClick(pin)}
                        ></Entity>
                    ))}
                {lookupLimit.isLoadMore &&
                    sfPins.map((pin, index) => (
                        <Entity
                            key={index}
                            name={pin.buildingId}
                            position={pin.position}
                            billboard={pin.billboard}
                            onClick={() => handlePinClick(pin)}
                        ></Entity>
                    ))}
            </Viewer>
            {selectedPin && (
                <>
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 z-20"
                        onClick={closeModal}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center translate-x-[-20%] z-20">
                        <div
                            ref={modalRef}
                            className="bg-white rounded-lg shadow-lg w-[250px] relative border border-gray-400"
                        >
                            <ExplorePropertyPinCard
                                key={selectedPin.id}
                                id={selectedPin.id}
                                name={selectedPin.name}
                                type={selectedPin.type}
                                addSinglePropertyToWatchlist={() => {
                                    addToWatchlistQueue(selectedPin.id);
                                    toggleWatchlistModal();
                                }}
                            />
                        </div>
                    </div>
                </>
            )}
            <MapActions mapViewerRef={viewerRef} />
            <MapSimulationActions />
            <MapSearchArea onClick={onSearchFrame} />
            <div
                className="absolute bottom-20 right-4 flex space-x-2 bg-white bg-opacity-50 p-2 rounded-full"
            >
                <button
                    className={`px-3 py-2 text-white text-sm rounded-full shadow ${isZoomRange ? 'hover:bg-primary bg-primary' : 'bg-gray-500'}`}
                    disabled={!isZoomRange}
                    onClick={() => {
                        if (!isZoomRange) return;
                        initiateSamModel();
                    }}
                    style={{
                        cursor: !isZoomRange ? 'not-allowed' : 'pointer',
                        position: 'relative'
                    }}
                >
                    {!isZoomRange ? (
                        <Tooltip message="Need closer range to be active">
                            <span>Detect Objects</span>
                        </Tooltip>
                    ) : (
                        'Detect Objects'
                    )}
                </button>
            </div>
            {boundingBox && base64Image && (
                <MapPropertyFrame frameDimensions={dimensions} onClose={handleClosePropertyFrame} />
            )}
            {exploreSFModal.displayModal && (
                <ExploreHybridSFModal
                    onClose={closeSFModal}
                    onSubmit={({ name, type }) => {
                        const [latitude, longitude] = calculateFootprintCentroid(
                            exploreFootprint.footprint.data
                        );

                        createSpatialFeature(
                            name,
                            parseInt(type) as SpatialFeatureType,
                            { latitude: latitude, longitude: longitude },
                            exploreFootprint.footprint.data.map(coordinate => ({ latitude: coordinate[0], longitude: coordinate[1] }))
                        );

                        closeSFModal();
                        handleClosePropertyFrame();
                    }}
                />
            )}
        </div>
    );
};

export default CesiumMap;
