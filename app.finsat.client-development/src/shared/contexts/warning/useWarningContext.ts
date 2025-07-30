import React from 'react';

import WarningContext from './WarningContext';
import createDataContext from '@contexts/createDataContext';
import WarningReducer from '@state/warning/WarningReducer';
import WarningDefaults from '@state/warning/WarningDefaults';

export const WarningContextProvider = createDataContext(
    WarningReducer,
    WarningDefaults,
    WarningContext
);

export default function useWarningContext() {
    return React.useContext(WarningContext);
}
