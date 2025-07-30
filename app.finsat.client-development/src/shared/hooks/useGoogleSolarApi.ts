// src/hooks/useGoogleSolarApi.ts
import { useState } from 'react';
import axios from 'axios';
import { useSolarContext } from '../contexts/google-solar/solarContextProvider';

export interface SolarApiResponse {
    name: string;
    center: {
        latitude: number;
        longitude: number;
    };
    imageryDate: {
        year: number;
        month: number;
        day: number;
    };
    postalCode: string;
    administrativeArea: string;
    statisticalArea: string;
    regionCode: string;
    solarPotential: {
        maxArrayPanelsCount: number;
        maxArrayAreaMeters2: number;
        maxSunshineHoursPerYear: number;
        carbonOffsetFactorKgPerMwh: number;
        wholeRoofStats: {
            areaMeters2: number;
            sunshineQuantiles: number[];
            groundAreaMeters2: number;
        };
        roofSegmentStats: {
            pitchDegrees: number;
            azimuthDegrees: number;
            stats: {
                areaMeters2: number;
                sunshineQuantiles: number[];
                groundAreaMeters2: number;
            };
            center: {
                latitude: number;
                longitude: number;
            };
            boundingBox: {
                sw: { latitude: number; longitude: number };
                ne: { latitude: number; longitude: number };
            };
            planeHeightAtCenterMeters: number;
        }[];
    };
}

const useGoogleSolarApi = () => {
    const [data, setData] = useState<SolarApiResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { setSolarData } = useSolarContext();

    const fetchSolarData = async ({
        lat,
        lng
    }: {
        lat: number;
        lng: number;
    }) => {
        setLoading(true);
        setError('');

        // try {
        //     const response = await axios.get<SolarApiResponse>(
        //         `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${lng}&key=${process.env.REACT_APP_GOOGLE_SOLAR_API_KEY}`
        //     );
        //     setData(response.data);
        //     setSolarData(response.data);
        // } catch (err: any) {
        //     setError('Failed to fetch solar data.');
        //     console.error('Solar API Error:', err);
        //     setSolarData(null);
        // } finally {
        //     setLoading(false);
        // }
    };

    return { data, loading, error, fetchSolarData };
};

export default useGoogleSolarApi;
