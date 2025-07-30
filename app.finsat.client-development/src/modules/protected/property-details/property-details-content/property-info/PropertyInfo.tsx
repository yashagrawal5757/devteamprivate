import React from 'react';
import { AiOutlineCompass } from 'react-icons/ai';
import { HiOutlineBuildingOffice } from 'react-icons/hi2';
import { IoLayersOutline } from 'react-icons/io5';
import { LuCalendarDays } from 'react-icons/lu';
import { PiSolarRoofLight } from 'react-icons/pi';
import useProperty from '../../hooks/property/useProperty';
import { propertyGroupMapMetadata } from '@metadata/BuildingType.metadata';
import { buildingRoofShapeMetadata } from '@metadata/BuildingRoofShape.metadata';
import { buildingOrientationTypeMetadata } from '@metadata/BuildingOrientationType.metadata';
import NumberUtils from '@services/numberUtils';
import useEstimatedArea from '../../hooks/estimated-area/useEstimatedArea';

const PropertyInfo = () => {
    const { property } = useProperty();
    const { estimatedArea } = useEstimatedArea();

    if (property === undefined) {
        return;
    }

    return (
        <div className="flex flex-row gap-4">
            {/* {property.type > 0 && (
                <div className="box-width flex flex-col p-2 pl-3 border border-accent-light rounded">
                    <div className="flex flex-row mt-1 mb-1 items-center">
                        <HiOutlineBuildingOffice size={22} className="mr-2" />
                        <div>
                            <p className="text-x">Type</p>
                            <p className="text-x font-semibold">
                                {propertyGroupMapMetadata[property.type]}
                            </p>
                        </div>
                    </div>
                </div>
            )} */}
            {/* <div className="box-width flex flex-col p-2 pl-3 border border-accent-light rounded">
                <div className="flex flex-row mt-1 mb-1 items-center">
                    <PiSolarRoofLight size={22} className="mr-2" />
                    <div>
                        <p className="text-x">Roof Shape</p>
                        <p className="text-x font-semibold">
                            {
                                buildingRoofShapeMetadata[
                                    property.schematic.roofShape
                                ]
                            }
                        </p>
                    </div>
                </div>
            </div> */}
            {/* <div className="box-width flex flex-col p-2 pl-3 border border-accent-light rounded">
                <div className="flex flex-row mt-1 mb-1 items-center">
                    <PiSolarRoofLight size={22} className="mr-2" />
                    <div>
                        <p className="text-x">Roof Size</p>
                        <p className="text-x font-semibold">
                            {property.schematic.roofSize.toFixed(2)} m²
                        </p>
                    </div>
                </div>
            </div> */}
            {/* {property.schematic.levels! > 0 && (
                <div className="box-width flex flex-col p-2 pl-3 border border-accent-light rounded">
                    <div className="flex flex-row mt-1 mb-1 items-center">
                        <IoLayersOutline size={22} className="mr-2" />
                        <div>
                            <p className="text-x">Levels</p>
                            <p className="text-x font-semibold">
                                {property.schematic.levels}
                            </p>
                        </div>
                    </div>
                </div>
            )} */}
            {/* {property.schematic.yearBuilt! > 0 && (
                <div className="box-width flex flex-col p-2 pl-3 border border-accent-light rounded">
                    <div className="flex flex-row mt-1 mb-1 items-center">
                        <LuCalendarDays size={22} className="mr-2" />
                        <div>
                            <p className="text-x">Year Built</p>
                            <p className="text-x font-semibold">
                                {property.schematic.yearBuilt}
                            </p>
                        </div>
                    </div>
                </div>
            )} */}
            {/* <div className="box-width flex flex-col p-2 pl-3 border border-accent-light rounded">
                <div className="flex flex-row mt-1 mb-1 items-center">
                    <AiOutlineCompass size={22} className="mr-2" />
                    <div>
                        <p className="text-x">Orientation</p>
                        <p className="text-x font-semibold">
                            {
                                buildingOrientationTypeMetadata[
                                property.schematic.orientation
                                ]
                            }
                        </p>
                    </div>
                </div>
            </div> */}
            <div className={`box-width flex flex-col p-2 pl-3 border border-accent-light rounded ${estimatedArea !== undefined ? 'visible' : 'invisible'}`}>
                <div className="flex flex-row mt-1 mb-1 items-center">
                    <HiOutlineBuildingOffice size={22} className="mr-2" />
                    <div>
                        <p className="text-x">Estimated Roof Size</p>
                        <p className="text-x font-semibold">
                            {NumberUtils.formatWithCommas(
                                (estimatedArea || 0).toFixed(0)
                            )}{' '}
                            m²
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyInfo;
