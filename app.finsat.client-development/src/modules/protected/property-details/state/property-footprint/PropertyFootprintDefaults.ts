export type PropertyFootprintItem = {
    id: string;
    data: Array<[number, number]>;
};

export type PropertyFootprint = {
    shapes: Array<PropertyFootprintItem>;
    obsticles: Array<PropertyFootprintItem>;
};

export type Footprint = {
    latitude: number;
    longitude: number;
};

export enum PolygonEditMode {
    MOVE = 0,
    ADD_POINT
}

const PropertyFootprintDefaults: PropertyFootprint = {
    shapes: [],
    obsticles: []
};

export default PropertyFootprintDefaults;
