import React from 'react';
import Chart from 'react-apexcharts';
import useDashboardCashFlowGraph from './hooks/useDashboardCashFlowGraph';

const DashboardCashFlowGraph = () => {
    const { chartOptions, chartSeries } = useDashboardCashFlowGraph();

    return (
        <div className="w-3/5 p-4 pb-0 border border-gray-300 rounded-lg mr-2">
            <Chart
                options={chartOptions()}
                series={chartSeries()}
                type="bar"
                height="400px"
            />
        </div>
    );
};

export default DashboardCashFlowGraph;
