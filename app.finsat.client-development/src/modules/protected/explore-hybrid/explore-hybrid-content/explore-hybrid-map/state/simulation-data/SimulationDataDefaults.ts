import { CartesianCoordinate } from '@hooks/useGeometry';

export enum PointOfInterest {
    NONE = 0
}

type SimulationRegion = {
    northEast: CartesianCoordinate;
    northWest: CartesianCoordinate;
    southEast: CartesianCoordinate;
    southWest: CartesianCoordinate;
};

export type SimulationData = {
    pointOfInterest: PointOfInterest;
    region: SimulationRegion;
};

const SimulationDataDefaults: Array<SimulationData> = [];

export default SimulationDataDefaults;
