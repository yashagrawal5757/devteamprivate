import React from 'react';
import useDashboard from '@dashboard/hooks/dashboard/useDashboard';
import NumberUtils from '@services/numberUtils';

const useDashboardCashFlowGraph = () => {
    const { dashboard } = useDashboard();

    const chartOptions = (): any => {
        return {
            chart: {
                type: 'bar',
                toolbar: { show: false },
                zoom: { enabled: false }
            },
            title: {
                text: 'Net Annual Cash Flows (Post-Investment)',
                align: 'left',
                style: { fontSize: '16px', fontWeight: 'bold' }
            },
            xaxis: {
                categories: dashboard.cashFlowPredictions.map(
                    (item) => item.year
                ),
                title: {
                    text: 'Time',
                    style: { fontWeight: 'bold', fontSize: '14px' }
                },
                labels: {
                    formatter: (val: number, index: number) => {
                        if (dashboard.cashFlowPredictions.length > 20) {
                            return index % 5 === 0 ? val.toString() : '';
                        } else {
                            return val.toString();
                        }
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Cash Flow',
                    style: { fontWeight: 'bold', fontSize: '14px' }
                },
                labels: {
                    formatter: (value: any) =>
                        `${NumberUtils.formatWithCommas(value)}€`
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: false,
                    columnWidth: '50%'
                }
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                theme: 'light',
                x: {
                    formatter: (value: number) => `Year: ${value}`
                },
                y: {
                    formatter: (value: any) => `${value.toFixed(0)}€`
                }
            },
            colors: ['#1C88EC']
        };
    };

    const chartSeries = (): any => {
        return [
            {
                name: 'Cash Flow',
                data: dashboard.cashFlowPredictions.map((item) =>
                    item.cashFlow.toFixed(2)
                )
            }
        ];
    };

    return { chartOptions, chartSeries };
};

export default useDashboardCashFlowGraph;
