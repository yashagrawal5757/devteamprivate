import React from 'react';
import createDataContext from '@contexts/createDataContext';
import VariationsReducer from '../../state/variations/VariationsReducer';
import VariationsDefaults from '../../state/variations/VariationsDefaults';
import VariationsContext from './VariationsContext';

export const VariationsContextProvider = createDataContext(
    VariationsReducer,
    VariationsDefaults,
    VariationsContext
);

export default function useVariationsContext() {
    return React.useContext(VariationsContext);
}
