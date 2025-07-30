import React from 'react';

import ErrorContext from './ErrorContext';

import createDataContext from '../createDataContext';
import ErrorReducer from '../../../state/error/ErrorReducer';
import ErrorDefaults from '../../../state/error/ErrorDefaults';

export const ErrorContextProvider = createDataContext(
    ErrorReducer,
    ErrorDefaults,
    ErrorContext
);

export default function useErrorContext() {
    return React.useContext(ErrorContext);
}
