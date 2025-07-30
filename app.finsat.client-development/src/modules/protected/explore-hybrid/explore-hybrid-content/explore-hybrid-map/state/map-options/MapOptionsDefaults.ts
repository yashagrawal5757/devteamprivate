import MapStorageService from '../../services/map.storage.service';

export const showMapOptionsDefaultFn = MapStorageService.getMapOptions;

const MapOptions = showMapOptionsDefaultFn();

export default MapOptions;
