import React from 'react';
import PropertiesReducer from '../../state/properties/PropertiesReducer';
import { PropertiesDefaults } from '../../state/properties/PropertiesDefaults';
import PropertiesContext from './PropertiesContext';
import createDataContext from '@contexts/createDataContext';

export const PropertiesContextProvider = createDataContext(
    PropertiesReducer,
    PropertiesDefaults,
    PropertiesContext
);

export default function usePropertiesContext() {
    return React.useContext(PropertiesContext);
}
