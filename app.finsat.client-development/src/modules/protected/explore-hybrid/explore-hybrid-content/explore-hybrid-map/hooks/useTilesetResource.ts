import { IonResource } from 'cesium';
import { MapRenderType } from '../services/map.storage.service';

const useTilesetResource = () => {
    const getResource = (renderType: MapRenderType) => {
        switch (renderType) {
            case MapRenderType.PHOTOREALISTIC:
                return IonResource.fromAssetId(
                    parseInt(process.env.REACT_APP_CESIUM_PHOTOREALISTIC_ID!)
                );
            case MapRenderType.NORMAL:
                return IonResource.fromAssetId(
                    parseInt(process.env.REACT_APP_CESIUM_NORMAL_ID!)
                );
        }
    };

    return { getResource };
};

export default useTilesetResource;
