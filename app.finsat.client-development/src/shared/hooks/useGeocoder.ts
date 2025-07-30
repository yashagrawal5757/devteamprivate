import axios from 'axios';
import {
    createWorldTerrainAsync,
    GeocoderService,
    IonGeocoderService,
    Viewer
} from 'cesium';

const useGeocoder = () => {
    const searchByAddress = async (
        searchText: string
    ): Promise<GeocoderService.Result[]> => {
        const viewer = new Viewer('pseudoCesiumContainer', {
            terrainProvider: await createWorldTerrainAsync(),
            baseLayerPicker: true,
            requestRenderMode: true,
            maximumRenderTimeChange: Infinity
        });

        const scene = viewer.scene;

        const geocoder = new IonGeocoderService({ scene });

        return geocoder.geocode(searchText);
    };

    const searchByCoordinatesViaGoogle = (
        latitude: number,
        longitude: number
    ) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_SOLAR_API_KEY}`;

        return axios.get<GoogleGeocoderApiResponse>(url);
    };

    const searchByCoordinatesViaNominatim = (
        latitude: number,
        longitude: number
    ) => {
        const url = `${process.env.REACT_APP_NOMINATIM_SERVICE}/reverse?lat=${latitude}&lon=${longitude}&zoom=18&format=jsonv2`;

        return axios.get<NominatimGeocoderApiResponse>(url);
    };

    return {
        searchByAddress,
        searchByCoordinatesViaGoogle,
        searchByCoordinatesViaNominatim
    };
};

export type GoogleGeocoderApiResponse = {
    plus_code: GoogleGeocoderPlusCodeApiResponse;
    results: Array<GoogleGeocoderResultApiResponse>;
    status: string;
};

type GoogleGeocoderPlusCodeApiResponse = {
    compound_code: string;
    global_code: string;
};

type GoogleGeocoderResultApiResponse = {
    address_components: Array<GoogleGeocoderResultAddressComponentApiResponse>;
    formatted_address: string;
    geometry: GoogleGeocoderResultGeometryApiResponse;
    navigation_points: Array<GoogleGeocoderResultNavigationPoint>;
    place_id: string;
    plus_code: GoogleGeocoderPlusCodeApiResponse;
    type: Array<string>;
};

type GoogleGeocoderResultAddressComponentApiResponse = {
    long_name: string;
    short_name: string;
    types: Array<string>;
};

type GoogleGeocoderResultGeometryApiResponse = {
    location: GoogleGeocoderResultGeometryLocationApiResponse;
    location_type: string;
    viewport: GoogleGeocoderResultGeometryViewport;
};

type GoogleGeocoderResultGeometryLocationApiResponse = {
    lat: number;
    lng: number;
};

type GoogleGeocoderResultGeometryViewport = {
    northeast: GoogleGeocoderResultGeometryLocationApiResponse;
    southwest: GoogleGeocoderResultGeometryLocationApiResponse;
};

type GoogleGeocoderResultNavigationPoint = {
    location: GoogleGeocoderResultGeometryLocationApiResponse;
};

export type NominatimGeocoderApiResponse = {
    address: NominatimGeocoderAddressApiResponse;
    addresstype: string;
    boundingbox: Array<string>;
    category: string;
    display_name: string;
    importance: number;
    lat: string;
    licence: string;
    lon: string;
    name: string;
    osm_id: number;
    osm_type: string;
    place_id: number;
    place_rank: number;
    type: string;
};

type NominatimGeocoderAddressApiResponse = {
    city?: string;
    country?: string;
    house_number?: string;
    postcode?: string;
    road?: string;
};

export default useGeocoder;
