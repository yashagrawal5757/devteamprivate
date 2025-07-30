import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { MapPositionType } from '../../services/map.storage.service';

interface MapPositionContextType {
    state: MapPositionType | undefined;
    dispatch: React.Dispatch<IReducerAction>;
}

const MapPositionContext = React.createContext<MapPositionContextType>(
    {} as MapPositionContextType
);

export default MapPositionContext;
