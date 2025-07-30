export type CartesianCoordinate = {
    latitude: number;
    longitude: number;
};

export type LocationFrameType = {
    topLeft: CartesianCoordinate;
    topRight: CartesianCoordinate;
    bottomLeft: CartesianCoordinate;
    bottomRight: CartesianCoordinate;
};

const LocationFrameDefaults: LocationFrameType | undefined = undefined;

export default LocationFrameDefaults;
