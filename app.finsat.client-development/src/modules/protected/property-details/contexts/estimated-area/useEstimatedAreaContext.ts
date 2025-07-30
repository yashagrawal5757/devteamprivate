import React from 'react';
import createDataContext from '@contexts/createDataContext';
import EstimatedAreaContext from './EstimatedAreaContext';
import EstimatedAreaReducer from '../../state/estimated-area/EstimatedAreaReducer';
import EstimatedAreaDefaults from '../../state/estimated-area/EstimatedAreaDefaults';

export const EstimatedAreaContextProvider = createDataContext(
    EstimatedAreaReducer,
    EstimatedAreaDefaults,
    EstimatedAreaContext
);

export default function useEstimatedAreaContext() {
    return React.useContext(EstimatedAreaContext);
}
