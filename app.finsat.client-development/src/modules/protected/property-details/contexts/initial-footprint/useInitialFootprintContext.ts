import React from 'react';
import createDataContext from '@contexts/createDataContext';
import InitialFootprintReducer from '../../state/initial-footprint/InitialFootprintReducer';
import InitialFootprintDefaults from '../../state/initial-footprint/InitialFootprintDefaults';
import InitialFootprintContext from './InitialFootprintContext';

export const InitialFootprintContextProvider = createDataContext(
    InitialFootprintReducer,
    InitialFootprintDefaults,
    InitialFootprintContext
);

export default function useInitialFootprintContext() {
    return React.useContext(InitialFootprintContext);
}
