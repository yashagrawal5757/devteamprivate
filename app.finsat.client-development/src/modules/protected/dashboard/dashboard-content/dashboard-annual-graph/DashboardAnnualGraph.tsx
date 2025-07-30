import React from 'react';
import Chart from 'react-apexcharts';
import useDashboardAnnualGraph from './hooks/useDashboardAnnualGraph';

const DashboardAnnualGraph = () => {
    const { selectedTab, chartDonut, activeData, annualData, setSelectedTab } =
        useDashboardAnnualGraph();

    return (
        <div className="w-2/5 ml-2">
            {/* <div className="flex flex-row justify-end mb-4">
                <div className="flex h-max p-1 border border-gray-300 rounded-lg shadow-lg">
                    <button
                        className={`w-44 h-8 rounded-md text-sm font-medium transition-all ${
                            selectedTab === 'revenue'
                                ? 'bg-blue-500 text-white'
                                : 'text-primary'
                        }`}
                        onClick={() => setSelectedTab('revenue')}
                    >
                        <p>Revenue YTD</p>
                    </button>
                    <button
                        className={`w-44 h-8 rounded-md text-sm font-medium transition-all ${
                            selectedTab === 'solar'
                                ? 'bg-blue-500 text-white'
                                : 'text-primary'
                        }`}
                        onClick={() => setSelectedTab('solar')}
                    >
                        <p>Solar Generation YTD</p>
                    </button>
                </div>
            </div> */}
            <div className="flex flex-col items-center h-full">
                <div className="flex flex-col justify-center items-center w-full mb-4 h-1/2 border border-gray-300 rounded-lg">
                    <p className="text-5xl font-semibold">
                        {annualData.revenue.amount}
                    </p>
                    <p className="flex font-semibold mt-4">
                        {annualData.revenue.label} Generation (YTD)
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center w-full h-1/2 border border-gray-300 rounded-lg">
                    <p className="text-5xl font-semibold">
                        {annualData.solar.amount}
                    </p>
                    <p className="flex font-semibold mt-4">
                        {annualData.solar.label} Generation (YTD)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardAnnualGraph;
