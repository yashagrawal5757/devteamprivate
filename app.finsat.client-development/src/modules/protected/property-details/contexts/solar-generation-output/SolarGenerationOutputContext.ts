import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { SolarGenerationOutputType } from '../../state/solar-generation-output/SolarGenerationOutputDefaults';

interface SolarGenerationOutputContextType {
    state: SolarGenerationOutputType | undefined;
    dispatch: React.Dispatch<IReducerAction>;
}

const SolarGenerationOutputContext =
    React.createContext<SolarGenerationOutputContextType>(
        {} as SolarGenerationOutputContextType
    );

export default SolarGenerationOutputContext;
