import React from 'react';
import DestinationLookupContext from './DestinationLookupContext';
import createDataContext from '@contexts/createDataContext';
import DestinationLookupReducer from '@state/destination-lookup/DestinationLookupReducer';
import DestinationLookupDefaults from '@state/destination-lookup/DestinationLookupDefaults';

export const DestinationLookupContextProvider = createDataContext(
    DestinationLookupReducer,
    DestinationLookupDefaults,
    DestinationLookupContext
);

export default function useDestinationLookupContext() {
    return React.useContext(DestinationLookupContext);
}
