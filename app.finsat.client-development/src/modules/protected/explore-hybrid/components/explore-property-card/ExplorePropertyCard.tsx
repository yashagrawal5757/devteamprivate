import React, { useCallback } from 'react';
import './ExplorePropertyCard.css';
import '../../explore-hybrid-content/explore-hybrid-properties/ExploreHybridProperties.css';
import { BuildingType, PropertyGroupType } from '@enums/BuildingType';
import {
    propertyGroupMapMetadata,
    propertyGroupTypeMetadata
} from '@metadata/BuildingType.metadata';
import { PiMapPinAreaFill, PiPlusBold } from 'react-icons/pi';
import { BsBoundingBoxCircles } from 'react-icons/bs';
import { FiMapPin } from 'react-icons/fi';
import { RiParkingBoxLine } from 'react-icons/ri';
import { Routes, RoutingKeys } from '@routes/router.keys';
import { useNavigate } from 'react-router-dom';
import DateUtils from '@services/dateUtils';
import useExploreWatchlist from '../../hooks/watchlist/useExploreWatchlist';
import { PropertySchematics } from '../../state/properties/PropertiesDefaults';
import Tooltip from '@ui/tooltip/Tooltip';
import NumberUtils from '@services/numberUtils';

type ExportPropertyCardProps = {
    id: string;
    name: string;
    type: BuildingType;
    location: string;
    // solarGeneration: SolarGenerationMetrics;
    schematics: PropertySchematics;
    addSinglePropertyToWatchlist: () => void;
};

