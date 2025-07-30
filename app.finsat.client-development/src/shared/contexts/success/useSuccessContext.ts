import React from 'react';

import SuccessContext from './SuccessContext';

import createDataContext from '../createDataContext';
import SuccessReducer from '../../../state/success/SuccessReducer';
import SuccessDefaults from '../../../state/success/SuccessDefaults';

export const SuccessContextProvider = createDataContext(
    SuccessReducer,
    SuccessDefaults,
    SuccessContext
);

export default function useSuccessContext() {
    return React.useContext(SuccessContext);
}
