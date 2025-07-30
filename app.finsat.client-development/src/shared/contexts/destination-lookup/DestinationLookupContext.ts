import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { DestinationCoordinates } from '@state/destination-lookup/DestinationLookupDefaults';

interface DestinationLookupContextType {
    state: DestinationCoordinates | undefined;
    dispatch: React.Dispatch<IReducerAction>;
}

const DestinationLookupContext =
    React.createContext<DestinationLookupContextType>(
        {} as DestinationLookupContextType
    );

export default DestinationLookupContext;
