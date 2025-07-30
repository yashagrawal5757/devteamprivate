import React from 'react';
import createPersistDataContext from '@contexts/createPersistDataContext';
import MapPositionReducer from '../../state/map-position/MapPositionReducer';
import MapPositionDefaults, {
    MapPositionDefaultsFn
} from '../../state/map-position/MapPositionDefaults';
import MapPositionContext from './MapPositionContext';

export const MapPositionContextProvider = createPersistDataContext(
    MapPositionReducer,
    MapPositionDefaults,
    MapPositionContext,
    MapPositionDefaultsFn
);

export default function useMapPositionContext() {
    return React.useContext(MapPositionContext);
}
