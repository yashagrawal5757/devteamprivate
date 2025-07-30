import React from 'react';

import LoadingContext from './LoadingContext';

import createDataContext from '../createDataContext';
import LoadingReducer from '../../../state/loading/LoadingReducer';
import LoadingDefaults from '../../../state/loading/LoadingDefaults';

export const LoadingContextProvider = createDataContext(
    LoadingReducer,
    LoadingDefaults,
    LoadingContext
);

export default function useLoadingContext() {
    return React.useContext(LoadingContext);
}
