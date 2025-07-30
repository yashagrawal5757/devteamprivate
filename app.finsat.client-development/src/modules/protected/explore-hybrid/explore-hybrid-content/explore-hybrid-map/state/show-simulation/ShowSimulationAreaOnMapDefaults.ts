import MapStorageService from '../../services/map.storage.service';

export const showSimulationAreasDefaultFn =
    MapStorageService.getShowSimulationAreasOption;

const ShowSimulationAreaOnMapDefaults: boolean = showSimulationAreasDefaultFn();

export default ShowSimulationAreaOnMapDefaults;
