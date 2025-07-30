import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { MapOptionsType } from '../../services/map.storage.service';

interface MapOptionsContextType {
    state: MapOptionsType;
    dispatch: React.Dispatch<IReducerAction>;
}

const MapOptionsContext = React.createContext<MapOptionsContextType>(
    {} as MapOptionsContextType
);

export default MapOptionsContext;
