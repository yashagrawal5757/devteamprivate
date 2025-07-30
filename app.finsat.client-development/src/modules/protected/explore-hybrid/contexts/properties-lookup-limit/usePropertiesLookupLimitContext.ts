import React from 'react';
import createDataContext from '@contexts/createDataContext';
import PropertiesLookupLimitReducer from '../../state/properties-lookup-limit/PropertiesLookupLimitReducer';
import PropertiesLookupLimitDefaults from '../../state/properties-lookup-limit/PropertiesLookupLimitDefaults';
import PropertiesLookupLimitContext from './PropertiesLookupLimitContext';

export const PropertiesLookupLimitContextProvider = createDataContext(
    PropertiesLookupLimitReducer,
    PropertiesLookupLimitDefaults,
    PropertiesLookupLimitContext
);

export default function usePropertiesLookupLimitContext() {
    return React.useContext(PropertiesLookupLimitContext);
}
