import { IonImageryProvider } from 'cesium';
import { MapTerrainType } from '../services/map.storage.service';
import React from 'react';

const useImageryProvider = () => {
    const [streetProvider] = React.useState(
        IonImageryProvider.fromAssetId(
            parseInt(process.env.REACT_APP_CESIUM_STREET_IMAGERY_ID!)
        )
    );

    const [satelliteProvider] = React.useState(
        IonImageryProvider.fromAssetId(
            parseInt(process.env.REACT_APP_CESIUM_SATELLITE_IMAGERY_ID!)
        )
    );

    const getProvider = (terrainType: MapTerrainType) => {
        switch (terrainType) {
            case MapTerrainType.STREET:
                return streetProvider;
            case MapTerrainType.SATELLITE:
                return satelliteProvider;
        }
    };

    return {
        getProvider
    };
};

export default useImageryProvider;
