import { BuildingType, PropertyGroupType } from '@enums/BuildingType';

export const buildingTypeMetadata: Record<BuildingType, string> = {
    [BuildingType.NONE]: 'None',
    [BuildingType.SINGLE_FAMILY_RESIDENCE]: 'Single Family Residence',
    [BuildingType.TOWN_HOUSE]: 'Town House',
    [BuildingType.CONDOMINIUM]: 'Condominium',
    [BuildingType.OFFICE_BUILDING]: 'Office Building',
    [BuildingType.MISCELLANEOUS]: 'Miscellaneous',
    [BuildingType.RETAIL]: 'Retail',
    [BuildingType.AUTO_REPAIR_GARAGE]: 'Auto Repair Garage',
    [BuildingType.ZONE]: 'Zone',
    [BuildingType.FINANCIAL_BUILDING]: 'Financial Building',
    [BuildingType.TERMINAL]: 'Terminal',
    [BuildingType.COMMERCIAL_AND_OFFICE_BUILDING]:
        'Commercial and Office Building',
    [BuildingType.RESIDENTIAL_AND_COMMERCIAL_BUILDING]:
        'Residential and Commercial Building',
    [BuildingType.MOVIE_THEATER]: 'Movie Theater',
    [BuildingType.HOTEL]: 'Hotel',
    [BuildingType.STORE]: 'Store',
    [BuildingType.CASINO]: 'Casino',
    [BuildingType.RESIDENTIAL]: 'Residential',
    [BuildingType.COMMERCIAL]: 'Commercial',
    [BuildingType.INDUSTRIAL]: 'Industrial',
    [BuildingType.PRE_SCHOOL]: 'Pre-School',
    [BuildingType.SCHOOL]: 'School',
    [BuildingType.DORMITORY]: 'Dormitory',
    [BuildingType.COLLEGE]: 'College',
    [BuildingType.UNIVERSITY]: 'University',
    [BuildingType.DEPOT]: 'Depot',
    [BuildingType.WAREHOUSE]: 'Warehouse',
    [BuildingType.GARAGE]: 'Garage',
    [BuildingType.GOVERNMENT]: 'Government',
    [BuildingType.HOSPITAL]: 'Hospital',
    [BuildingType.TRAIN_STATION]: 'Train Station',
    [BuildingType.CHAPEL]: 'Chapel',
    [BuildingType.CHURCH]: 'Church',
    [BuildingType.TEMPLE]: 'Temple',
    [BuildingType.SYNAGOGUE]: 'Synagogue',
    [BuildingType.CONVENT]: 'Convent',
    [BuildingType.SPORTS_CENTRE]: 'Sports Centre',
    [BuildingType.TRANSPORTATION]: 'Transportation',
    [BuildingType.STATION]: 'Station',
    [BuildingType.TOWER]: 'Tower',
    [BuildingType.PARKING_LOT]: 'Parking Lot',
    [BuildingType.APARTMENT]: 'Apartment',
    [BuildingType.CABIN]: 'Cabin',
    [BuildingType.DETACHED]: 'Detached House',
    [BuildingType.ANNEXE]: 'Annexe',
    [BuildingType.FARM]: 'Farm',
    [BuildingType.GER]: 'Ger',
    [BuildingType.SEMI_DETACHED_HOUSE]: 'Semi Detached House',
    [BuildingType.STATIC_CARAVAN]: 'Static Caravan',
    [BuildingType.STILT_HOUSE]: 'Stilt House',
    [BuildingType.TREE_HOUSE]: 'Tree House',
    [BuildingType.TRULLO]: 'Trullo',
    [BuildingType.HOUSE_BOAT]: 'House Boat',
    [BuildingType.KIOSK]: 'Kiosk',
    [BuildingType.SUPERMARKET]: 'Supermarket',
    [BuildingType.BAKE_HOUSE]: 'Bake House',
    [BuildingType.MUSEUM]: 'Museum',
    [BuildingType.GRANDSTAND]: 'Grandstand',
    [BuildingType.PAVILION]: 'Pavilion',
    [BuildingType.RIDING_HALL]: 'Riding Hall',
    [BuildingType.STADIUM]: 'Stadium',
    [BuildingType.BARN]: 'Barn',
    [BuildingType.CONSERVATORY]: 'Conservatory',
    [BuildingType.COW_SHED]: 'Cow Shed',
    [BuildingType.GREEN_HOUSE]: 'Green House',
    [BuildingType.SLURRY_TANK]: 'Slurry Tank',
    [BuildingType.STABLE]: 'Stable',
    [BuildingType.STY]: 'Sty',
    [BuildingType.LIVESTOCK]: 'Livestock',
    [BuildingType.ALLOTMENT_HOUSE]: 'Allotment House',
    [BuildingType.BOAT_HOUSE]: 'Boat House',
    [BuildingType.HANGAR]: 'Hangar',
    [BuildingType.HUT]: 'Hut',
    [BuildingType.SHED]: 'Shed',
    [BuildingType.DIGISTER]: 'Digister',
    [BuildingType.SERVICE]: 'Service',
    [BuildingType.TECH_CAB]: 'Tech Cab',
    [BuildingType.STORAGE_TANK]: 'Storage Tank',
    [BuildingType.SILO]: 'Silo',
    [BuildingType.WIND_MILL]: 'Wind Mill',
    [BuildingType.RELIGIOUS]: 'Religious',
    [BuildingType.STRUCTURE]: 'Structure',
    [BuildingType.CIVIC]: 'Civic',
    [BuildingType.FIRE_STATION]: 'Fire Station',
    [BuildingType.GATE_HOUSE]: 'Gate House',
    [BuildingType.TOILETS]: 'Toilets',
    [BuildingType.CAR_PORT]: 'Car Port',
    [BuildingType.SHIP]: 'Ship',
    [BuildingType.MILITARY]: 'Military',
    [BuildingType.GUARD_HOUSE]: 'Guard House'
};