const ExplorePropertyCard = ({
    id,
    name,
    type,
    location,
    // solarGeneration,
    schematics,
    addSinglePropertyToWatchlist
}: ExportPropertyCardProps) => {
    const {
        exploreWatchlist: { isMultiSelectActive, queue },
        addToWatchlistQueue,
        removeFromWatchlistQueue
    } = useExploreWatchlist();
    const navigate = useNavigate();

    const isChecked = useCallback(() => {
        return queue.findIndex((watchlistId) => watchlistId === id) !== -1;
    }, [queue]);

    const navigateToPropertyDetails = (e: any) => {
        e.preventDefault();
        navigate(`${RoutingKeys[Routes.PROPERTY_DETAILS]}`.replace(':id', id));
    };

    return (
        <div className="flex flex-row rounded-md border border-gray-300">
            <div
                className={`w-1/12 flex ${isChecked() ? 'bg-primary' : 'bg-gray-400'} p-2 rounded-l border-l border-l-gray-400 items-center justify-center`}
            >
                {isMultiSelectActive ? (
                    <div className="checkbox-property-card flex rounded-lg bg-white h-max">
                        <input
                            className="property-card-checkbox"
                            type="checkbox"
                            id={`property-card-checkbox-${id}`}
                            checked={isChecked()}
                            onChange={(event) => {
                                if (event.target.checked) {
                                    addToWatchlistQueue(id);
                                } else {
                                    removeFromWatchlistQueue(id);
                                }
                            }}
                        />
                        <label
                            htmlFor={`property-card-checkbox-${id}`}
                            className={isChecked() ? 'checked' : ''}
                        ></label>
                    </div>
                ) : (
                    <div
                        className="flex rounded bg-white h-max p-1 cursor-pointer"
                        onClick={addSinglePropertyToWatchlist}
                    >
                        <PiPlusBold className="text-primary" size={12} />
                    </div>
                )}
            </div>
            <div className="w-11/12 p-4">
                <div className="flex flex-col relative">
                    {/* <div className="absolute top-0 right-0 border border-gray-300 rounded-lg p-1">
                        <RiParkingBoxLine />
                    </div> */}
                    {/* <div className="absolute top-0 right-0 border border-gray-300 rounded p-1">
                            <PiSolarRoofLight />
                            </div> */}
                    <Tooltip message={name}>
                        <div
                            className="flex p-3 border border-gray-100 rounded-lg items-start justify-start cursor-pointer flex-col"
                            style={{ backgroundColor: '#E5F1FF' }}
                            onClick={navigateToPropertyDetails}
                        >
                            {/* {propertyGroupMapMetadata[type] ===
                            propertyGroupTypeMetadata[
                            PropertyGroupType.RESIDENTIAL
                            ] && ( */}
                            {/* <img
                            src="/residential.svg"
                            alt="Residential property"
                            width={40}
                        />
                        <p
                            className="text-xs font-semibold cursor-pointer pl-1"
                        >
                            {name}
                        </p> */}
                            {/* )} */}
                            {/* {propertyGroupMapMetadata[type] ===
                            propertyGroupTypeMetadata[
                            PropertyGroupType.COMMERCIAL
                            ] && (
                                <img
                                    src="/commercial.svg"
                                    alt="Commercial proeprty"
                                    width={40}
                                />
                            )}
                        {propertyGroupMapMetadata[type] ===
                            propertyGroupTypeMetadata[
                            PropertyGroupType.INDUSTRIAL
                            ] && (
                                <img
                                    src="/industrial.svg"
                                    alt="Industrial proeprty"
                                    width={40}
                                />
                            )} */}
                            <div className="flex flex-row justify-between mt-1 text-center">
                                <div className="flex flex-row w-full rounded-lg p-1 items-center justify-start">
                                    <div className="flex flex-row text-xs items-center">
                                        <div className="p-1 mr-1">
                                            <FiMapPin />
                                        </div>
                                        <p>{location}</p>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="flex flex-row justify-between mt-1 text-center">
                                <div className="flex flex-row w-full rounded-lg p-2 items-center justify-start text-xs">
                                    <BsBoundingBoxCircles />
                                    <div className="flex flex-row ml-2 items-center">
                                        <p className="mr-1">Property Size:</p>
                                        <p className="font-semibold">
                                            {schematics.size.toFixed(0)} m²
                                        </p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </Tooltip>
                </div>
                {/* <div className="flex flex-row justify-between mt-1 text-center">
                    <div className="flex flex-row w-full border border-gray-200 rounded-lg p-1 items-center justify-start">
                        {propertyGroupMapMetadata[type]?.toUpperCase() !==
                            'NONE' && (
                                <p className="text-x">
                                    {propertyGroupMapMetadata[type].toUpperCase()}
                                </p>
                            )}
                        <p
                            className="text-xs font-semibold cursor-pointer"
                            onClick={navigateToPropertyDetails}
                        >
                            {name}
                        </p>
                        <div className="flex flex-row text-xs items-center">
                            <div className="p-1 mr-1">
                                <FiMapPin />
                            </div>
                            <p>{location}</p>
                        </div>
                    </div>
                </div> */}
                <div className="flex flex-row justify-between mt-1 text-center">
                    {/* <div className="flex flex-row w-1/2 border border-gray-200 rounded p-2 items-center mr-1 justify-center">
                        <img src="/sun.svg" className="w-[20px]" />
                        <div className="flex flex-row ml-2">
                            <p className="text-xsm mr-1">City Sun Hours:</p>
                            <p className="text-xsm font-semibold">
                                {solarGeneration.totalSunHours.toFixed(0)}h{' '}
                                {DateUtils.getMinutes(
                                    solarGeneration.totalSunHours
                                ).toFixed(0)}
                                min
                            </p>
                        </div>
                    </div> */}
                    <div className="flex flex-row w-full border border-gray-200 rounded-lg p-2 items-center justify-start text-xs">
                        <BsBoundingBoxCircles />
                        <div className="flex flex-row ml-2">
                            <p className="mr-1">Property Size:</p>
                            <p className="font-semibold">
                                {NumberUtils.formatWithCommas(
                                    schematics.size.toFixed(0)
                                )}{' '}
                                m²
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExplorePropertyCard;
