import { SectorType } from "@enums/SectorType";
import { SpatialFeatureType } from "@enums/SpatialFeatureType";

export const spatialFeatureTypeMetadata: Record<SpatialFeatureType, string> = {
    [SpatialFeatureType.BUILDING]: 'Building',
    [SpatialFeatureType.FOREST]: 'Forest',
    [SpatialFeatureType.PARKING_LOT]: 'Parking Lot',
    [SpatialFeatureType.WATER]: 'Water',
    [SpatialFeatureType.LAND_PARCEL]: 'Land Parcel'
};