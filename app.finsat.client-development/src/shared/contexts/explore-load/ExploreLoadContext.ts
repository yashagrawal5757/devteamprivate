import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { ExploreLoadType } from '@state/explore-load/ExploreLoadDefaults';

interface ExploreLoadContextType {
    state: ExploreLoadType;
    dispatch: React.Dispatch<IReducerAction>;
}

const ExploreLoadContext = React.createContext<ExploreLoadContextType>(
    {} as ExploreLoadContextType
);

export default ExploreLoadContext;
