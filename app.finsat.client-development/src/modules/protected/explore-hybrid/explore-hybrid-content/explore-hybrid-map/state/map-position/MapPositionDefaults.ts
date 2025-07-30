import MapStorageService, {
    MapPositionType
} from '../../services/map.storage.service';

export const MapPositionDefaultsFn = MapStorageService.getMapPosition;

const MapPositionDefaults: MapPositionType | undefined =
    MapPositionDefaultsFn();

export default MapPositionDefaults;
