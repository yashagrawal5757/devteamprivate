import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { DetailedPropertyType } from '../../state/property/PropertyDefaults';

interface PropertyContextType {
    state: DetailedPropertyType | undefined;
    dispatch: React.Dispatch<IReducerAction>;
}

const PropertyContext = React.createContext<PropertyContextType>(
    {} as PropertyContextType
);

export default PropertyContext;
