import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { PropertyFootprint } from '../../state/property-footprint/PropertyFootprintDefaults';

interface PropertyFootprintContextType {
    state: PropertyFootprint;
    dispatch: React.Dispatch<IReducerAction>;
}

const PropertyFootprintContext =
    React.createContext<PropertyFootprintContextType>(
        {} as PropertyFootprintContextType
    );

export default PropertyFootprintContext;
