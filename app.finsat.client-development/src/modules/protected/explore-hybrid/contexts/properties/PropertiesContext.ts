import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { Property } from '../../state/properties/PropertiesDefaults';

interface PropertiesContextType {
    state: Array<Property>;
    dispatch: React.Dispatch<IReducerAction>;
}

const PropertiesContext = React.createContext<PropertiesContextType>(
    {} as PropertiesContextType
);

export default PropertiesContext;
