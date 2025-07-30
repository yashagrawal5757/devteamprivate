import React from 'react';
import Chart from 'react-apexcharts';
import { IoChevronDownOutline } from 'react-icons/io5';
import { FcInfo } from 'react-icons/fc';
import SimulationDataOutputTabs from './tabs/SimulationDataOutputTabs';

const SimulationDataOutput = () => {
    const chartData: any = {
        series: [15, 60, 25],
        options: {
            chart: {
                width: 380,
                type: 'pie'
            },
            labels: ['Low risk', 'Medium risk', 'Hight risk'],
            colors: ['#00E396', '#008FFB', '#FF4560'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            ]
        }
    };

    return (
        <div className="p-4 bg-gray-50 overflow-y-auto h-full">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col w-6/19 items-center border border-gray-300 rounded-lg py-4 bg-white">
                    <p className="text-gray-400 font-semibold text-sm">
                        Total Buildings
                    </p>
                    <p className="font-semibold pt-2 text-sm">154</p>
                </div>
                <div className="flex flex-col w-6/19 items-center border border-gray-300 rounded-lg py-4 bg-white">
                    <p className="text-gray-400 font-semibold text-sm">
                        Average Risk
                    </p>
                    <p className="font-semibold pt-2 text-sm">35%</p>
                </div>
                <div className="flex flex-col w-6/19 items-center border border-gray-300 rounded-lg py-4 bg-white">
                    <p className="text-gray-400 font-semibold text-sm">
                        Region
                    </p>
                    <p className="font-semibold pt-2 text-sm">Manhattan</p>
                </div>
            </div>
            <SimulationDataOutputTabs />
            <div className="mt-12">
                <h1 className="font-semibold text-xl mb-4">Overall</h1>
                <div className="border border-gray-300 rounded-lg p-6 bg-white">
                    <div className="flex flex-row justify-between border-b border-b-gray-300 py-4 items-center">
                        <p className="w-3/5 text-gray-400 font-semibold">
                            Average flood risk:
                        </p>
                        <p className="w-1/5 font-semibold">35%</p>
                    </div>
                    <div className="flex flex-row justify-between border-b border-b-gray-300 py-4 items-center">
                        <p className="w-3/5 text-gray-400 font-semibold">
                            Average flood depth:
                        </p>
                        <p className="w-1/5 font-semibold">15cm</p>
                    </div>
                    <div className="flex flex-row justify-between border-b border-b-gray-300 py-4 items-center">
                        <p className="w-3/5 text-gray-400 font-semibold">
                            Average resilience:
                        </p>
                        <p className="w-1/5 font-semibold">2</p>
                    </div>
                    <div className="flex flex-row justify-between border-b border-b-gray-300 py-4 items-center">
                        <p className="w-3/5 text-gray-400 font-semibold">
                            Average flood expectancy over the years:
                        </p>
                        <p className="w-1/5 font-semibold">7 years</p>
                    </div>
                    <div className="flex flex-row justify-between py-4 items-center">
                        <p className="w-3/5 text-gray-400 font-semibold">
                            Average comparison of buildings to average regional
                            flood risk:
                        </p>
                        <p className="w-1/5 font-semibold">15% higher</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row p-2 bg-white border border-primary rounded-lg my-8">
                <div className="p-1">
                    <FcInfo size={28} />
                </div>
                <div className="ml-1 p-1">
                    <p className="text-primary pt-1 font-semibold">
                        Additional Info
                    </p>
                    <p className="mt-4 text-gray-400 font-semibold">
                        Flood Risk
                    </p>
                    <p className="italic font-semibold">
                        0-20%: Low Risk 21-50%: Medium Risk 51-100%: High Risk
                    </p>
                    <p className="mt-4 text-gray-400 font-semibold">
                        Resilience Score:
                    </p>
                    <p className="italic font-semibold">
                        Goes from 1 to 5, where 1 is the lowest.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SimulationDataOutput;
