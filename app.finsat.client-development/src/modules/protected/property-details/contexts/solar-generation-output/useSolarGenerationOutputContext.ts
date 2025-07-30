import React from 'react';
import createDataContext from '@contexts/createDataContext';
import SolarGenerationOutputReducer from '../../state/solar-generation-output/SolarGenerationOutputReducer';
import SolarGenerationOutputDefaults from '../../state/solar-generation-output/SolarGenerationOutputDefaults';
import SolarGenerationOutputContext from './SolarGenerationOutputContext';

export const SolarGenerationOutputContextProvider = createDataContext(
    SolarGenerationOutputReducer,
    SolarGenerationOutputDefaults,
    SolarGenerationOutputContext
);

export default function useSolarGenerationOutputContext() {
    return React.useContext(SolarGenerationOutputContext);
}
