import { BuildingType } from '@enums/BuildingType';
import { City } from '@enums/City';
import { Country } from '@enums/Country';

export type WatchlistType = {
    id: string;
    name: string;
    properties: Array<WatchlistPropertyType>;
};

export type WatchlistPropertyType = {
    buildingId: string;
    buildingName: string;
    buildingType: BuildingType;
    schematics: WatchlistPropertySchematicsType;
    solarEstimation: WatchlistPropertySolarEstimationType;
    variationId: string;
};

type WatchlistPropertySchematicsType = {
    totalAvailableSpace: number;
};

type WatchlistPropertySolarEstimationType = {
    netEnergyProduction: number;
    netEnergyRevenue: number;
    internalRateOfReturn: number;
    netPresentValue: number;
    paybackPeriod: number;
};

const WatchlistDefaults: Array<WatchlistType> = [];

export default WatchlistDefaults;