export const propertyGroupTypeMetadata: Record<PropertyGroupType, string> = {
    [PropertyGroupType.RESIDENTIAL]: 'Residential',
    [PropertyGroupType.COMMERCIAL]: 'Commercial',
    [PropertyGroupType.INDUSTRIAL]: 'Industrial',
    [PropertyGroupType.GENERAL]: 'General',
    [PropertyGroupType.UNKNOWN]: 'Unknown'
};

export const propertyGroupMapMetadata: Record<BuildingType, string> = {
    [BuildingType.NONE]: 'Unknown',
    [BuildingType.SINGLE_FAMILY_RESIDENCE]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.TOWN_HOUSE]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.CONDOMINIUM]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.OFFICE_BUILDING]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.MISCELLANEOUS]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.RETAIL]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.AUTO_REPAIR_GARAGE]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.ZONE]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.FINANCIAL_BUILDING]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.TERMINAL]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.COMMERCIAL_AND_OFFICE_BUILDING]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.RESIDENTIAL_AND_COMMERCIAL_BUILDING]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.MOVIE_THEATER]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.HOTEL]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.STORE]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.CASINO]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.RESIDENTIAL]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.COMMERCIAL]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.INDUSTRIAL]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.PRE_SCHOOL]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.SCHOOL]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.DORMITORY]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.COLLEGE]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.UNIVERSITY]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.DEPOT]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.WAREHOUSE]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.GARAGE]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.GOVERNMENT]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.HOSPITAL]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.TRAIN_STATION]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.CHAPEL]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.CHURCH]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.TEMPLE]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.SYNAGOGUE]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.CONVENT]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.SPORTS_CENTRE]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.TRANSPORTATION]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.STATION]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.TOWER]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.PARKING_LOT]: 'None',
    [BuildingType.APARTMENT]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.CABIN]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.DETACHED]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.ANNEXE]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.FARM]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.GER]: propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.SEMI_DETACHED_HOUSE]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.STATIC_CARAVAN]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.STILT_HOUSE]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.TREE_HOUSE]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.TRULLO]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.HOUSE_BOAT]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.KIOSK]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.SUPERMARKET]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.BAKE_HOUSE]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.MUSEUM]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.GRANDSTAND]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.PAVILION]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.RIDING_HALL]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.STADIUM]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.BARN]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.CONSERVATORY]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.COW_SHED]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.GREEN_HOUSE]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.SLURRY_TANK]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.STABLE]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.STY]: propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.LIVESTOCK]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.ALLOTMENT_HOUSE]:
        propertyGroupTypeMetadata[PropertyGroupType.COMMERCIAL],
    [BuildingType.BOAT_HOUSE]:
        propertyGroupTypeMetadata[PropertyGroupType.RESIDENTIAL],
    [BuildingType.HANGAR]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.HUT]: propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.SHED]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.DIGISTER]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.SERVICE]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.TECH_CAB]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.STORAGE_TANK]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.SILO]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.WIND_MILL]:
        propertyGroupTypeMetadata[PropertyGroupType.INDUSTRIAL],
    [BuildingType.RELIGIOUS]:
        propertyGroupTypeMetadata[PropertyGroupType.GENERAL],
    [BuildingType.STRUCTURE]:
        propertyGroupTypeMetadata[PropertyGroupType.GENERAL],
    [BuildingType.CIVIC]: propertyGroupTypeMetadata[PropertyGroupType.GENERAL],
    [BuildingType.FIRE_STATION]:
        propertyGroupTypeMetadata[PropertyGroupType.GENERAL],
    [BuildingType.GATE_HOUSE]:
        propertyGroupTypeMetadata[PropertyGroupType.GENERAL],
    [BuildingType.TOILETS]:
        propertyGroupTypeMetadata[PropertyGroupType.GENERAL],
    [BuildingType.CAR_PORT]:
        propertyGroupTypeMetadata[PropertyGroupType.GENERAL],
    [BuildingType.SHIP]: propertyGroupTypeMetadata[PropertyGroupType.GENERAL],
    [BuildingType.MILITARY]:
        propertyGroupTypeMetadata[PropertyGroupType.GENERAL],
    [BuildingType.GUARD_HOUSE]:
        propertyGroupTypeMetadata[PropertyGroupType.GENERAL]
};

