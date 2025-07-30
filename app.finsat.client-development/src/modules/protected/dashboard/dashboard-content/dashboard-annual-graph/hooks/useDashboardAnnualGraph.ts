import React, { useState } from 'react';
import useDashboard from '@dashboard/hooks/dashboard/useDashboard';
import useProfile from 'modules/protected/profile/hooks/useProfile';
import { getDisplayPowerUnit } from '@services/unitConversionUtils';
import { powerUnitMetadata } from '@metadata/PowerUnit.metadata';
import NumberUtils from '@services/numberUtils';

const useDashboardAnnualGraph = () => {
    const [selectedTab, setSelectedTab] = useState('revenue');

    const { dashboard } = useDashboard();
    const { powerUnit } = useProfile();

    const annualData = {
        revenue: {
            amount: `${NumberUtils.formatWithCommas(dashboard.annualPredictions.energyRevenue.toFixed(0))}€`,
            label: 'Revenue'
        },
        solar: {
            amount: `${NumberUtils.formatWithCommas(getDisplayPowerUnit(dashboard.annualPredictions.energyGeneration, powerUnit?.powerUnit).toFixed(0))} ${powerUnitMetadata[powerUnit?.powerUnit]}`,
            label: 'Solar'
        }
    };

    const activeData =
        selectedTab === 'revenue' ? annualData.revenue : annualData.solar;

    const chartDonut: any = {
        series: [100],
        options: {
            chart: {
                type: 'donut'
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '75%'
                    },
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                enabled: false
            },
            legend: {
                show: false
            },
            fill: {
                colors: [selectedTab === 'revenue' ? '#1C88EC' : '#F7D50B']
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 100
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            ]
        }
    };

    return {
        selectedTab,
        chartDonut,
        activeData,
        annualData,
        setSelectedTab
    };
};

export default useDashboardAnnualGraph;
