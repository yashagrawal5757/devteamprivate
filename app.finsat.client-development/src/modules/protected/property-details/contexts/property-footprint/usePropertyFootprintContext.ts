import React from 'react';
import createDataContext from '@contexts/createDataContext';
import PropertyFootprintContext from './PropertyFootprintContext';
import PropertyFootprintReducer from '../../state/property-footprint/PropertyFootprintReducer';
import PropertyFootprintDefaults from '../../state/property-footprint/PropertyFootprintDefaults';

export const PropertyFootprintContextProvider = createDataContext(
    PropertyFootprintReducer,
    PropertyFootprintDefaults,
    PropertyFootprintContext
);

export default function usePropertyFootprintContext() {
    return React.useContext(PropertyFootprintContext);
}
