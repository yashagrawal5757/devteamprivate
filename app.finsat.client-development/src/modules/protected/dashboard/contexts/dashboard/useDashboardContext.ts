import React from 'react';
import createDataContext from '@contexts/createDataContext';
import DashboardReducer from '@dashboard/state/dashboard/DashboardReducer';
import DashboardDefaults from '@dashboard/state/dashboard/DashboardDefaults';
import DashboardContext from './DashboardContext';

export const DashboardContextProvider = createDataContext(
    DashboardReducer,
    DashboardDefaults,
    DashboardContext
);

export default function useDashboardContext() {
    return React.useContext(DashboardContext);
}
