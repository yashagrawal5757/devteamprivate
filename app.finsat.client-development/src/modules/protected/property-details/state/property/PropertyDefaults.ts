import { BuildingOrientationType } from '@enums/BuildingOrientationType';
import { BuildingRoofShape } from '@enums/BuildingRoofShape';
import { BuildingType } from '@enums/BuildingType';

type Position = {
    latitude: number;
    longitude: number;
};

type DetailedLocation = {
    streetName: string;
    streetNumber: string;
    zipCode: string;
    city: string;
    country: string;
    position: Position;
};

export type DetailedPropertyType = {
    id: string | undefined;
    osmId: string;
    name: string;
    type: BuildingType;
    location: DetailedLocation;
};

const PropertyDefaults: DetailedPropertyType | undefined = undefined;

export default PropertyDefaults;
