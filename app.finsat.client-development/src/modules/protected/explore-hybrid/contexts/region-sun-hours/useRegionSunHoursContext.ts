import React from 'react';
import createDataContext from '@contexts/createDataContext';
import RegionSunHoursReducer from '../../state/region-sun-hours/RegionSunHoursReducer';
import RegionSunHoursDefaults from '../../state/region-sun-hours/RegionSunHoursDefaults';
import RegionSunHoursContext from './RegionSunHoursContext';

export const RegionSunHoursContextProvider = createDataContext(
    RegionSunHoursReducer,
    RegionSunHoursDefaults,
    RegionSunHoursContext
);

export default function useRegionSunHoursContext() {
    return React.useContext(RegionSunHoursContext);
}
