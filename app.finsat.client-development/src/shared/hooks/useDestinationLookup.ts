import { DestinationLookupActions } from '@state/destination-lookup/DestinationLookupActions';
import useDestinationLookupContext from '../contexts/destination-lookup/useDestinationLookupContext';
import { useState } from 'react';
import {
    GeocoderService,
    Rectangle,
    Math,
    Cartesian3,
    Cartographic
} from 'cesium';
import useGeocoder from './useGeocoder';

const useDestinationLookup = () => {
    const [searchDestinations, setSearchDestinations] = useState<
        GeocoderService.Result[]
    >([]);
    const [location, setLocation] = useState<string>('');

    const destinationLookupContext = useDestinationLookupContext();
    const geocoder = useGeocoder();

    const setDestination = (latitude: number, longitude: number): void => {
        destinationLookupContext.dispatch({
            type: DestinationLookupActions.SET_DESTINATION,
            payload: { latitude, longitude }
        });
    };

    const clearDestination = (): void => {
        destinationLookupContext.dispatch({
            type: DestinationLookupActions.CLEAR_DESTINATION
        });
    };

    /**
     * Search for a destination in the geocoder service.
     * @param {string} searchText The text to search for.
     */
    const displaySearchDestination = (searchText: string): void => {
        geocoder
            .searchByAddress(searchText)
            .then((result) => {
                setSearchDestinations(result);
            })
            .catch((err) => {
                console.error('err', err);
            });
    };

    /**
     * Called when a destination from the search list is clicked.
     *
     * Sets the value of the location input to the name of the destination,
     * and sets the latitude and longitude of the destination in the
     * destination lookup context. Clears the search results.
     *
     * @param {GeocoderService.Result} destinationResult - The result of the
     *   geocoder search that was clicked.
     */
    const handleDestinationClick = (
        destinationResult: GeocoderService.Result
    ) => {
        setLocation(destinationResult.displayName);

        let latitude: number = 0;
        let longitude: number = 0;

        if (destinationResult.destination instanceof Rectangle) {
            const rectangularCenter = Rectangle.center(
                destinationResult.destination
            );

            latitude = Math.toDegrees(rectangularCenter.latitude);
            longitude = Math.toDegrees(rectangularCenter.longitude);
            // const altitude = rectangularCenter.height;
        }

        if (destinationResult.destination instanceof Cartesian3) {
            const cartographic = Cartographic.fromCartesian(
                destinationResult.destination
            );

            latitude = cartographic.latitude;
            longitude = cartographic.longitude;
            // const altitude = cartographic.height;
        }

        setDestination(latitude, longitude);

        setSearchDestinations([]);
    };

    /**
     * Clears the location input field and the search results.
     */
    const clearLocation = () => {
        setLocation('');
        setSearchDestinations([]);
    };

    /**
     * @returns An object with the following properties:
     * - searchDestinations: The list of destinations returned by the geocoder service.
     * - location: The current value of the location input field.
     * - displaySearchDestination: A function that takes a search text and displays the search results.
     * - handleDestinationClick: A function that takes a destination result and sets the location input field and destination lookup context.
     * - setLocation: A function that sets the location input field.
     * - clearLocation: A function that clears the location input field and search results.
     */
    return {
        destination: destinationLookupContext.state,
        searchDestinations,
        location,
        displaySearchDestination,
        handleDestinationClick,
        setLocation,
        clearLocation,
        clearDestination
    };
};

export default useDestinationLookup;
