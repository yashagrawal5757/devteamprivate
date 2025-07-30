import React from 'react';
import { BsBuildings, BsHospital, BsBuildingLock } from 'react-icons/bs';
import { BiBuildingHouse } from 'react-icons/bi';
import { TbBuildingEstate } from 'react-icons/tb';
import { MdOutlineRealEstateAgent } from 'react-icons/md';
import { PiCity, PiBuildingApartment, PiMapPinArea } from 'react-icons/pi';
import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Routes, RoutingKeys } from '@routes/router.keys';

const PortfolioOverview = () => {
    const navigate = useNavigate();

    const navigateToPortfolioUpload = (e: any) => {
        e.preventDefault();
        navigate(RoutingKeys[Routes.PORTFOLIO_UPLOAD]);
    };

    return (
        <div className="mx-12 my-8">
            <h1 className="text-2xl font-semibold">My Portfolio</h1>
            <div className="flex flex-row mt-12">
                <div className="w-4/5">
                    <p className="text-xl font-semibold mb-8">Find your data</p>
                </div>
                <div className="w-1/5 ml-12">
                    <p className="text-xl font-semibold mb-8">
                        Upload your data
                    </p>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="w-4/5">
                    <div className="grid grid-cols-4 gap-6">
                        <div className="flex flex-col px-8 py-12 border border-gray-200 rounded-md cursor-pointer">
                            <PiCity size={40} className="text-primary" />
                            <p className="text-lg py-4 font-semibold">
                                All data
                            </p>
                            <p className="text-base text-gray-400">
                                Please click here to find all your data
                            </p>
                        </div>
                        <div className="flex flex-col px-8 py-12 border border-gray-200 rounded-md cursor-pointer">
                            <BsBuildings size={40} className="text-primary" />
                            <p className="text-lg py-4 font-semibold">
                                Residential
                            </p>
                            <p className="text-base text-gray-400">
                                Please click here to find all residential data
                            </p>
                        </div>
                        <div className="flex flex-col px-8 py-12 border border-gray-200 rounded-md cursor-pointer">
                            <PiBuildingApartment
                                size={40}
                                className="text-primary"
                            />
                            <p className="text-lg py-4 font-semibold">
                                Commercial
                            </p>
                            <p className="text-base text-gray-400">
                                Please click here to find all commercial data
                            </p>
                        </div>
                        <div className="flex flex-col px-8 py-12 border border-gray-200 rounded-md cursor-pointer">
                            <BiBuildingHouse
                                size={40}
                                className="text-primary"
                            />
                            <p className="text-lg py-4 font-semibold">
                                Mixed-use properties
                            </p>
                            <p className="text-base text-gray-400">
                                Please click here to find all mixed-use
                                properties data
                            </p>
                        </div>
                        <div className="flex flex-col px-8 py-12 border border-gray-200 rounded-md cursor-pointer">
                            <BsHospital size={40} className="text-primary" />
                            <p className="text-lg py-4 font-semibold">
                                Hospitality
                            </p>
                            <p className="text-base text-gray-400">
                                Please click here to find all hospitality data
                            </p>
                        </div>
                        <div className="flex flex-col px-8 py-12 border border-gray-200 rounded-md cursor-pointer">
                            <BsBuildingLock
                                size={40}
                                className="text-primary"
                            />
                            <p className="text-lg py-4 font-semibold">
                                Special purpose
                            </p>
                            <p className="text-base text-gray-400">
                                Please click here to find all special purpose
                                data
                            </p>
                        </div>
                        <div className="flex flex-col px-8 py-12 border border-gray-200 rounded-md cursor-pointer">
                            <TbBuildingEstate
                                size={40}
                                className="text-primary"
                            />
                            <p className="text-lg py-4 font-semibold">
                                Real Estate Investment Trusts (REITs)
                            </p>
                            <p className="text-base text-gray-400">
                                Please click here to find all REITs data
                            </p>
                        </div>
                        <div className="flex flex-col px-8 py-12 border border-gray-200 rounded-md cursor-pointer">
                            <MdOutlineRealEstateAgent
                                size={40}
                                className="text-primary"
                            />
                            <p className="text-lg py-4 font-semibold">
                                Real estate debt investments
                            </p>
                            <p className="text-base text-gray-400">
                                Please click here to find all real estate debt
                                investments data
                            </p>
                        </div>
                        <div className="flex flex-col px-8 py-12 border border-gray-200 rounded-md cursor-pointer">
                            <PiMapPinArea size={40} className="text-primary" />
                            <p className="text-lg py-4 font-semibold">Land</p>
                            <p className="text-base text-gray-400">
                                Please click here to find all land data
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="w-1/5 ml-6 border border-primary border-dashed rounded-md flex items-center"
                    onClick={navigateToPortfolioUpload}
                >
                    <IoMdAdd
                        size={100}
                        className="text-primary mx-auto cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default PortfolioOverview;
