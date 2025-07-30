import React from 'react';
import createDataContext from '@contexts/createDataContext';
import PropertyContext from './PropertyContext';
import PropertyReducer from '../../state/property/PropertyReducer';
import PropertyDefaults from '../../state/property/PropertyDefaults';

export const PropertyContextProvider = createDataContext(
    PropertyReducer,
    PropertyDefaults,
    PropertyContext
);

export default function usePropertyContext() {
    return React.useContext(PropertyContext);
}
