import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { PropertiesLookupLimit } from '../../state/properties-lookup-limit/PropertiesLookupLimitDefaults';

interface PropertiesLookupLimitContextType {
    state: PropertiesLookupLimit;
    dispatch: React.Dispatch<IReducerAction>;
}

const PropertiesLookupLimitContext =
    React.createContext<PropertiesLookupLimitContextType>(
        {} as PropertiesLookupLimitContextType
    );

export default PropertiesLookupLimitContext;
