import {
    BillboardGraphics,
    Camera,
    Cartesian3,
    HeightReference,
    Scene,
    VerticalOrigin,
    Ellipsoid
} from 'cesium';
import { useCallback, useState } from 'react';
import useMapPosition from './useMapPosition';
import useLocationFrame from 'modules/protected/explore-hybrid/hooks/location-frame/useLocationFrame';
import usePinPoints from 'modules/protected/explore-hybrid/hooks/pin-points/usePinPoints';
import useDestinationLookup from '@hooks/useDestinationLookup';
import useGeometry from '@hooks/useGeometry';
import { v4 as uuidv4 } from 'uuid';
import useSFPinPoints from '@explore/hooks/sf-pin-points/useSFPinPoints';

type Pin = {
    buildingId: string;
    name: string;
    position: Cartesian3;
    billboard: BillboardGraphics | BillboardGraphics.ConstructorOptions;
};

const usePins = () => {
    const [pins, setPins] = useState<Pin[]>([]);
    const [sfPins, setSFPins] = useState<Pin[]>([]);

    const { pinPoints, addPinPoint } = usePinPoints();
    const { sfPinPoints } = useSFPinPoints();
    const geometry = useGeometry();
    const { locationFrame, setLocationFrame } = useLocationFrame();
    const mapPosition = useMapPosition();
    const { destination } = useDestinationLookup();

    const getPin = async (
        iconUrl: string = './pin-blue.svg'
    ): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const icon = new Image();
            icon.src = iconUrl;

            icon.onload = () => {
                resolve(iconUrl); // return the URL since it's directly usable by Cesium
            };

            icon.onerror = (error) => {
                reject(new Error(`Failed to load image: ${error}`));
            };
        });
    };

    //FIXME - Find another way instead of using with SetTimeout. This is temporary solution since removing timeout causes map not be displayed.
    const displayPins = (): void => {
        if (locationFrame === undefined) {
            return;
        }

        const destination = geometry.calculateCentroid(
            locationFrame.topLeft,
            locationFrame.topRight,
            locationFrame.bottomRight,
            locationFrame.bottomLeft
        );

        const threshold = 0.0001; // ~11 meters, adjust as needed

        const maxDistance = 0.001;

        let nearestPoint: any = null;
        let minDistance = Infinity;

        // First, find exact match or closest point
        pinPoints.forEach((point) => {
            const dLat = point.latitude - destination.latitude;
            const dLon = point.longitude - destination.longitude;
            const distance = Math.sqrt(dLat * dLat + dLon * dLon);

            if (distance < minDistance) {
                minDistance = distance;
                nearestPoint = point;
            }
        });

        const pinPointResolvers = pinPoints.map(async (point) => {
            let useSearchedIcon = false;

            // Exact match
            if (
                Math.abs(point.latitude - destination.latitude) < threshold &&
                Math.abs(point.longitude - destination.longitude) < threshold
            ) {
                useSearchedIcon = true;
            }

            // Nearest point if no exact match
            if (
                !useSearchedIcon &&
                minDistance <= maxDistance &&
                point === nearestPoint
            ) {
                useSearchedIcon = true;
            }

            const canvas = await getPin(
                useSearchedIcon ? './pin-red.svg' : './pin-blue.svg'
            );

            const pin: Pin = {
                buildingId: point.id,
                name: point.id,
                position: Cartesian3.fromDegrees(
                    point.longitude,
                    point.latitude
                ),
                billboard: {
                    image: canvas,
                    verticalOrigin: VerticalOrigin.BOTTOM,
                    heightReference: HeightReference.CLAMP_TO_GROUND,
                    width: 28,
                    height: 28
                }
            };

            return pin;
        });

        setTimeout(() => {
            Promise.all(pinPointResolvers).then((resolvedPins) => {
                setPins(resolvedPins);
            });
        }, 1000);
    };

    const displaySpatialFeaturePins = (): void => {
        if (locationFrame === undefined) {
            return;
        }

        const pinPointResolvers = sfPinPoints.map(async (point) => {
            const canvas = await getPin(
                './pin-blue.svg'
            );

            const pin: Pin = {
                buildingId: point.id,
                name: point.name,
                position: Cartesian3.fromDegrees(
                    point.longitude,
                    point.latitude
                ),
                billboard: {
                    image: canvas,
                    verticalOrigin: VerticalOrigin.BOTTOM,
                    heightReference: HeightReference.CLAMP_TO_GROUND,
                    width: 28,
                    height: 28
                }
            };

            return pin;
        });

        setTimeout(() => {
            Promise.all(pinPointResolvers).then((resolvedPins) => {
                setSFPins(resolvedPins);
            });
        }, 1000);
    };

    const createPin = (latitude: number, longitude: number, name?: string) => {
        const pinPoint = {
            id: uuidv4(),
            name: name || 'Pin',
            latitude,
            longitude
        };
        addPinPoint(pinPoint);
    };


    const onCameraMove = useCallback((cam: Camera, scene: Scene) => {
        const coordinates = geometry.ellipsoidToCartesianCoordinates(
            cam,
            scene
        );
        const cartesian = scene.camera.position;
        const cartographic = Ellipsoid.WGS84.cartesianToCartographic(cartesian);
        const cameraHeight = cartographic.height;

        if (!coordinates) {
            return;
        }

        const [northwest, northeast, southwest, southeast] = coordinates;

        const position = cam.positionCartographic;

        mapPosition.setMapPosition({
            latitude: position.latitude,
            longitude: position.longitude,
            height: position.height
        });

        setLocationFrame(northwest, northeast, southwest, southeast);
    }, []);

    return {
        pins,
        sfPins,
        displayPins,
        displaySpatialFeaturePins,
        onCameraMove,
        createPin
    };
};

export default usePins;
