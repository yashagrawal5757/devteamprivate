import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { LocationFrameType } from '../../state/location-frame/LocationFrameDefaults';

interface LocationFrameContextType {
    state: LocationFrameType | undefined;
    dispatch: React.Dispatch<IReducerAction>;
}

const LocationFrameContext = React.createContext<LocationFrameContextType>(
    {} as LocationFrameContextType
);

export default LocationFrameContext;