export const propertyGroupMap: Record<BuildingType, PropertyGroupType> = {
    [BuildingType.NONE]: PropertyGroupType.UNKNOWN,
    [BuildingType.SINGLE_FAMILY_RESIDENCE]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.TOWN_HOUSE]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.CONDOMINIUM]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.OFFICE_BUILDING]: PropertyGroupType.COMMERCIAL,
    [BuildingType.MISCELLANEOUS]: PropertyGroupType.COMMERCIAL,
    [BuildingType.RETAIL]: PropertyGroupType.COMMERCIAL,
    [BuildingType.AUTO_REPAIR_GARAGE]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.ZONE]: PropertyGroupType.COMMERCIAL,
    [BuildingType.FINANCIAL_BUILDING]: PropertyGroupType.COMMERCIAL,
    [BuildingType.TERMINAL]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.COMMERCIAL_AND_OFFICE_BUILDING]: PropertyGroupType.COMMERCIAL,
    [BuildingType.RESIDENTIAL_AND_COMMERCIAL_BUILDING]:
        PropertyGroupType.COMMERCIAL,
    [BuildingType.MOVIE_THEATER]: PropertyGroupType.COMMERCIAL,
    [BuildingType.HOTEL]: PropertyGroupType.COMMERCIAL,
    [BuildingType.STORE]: PropertyGroupType.COMMERCIAL,
    [BuildingType.CASINO]: PropertyGroupType.COMMERCIAL,
    [BuildingType.RESIDENTIAL]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.COMMERCIAL]: PropertyGroupType.COMMERCIAL,
    [BuildingType.INDUSTRIAL]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.PRE_SCHOOL]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.SCHOOL]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.DORMITORY]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.COLLEGE]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.UNIVERSITY]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.DEPOT]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.WAREHOUSE]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.GARAGE]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.GOVERNMENT]: PropertyGroupType.COMMERCIAL,
    [BuildingType.HOSPITAL]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.TRAIN_STATION]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.CHAPEL]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.CHURCH]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.TEMPLE]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.SYNAGOGUE]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.CONVENT]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.SPORTS_CENTRE]: PropertyGroupType.COMMERCIAL,
    [BuildingType.TRANSPORTATION]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.STATION]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.TOWER]: PropertyGroupType.COMMERCIAL,
    [BuildingType.PARKING_LOT]: PropertyGroupType.COMMERCIAL,
    [BuildingType.APARTMENT]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.CABIN]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.DETACHED]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.ANNEXE]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.FARM]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.GER]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.SEMI_DETACHED_HOUSE]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.STATIC_CARAVAN]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.STILT_HOUSE]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.TREE_HOUSE]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.TRULLO]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.HOUSE_BOAT]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.KIOSK]: PropertyGroupType.COMMERCIAL,
    [BuildingType.SUPERMARKET]: PropertyGroupType.COMMERCIAL,
    [BuildingType.BAKE_HOUSE]: PropertyGroupType.COMMERCIAL,
    [BuildingType.MUSEUM]: PropertyGroupType.COMMERCIAL,
    [BuildingType.GRANDSTAND]: PropertyGroupType.COMMERCIAL,
    [BuildingType.PAVILION]: PropertyGroupType.COMMERCIAL,
    [BuildingType.RIDING_HALL]: PropertyGroupType.COMMERCIAL,
    [BuildingType.STADIUM]: PropertyGroupType.COMMERCIAL,
    [BuildingType.BARN]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.CONSERVATORY]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.COW_SHED]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.GREEN_HOUSE]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.SLURRY_TANK]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.STABLE]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.STY]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.LIVESTOCK]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.ALLOTMENT_HOUSE]: PropertyGroupType.COMMERCIAL,
    [BuildingType.BOAT_HOUSE]: PropertyGroupType.RESIDENTIAL,
    [BuildingType.HANGAR]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.HUT]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.SHED]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.DIGISTER]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.SERVICE]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.TECH_CAB]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.STORAGE_TANK]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.SILO]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.WIND_MILL]: PropertyGroupType.INDUSTRIAL,
    [BuildingType.RELIGIOUS]: PropertyGroupType.GENERAL,
    [BuildingType.STRUCTURE]: PropertyGroupType.GENERAL,
    [BuildingType.CIVIC]: PropertyGroupType.GENERAL,
    [BuildingType.FIRE_STATION]: PropertyGroupType.GENERAL,
    [BuildingType.GATE_HOUSE]: PropertyGroupType.GENERAL,
    [BuildingType.TOILETS]: PropertyGroupType.GENERAL,
    [BuildingType.CAR_PORT]: PropertyGroupType.GENERAL,
    [BuildingType.SHIP]: PropertyGroupType.GENERAL,
    [BuildingType.MILITARY]: PropertyGroupType.GENERAL,
    [BuildingType.GUARD_HOUSE]: PropertyGroupType.GENERAL
};
