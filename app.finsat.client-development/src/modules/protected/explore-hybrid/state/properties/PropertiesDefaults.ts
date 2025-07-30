export type Property = {
    id: string | undefined;
    name: string;
    osmId: string;
    type: any;
    location: PropertyLocation;
    schematics: PropertySchematics;
};

type PropertyLocation = {
    streetName: string;
    streetNumber: string;
    zipCode: string;
    city: string;
    country: string;
    position: PropertyLocationPosition;
};

type PropertyLocationPosition = {
    latitude: number;
    longitude: number;
};

export type PropertySchematics = {
    size: number;
};

export const PropertiesDefaults: Array<Property> = [];
