import { BuildingOrientationType } from '@enums/BuildingOrientationType';

export const buildingOrientationTypeMetadata: Record<
    BuildingOrientationType,
    string
> = {
    [BuildingOrientationType.NORTH]: 'North',
    [BuildingOrientationType.NORTHEAST]: 'North East',
    [BuildingOrientationType.EAST]: 'East',
    [BuildingOrientationType.SOUTHEAST]: 'South East',
    [BuildingOrientationType.SOUTH]: 'South',
    [BuildingOrientationType.SOUTHWEST]: 'South West',
    [BuildingOrientationType.WEST]: 'West',
    [BuildingOrientationType.NORTHWEST]: 'North West'
};
