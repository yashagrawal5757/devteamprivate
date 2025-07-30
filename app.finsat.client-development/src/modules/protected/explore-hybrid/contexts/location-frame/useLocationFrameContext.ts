import React from 'react';
import LocationFrameContext from './LocationFrameContext';
import createDataContext from '@contexts/createDataContext';
import LocationFrameReducer from '../../state/location-frame/LocationFrameReducer';
import LocationFrameDefaults from '../../state/location-frame/LocationFrameDefaults';

export const LocationFrameContextProvider = createDataContext(
    LocationFrameReducer,
    LocationFrameDefaults,
    LocationFrameContext
);

export default function useLocationFrameContext() {
    return React.useContext(LocationFrameContext);
}
