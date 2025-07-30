import React from 'react';
import MapOptionsReducer from '../../state/map-options/MapOptionsReducer';
import MapOptionsDefaults, {
    showMapOptionsDefaultFn
} from '../../state/map-options/MapOptionsDefaults';
import MapOptionsContext from './MapOptionsContext';
import createPersistDataContext from '@contexts/createPersistDataContext';

export const MapOptionsContextProvider = createPersistDataContext(
    MapOptionsReducer,
    MapOptionsDefaults,
    MapOptionsContext,
    showMapOptionsDefaultFn
);

export default function useMapOptionsContext() {
    return React.useContext(MapOptionsContext);
}
