import React from 'react';
import useDashboardMonthlyGraph from './hooks/useDashboardMonthlyGraph';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import Tooltip from '@ui/tooltip/Tooltip';

const DashboardMonthlyGraph = () => {
    const { formattedData } = useDashboardMonthlyGraph();

    return (
        <div className="p-4 border border-gray-300 rounded-lg mt-4">
            <div className="flex flex-row justify-between">
                <h2 className="flex flex-row items-center font-bold mb-4">
                    Projected Monthly Energy Potential and Revenue
                    <span className="ml-1 text-gray-500">
                        <Tooltip message="Projections based on recent historical solar irradiance data.">
                            <IoMdInformationCircleOutline size={18} />
                        </Tooltip>
                    </span>
                </h2>
                <div className="flex flex-col items-center text-xs">
                    <div className="flex flex-row">
                        <div className="w-10 h-2 bg-blue-500" />
                        <div className="w-10 h-2 bg-indigo-400" />
                        <div className="w-10 h-2 bg-green-500" />
                        <div className="w-10 h-2 bg-yellow-400" />
                        <div className="w-10 h-2 bg-orange-500" />
                        <div className="w-10 h-2 bg-red-400" />
                        <div className="w-10 h-2 bg-red-600" />
                    </div>
                    <div className="flex flex-row justify-between w-full mt-0.5">
                        <span className="mr-2">Low Potential</span>
                        <span className="ml-2">High Potential</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4 pt-12 pb-4">
                {formattedData.map((data, index) => (
                    <div key={index} className="text-center">
                        {index % 2 === 0 ? (
                            <>
                                <p className="text-gray-500 text-xs pb-3">
                                    {data.energy}
                                </p>
                                <p className="text-black font-semibold text-xs pb-5">
                                    {data.revenue}
                                </p>
                                <div className="w-0.5 h-16 bg-gray-400 mx-auto"></div>
                            </>
                        ) : (
                            <>
                                <p className="text-white text-xs pb-3">
                                    {data.energy}
                                </p>
                                <p className="text-white font-semibold text-xs pb-5">
                                    {data.revenue}
                                </p>
                                <div className="w-0.5 h-16 bg-white mx-auto"></div>
                            </>
                        )}
                        <div className={`h-3 mx-auto my-2 ${data.color}`} />
                        <p className="text-xs text-start font-semibold">
                            {data.month}
                        </p>
                        {index % 2 !== 0 && (
                            <>
                                <div className="w-0.5 h-16 bg-gray-400 mx-auto mt-1"></div>
                                <p className="text-gray-500 text-xs pt-5">
                                    {data.energy}
                                </p>
                                <p className="text-black font-semibold text-xs pt-3">
                                    {data.revenue}
                                </p>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardMonthlyGraph;
