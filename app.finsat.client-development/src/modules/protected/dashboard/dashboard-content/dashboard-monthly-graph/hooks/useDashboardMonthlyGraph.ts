import React from 'react';
import useDashboard from '@dashboard/hooks/dashboard/useDashboard';
import useProfile from 'modules/protected/profile/hooks/useProfile';
import { powerUnitMetadata } from '@metadata/PowerUnit.metadata';
import { getDisplayPowerUnit } from '@services/unitConversionUtils';
import NumberUtils from '@services/numberUtils';

const useDashboardMonthlyGraph = () => {
    const { dashboard } = useDashboard();
    const { powerUnit } = useProfile();

    const monthNames = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC'
    ];

    const getColorForEnergy = (coefficient: number) => {
        if (coefficient <= 9.5) return 'bg-blue-500';
        if (coefficient <= 19) return 'bg-indigo-400';
        if (coefficient <= 28) return 'bg-green-500';
        if (coefficient <= 37.7) return 'bg-yellow-400';
        if (coefficient <= 47) return 'bg-orange-500';
        if (coefficient <= 56.5) return 'bg-red-400';
        return 'bg-red-600';
    };

    const formattedData = dashboard.monthlyPredictions
        .sort((a, b) => a.month - b.month)
        .map((data) => ({
            month: monthNames[data.month],
            energy: `${NumberUtils.formatWithCommas(getDisplayPowerUnit(data.energyGeneration, powerUnit?.powerUnit).toFixed(2))} ${powerUnitMetadata[powerUnit?.powerUnit]}`,
            revenue: `${NumberUtils.formatWithCommas(data.energyRevenue.toFixed(0))}€`,
            color: getColorForEnergy(data.coefficient)
        }));

    return { formattedData };
};

export default useDashboardMonthlyGraph;
