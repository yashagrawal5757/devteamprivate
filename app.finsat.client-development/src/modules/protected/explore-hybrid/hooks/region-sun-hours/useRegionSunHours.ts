import React from 'react';
import useRegionSunHoursContext from '../../contexts/region-sun-hours/useRegionSunHoursContext';
import useRegionSunHoursApi from './useRegionSunHoursApi';
import { RegionSunHoursActions } from '../../state/region-sun-hours/RegionSunHoursActions';
import useError from '@hooks/useError';
import useLocationFrame from '../location-frame/useLocationFrame';
import useGeometry from '@hooks/useGeometry';

const useRegionSunHours = () => {
    const regionSunHoursContext = useRegionSunHoursContext();
    const regionSunHoursApi = useRegionSunHoursApi();
    const { locationFrame } = useLocationFrame();
    const { calculateCentroid } = useGeometry();
    const error = useError();

    const getRegionSunHours = () => {
        let { latitude, longitude } = calculateCentroid(
            locationFrame!.topLeft,
            locationFrame!.topRight,
            locationFrame!.bottomLeft,
            locationFrame!.bottomRight
        );

        regionSunHoursApi
            .getRegionSunHours(latitude, longitude)
            .then((response) => {
                const { data } = response;

                regionSunHoursContext.dispatch({
                    type: RegionSunHoursActions.SET_REGION_SUN_HOURS,
                    payload: data
                });
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            });
    };

    return {
        regionSunHours: regionSunHoursContext.state,
        getRegionSunHours
    };
};

export default useRegionSunHours;
