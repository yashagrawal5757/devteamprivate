import React from 'react';
import ShowSimulationAreaOnMapReducer from '../../state/show-simulation/ShowSimulationAreaOnMapReducer';
import ShowSimulationAreaOnMapDefaults, {
    showSimulationAreasDefaultFn
} from '../../state/show-simulation/ShowSimulationAreaOnMapDefaults';
import ShowSimulationAreaOnMapContext from './ShowSimulationAreaOnMapContext';
import createPersistDataContext from '@contexts/createPersistDataContext';

export const ShowSimulationAreaOnMapContextProvider = createPersistDataContext(
    ShowSimulationAreaOnMapReducer,
    ShowSimulationAreaOnMapDefaults,
    ShowSimulationAreaOnMapContext,
    showSimulationAreasDefaultFn
);

export default function useShowSimulationAreaOnMapContext() {
    return React.useContext(ShowSimulationAreaOnMapContext);
}
