import {
    Camera,
    Ellipsoid,
    Math as CesiumMath,
    Cartesian2,
    Scene
} from 'cesium';
import * as turf from '@turf/turf';
import { LocationFrameType } from 'modules/protected/explore-hybrid/state/location-frame/LocationFrameDefaults';

export type CartesianCoordinate = {
    latitude: number;
    longitude: number;
};

const useGeometry = () => {
    const isPointInPolygon = (
        point: CartesianCoordinate,
        vertices: CartesianCoordinate[]
    ): boolean => {
        const { latitude, longitude } = point;

        let inside = false;
        for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
            const xi = vertices[i].latitude,
                yi = vertices[i].longitude;
            const xj = vertices[j].latitude,
                yj = vertices[j].longitude;

            const intersect =
                yi > longitude !== yj > longitude &&
                latitude < ((xj - xi) * (longitude - yi)) / (yj - yi) + xi;

            if (intersect) inside = !inside;
        }

        return inside;
    };

    const isPointInLocationFrame = (
        point: CartesianCoordinate,
        frame: LocationFrameType
    ): boolean => {
        const vertices = [
            frame.topLeft,
            frame.topRight,
            frame.bottomRight,
            frame.bottomLeft
        ];

        return isPointInPolygon(point, vertices);
    };

    const ellipsoidToCartesianCoordinates = (
        camera: Camera,
        scene: Scene
    ):
        | [
            northwest: CartesianCoordinate,
            northeast: CartesianCoordinate,
            southwest: CartesianCoordinate,
            southeast: CartesianCoordinate,
            height: number
        ]
        | undefined => {
        const ellipsoid = scene.globe.ellipsoid;
        const viewRectangle = scene.canvas;
        const pick = (
            x: number,
            y: number
        ): CartesianCoordinate | undefined => {
            const cartesian = camera.pickEllipsoid(
                new Cartesian2(x, y),
                ellipsoid
            );
            if (!cartesian) return;
            const cartographic =
                Ellipsoid.WGS84.cartesianToCartographic(cartesian);
            return {
                latitude: CesiumMath.toDegrees(cartographic.latitude),
                longitude: CesiumMath.toDegrees(cartographic.longitude)
            };
        };
        if (!viewRectangle) {
            return;
        }

        const northwest = pick(0, 0);
        const northeast = pick(viewRectangle.width, 0);
        const southwest = pick(0, viewRectangle.height);
        const southeast = pick(viewRectangle.width, viewRectangle.height);

        const cameraHeight = camera.positionCartographic.height;

        if (!northwest || !northeast || !southwest || !southeast) {
            return;
        }

        return [northwest, northeast, southwest, southeast, cameraHeight];
    };

    const calculateCentroid = (
        northWest: CartesianCoordinate,
        northEast: CartesianCoordinate,
        southEast: CartesianCoordinate,
        southWest: CartesianCoordinate
    ): CartesianCoordinate => {
        const latitudes = [
            northWest.latitude,
            northEast.latitude,
            southEast.latitude,
            southWest.latitude
        ];
        const longitudes = [
            northWest.longitude,
            northEast.longitude,
            southEast.longitude,
            southWest.longitude
        ];

        const latCenter =
            latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
        const longCenter =
            longitudes.reduce((sum, long) => sum + long, 0) / longitudes.length;

        return { latitude: latCenter, longitude: longCenter };
    };

    const calculateFootprintCentroid = (footprint: Array<[number, number]>) => {
        let sumX = 0;
        let sumY = 0;
        let n = footprint.length;

        for (let i = 0; i < n; i++) {
            sumX += footprint[i][0];
            sumY += footprint[i][1];
        }

        let centroidX = sumX / n;
        let centroidY = sumY / n;

        return [centroidX, centroidY];
    };

    const calculateFootprintArea = (coords: Array<[number, number]>) => {
        coords = coords.map(([lat, lon]) => [lon, lat]);
        const polygon = turf.polygon([coords]);
        return turf.area(polygon);
    };

    const haversineDistanceMeters = (
        coord1: { latitude: number; longitude: number },
        coord2: { latitude: number; longitude: number }
    ): number => {
        const R = 6371000; // Earth radius in meters
        const toRad = (deg: number) => (deg * Math.PI) / 180;

        const dLat = toRad(coord2.latitude - coord1.latitude);
        const dLon = toRad(coord2.longitude - coord1.longitude);

        const lat1 = toRad(coord1.latitude);
        const lat2 = toRad(coord2.latitude);

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    };

    const areAllPointsInsideAnyPolygon = (points: Array<CartesianCoordinate>, polygons: Array<Array<CartesianCoordinate>>): boolean => {
        return points.every(point =>
            polygons.some(polygon => isPointInPolygon(point, polygon))
        );
    }

    return {
        isPointInLocationFrame,
        isPointInPolygon,
        ellipsoidToCartesianCoordinates,
        calculateCentroid,
        calculateFootprintCentroid,
        calculateFootprintArea,
        haversineDistanceMeters,
        areAllPointsInsideAnyPolygon
    };
};

export default useGeometry;
