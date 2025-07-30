import React, { useCallback, useEffect } from 'react';
import DashboardHeader from './dashboard-header/DashboardHeader';
import DashboardCashFlowGraph from './dashboard-cash-flow-graph/DashboardCashFlowGraph';
import DashboardAnnualGraph from './dashboard-annual-graph/DashboardAnnualGraph';
import DashboardMonthlyGraph from './dashboard-monthly-graph/DashboardMonthlyGraph';
import useDashboard from '@dashboard/hooks/dashboard/useDashboard';
import _ from 'lodash';
import useExistingWatchlists from './dashboard-header/hooks/useExistingWatchlists';
import NoDashboardData from '@dashboard/components/NoDashboardData';

const DashboardContent = () => {
    const { dashboard, errorMessage, onGetWatchlists, onGetData } =
        useDashboard();
    const {
        existingWatchlists,
        searchQuery,
        watchlistId,
        setSearchQuery,
        setWatchlistId
    } = useExistingWatchlists();

    const debouncedSearch = useCallback(
        _.debounce((value: string) => {
            onGetWatchlists(value);
        }, 500),
        []
    );

    useEffect(() => {
        debouncedSearch(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        if (existingWatchlists === undefined) {
            return;
        }

        if (existingWatchlists.length <= 0) {
            return;
        }

        if (watchlistId !== null) {
            return;
        }

        setWatchlistId(existingWatchlists[0]?.id);
    }, [existingWatchlists]);

    useEffect(() => {
        if (watchlistId === null) {
            return;
        }

        onGetData(watchlistId);
    }, [watchlistId]);

    return (
        <div className="px-8 py-4">
            <DashboardHeader
                searchQuery={searchQuery}
                watchlistId={watchlistId}
                setSearchQuery={setSearchQuery}
                setWatchlistId={setWatchlistId}
            />
            <div>
                {existingWatchlists.length <= 0 ||
                dashboard.cashFlowPredictions.length === 0 ||
                errorMessage ? (
                    <NoDashboardData
                        errorMessage={existingWatchlists.length > 0}
                    />
                ) : (
                    <div>
                        <div className="flex flex-row">
                            <DashboardCashFlowGraph />
                            <DashboardAnnualGraph />
                        </div>
                        <DashboardMonthlyGraph />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardContent;
