import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { DashboardDataType } from '@dashboard/state/dashboard/DashboardDefaults';

interface DashboardContextType {
    state: DashboardDataType;
    dispatch: React.Dispatch<IReducerAction>;
}

const DashboardContext = React.createContext<DashboardContextType>(
    {} as DashboardContextType
);

export default DashboardContext;
