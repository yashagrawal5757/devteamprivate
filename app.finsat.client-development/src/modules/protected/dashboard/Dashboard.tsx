import React from 'react';
import DashboardContent from './dashboard-content/DashboardContent';
import { ExistingWatchlistsContextProvider } from './contexts/existing-watchlists/useExistingWatchlistsContext';
import { DashboardContextProvider } from './contexts/dashboard/useDashboardContext';

const Dashboard = () => {
    return (
        <div>
            <DashboardContextProvider>
                <ExistingWatchlistsContextProvider>
                    <DashboardContent />
                </ExistingWatchlistsContextProvider>
            </DashboardContextProvider>
        </div>
    );
};

export default Dashboard;
