import { OSMNode } from '../models/IOSMBuilding';
import axios from 'axios';
import * as turf from '@turf/turf';

export const reorderNodes = (
    originalIds: number[],
    resolvedNodes: OSMNode[]
): OSMNode[] => {
    const map = new Map(resolvedNodes.map((n) => [n.id, n]));
    return originalIds.map((id) => map.get(id)).filter(Boolean) as OSMNode[];
};

export const getOrderedFootprint = (
    nodeIds: number[],
    resolvedNodes: { id: number; lat: number; lon: number }[]
): [number, number][] => {
    const map = new Map(resolvedNodes.map((n) => [n.id, [n.lon, n.lat]]));
    const orderedCoords = nodeIds.map((id) => map.get(id)).filter(Boolean);

    // Ensure polygon is closed
    if (
        orderedCoords.length > 0 &&
        (orderedCoords[0]![0] !== orderedCoords[orderedCoords.length - 1]![0] ||
            orderedCoords[0]![1] !==
            orderedCoords[orderedCoords.length - 1]![1])
    ) {
        orderedCoords.push(orderedCoords[0]);
    }

    return orderedCoords as [number, number][];
};

export const calculateAreaFromFootprint = (footprint: [number, number][]) => {
    if (footprint.length < 3) return 0;
    const polygon = turf.polygon([footprint]);
    return turf.area(polygon); // in m²
};

export const sortPolygonByAngle = (
    points: Array<[number, number]>
): Array<[number, number]> => {
    const [centerLatitude, centerLongitude] = points
        .reduce(
            ([sumLatitude, sumLongitude], [latitude, longitude]) => [
                sumLatitude + latitude,
                sumLongitude + longitude
            ],
            [0, 0]
        )
        .map((sum) => sum / points.length);

    return points
        .slice()
        .sort(
            ([latitudeA, longitudeA], [latitudeB, longitudeB]) => {
                const angleToPointA = Math.atan2(
                    latitudeA - centerLatitude,
                    longitudeA - centerLongitude
                );
                const angleToPointB = Math.atan2(
                    latitudeB - centerLatitude,
                    longitudeB - centerLongitude
                );
                return angleToPointA - angleToPointB;
            }
        );
};
