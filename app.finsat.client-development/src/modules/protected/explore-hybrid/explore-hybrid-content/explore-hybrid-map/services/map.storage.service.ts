export enum MapRenderType {
    NORMAL = 0,
    PHOTOREALISTIC
}

export enum MapPerspective {
    TWO_DIMENSION = 0,
    THREE_DIMENSION
}

export enum MapTerrainType {
    STREET = 0,
    SATELLITE
}

export type MapOptionsType = {
    renderType: MapRenderType;
    perspective: MapPerspective;
    terrainType: MapTerrainType;
};

export type CartesianCoordinate = {
    latitude: number;
    longitude: number;
};

export type MapPositionType = {
    latitude: number;
    longitude: number;
    height: number;
};

enum MapStorageKeys {
    SHOW_SIMULATION_AREAS = 0,
    MAP_OPTIONS,
    MAP_POSITION
}

const MapKeys: Record<MapStorageKeys, string> = {
    [MapStorageKeys.SHOW_SIMULATION_AREAS]: 'map-options-show-simulation-areas',
    [MapStorageKeys.MAP_OPTIONS]: 'map-options',
    [MapStorageKeys.MAP_POSITION]: 'map-position'
};

class MapStorageService {
    /**
     * Retrieves the option for showing simulation areas from session storage.
     * If no value is found, it defaults to false.
     *
     * @returns {boolean} - Returns true if the option is enabled, false otherwise.
     */
    static getShowSimulationAreasOption(): boolean {
        const storageValue = sessionStorage.getItem(
            MapKeys[MapStorageKeys.SHOW_SIMULATION_AREAS]
        );

        if (storageValue === null) {
            return false;
        }

        return JSON.parse(storageValue);
    }

    /**
     * Sets the option for showing simulation areas in session storage.
     * If no value is provided, it will be set to false.
     *
     * @param {boolean} value - Set to true to enable showing simulation areas, false to disable.
     */
    static setShowSimulationAreasOption(value: boolean): void {
        sessionStorage.setItem(
            MapKeys[MapStorageKeys.SHOW_SIMULATION_AREAS],
            JSON.stringify(value)
        );
    }

    /**
     * Retrieves the map options from session storage.
     * If no value is found, it returns default map options with
     * NORMAL render type, TWO_DIMENSION perspective, and STREET terrain type.
     *
     * @returns {MapOptionsType} - The map options stored in session storage or default values.
     */
    static getMapOptions(): MapOptionsType {
        const storageValue = sessionStorage.getItem(
            MapKeys[MapStorageKeys.MAP_OPTIONS]
        );

        if (storageValue === null) {
            return {
                renderType: MapRenderType.NORMAL,
                perspective: MapPerspective.TWO_DIMENSION,
                terrainType: MapTerrainType.SATELLITE
            };
        }

        return JSON.parse(storageValue);
    }

    /**
     * Sets the map options in session storage.
     *
     * @param {MapOptionsType} options - The map options to store in session storage.
     *
     * @example
     * MapStorageService.setMapOptions({
     *     renderType: MapRenderType.PHOTOREALISTIC,
     *     perspective: MapPerspective.THREE_DIMENSION,
     *     terrainType: MapTerrainType.SATELLITE
     * });
     */
    static setMapOptions(options: MapStorageService): void {
        sessionStorage.setItem(
            MapKeys[MapStorageKeys.MAP_OPTIONS],
            JSON.stringify(options)
        );
    }

    /**
     * Retrieves the map position from session storage.
     * If no value is found, it returns undefined.
     *
     * @returns {MapPositionType | undefined} - The map position stored in session storage or undefined.
     */
    static getMapPosition(): MapPositionType | undefined {
        const storageValue = sessionStorage.getItem(
            MapKeys[MapStorageKeys.MAP_POSITION]
        );

        if (storageValue === null) {
            return undefined;
        }

        return JSON.parse(storageValue);
    }

    /**
     * Sets the map position in session storage.
     *
     * @param {MapPositionType} position - The map position to store in session storage.
     *
     * @example
     * MapStorageService.setMapPosition({
     *     latitude: 24.774265,
     *     longitude: 46.673856,
     *     height: 1000
     * });
     */
    static setMapPosition(position: MapPositionType): void {
        sessionStorage.setItem(
            MapKeys[MapStorageKeys.MAP_POSITION],
            JSON.stringify(position)
        );
    }

    /**
     * Clears all map options stored in session storage.
     *
     * This is useful when logging out of the application, so that the user's
     * preferences are not persisted between sessions.
     */
    static clearMapStorageOptions() {
        for (const key of Object.values(MapKeys)) {
            sessionStorage.removeItem(key);
        }
    }
}

export default MapStorageService;
