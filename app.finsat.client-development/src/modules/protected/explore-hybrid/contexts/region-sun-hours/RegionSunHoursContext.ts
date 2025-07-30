import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { RegionSunHours } from '../../state/region-sun-hours/RegionSunHoursDefaults';

interface RegionSunHoursContextType {
    state: RegionSunHours;
    dispatch: React.Dispatch<IReducerAction>;
}

const RegionSunHoursContext = React.createContext<RegionSunHoursContextType>(
    {} as RegionSunHoursContextType
);

export default RegionSunHoursContext;
