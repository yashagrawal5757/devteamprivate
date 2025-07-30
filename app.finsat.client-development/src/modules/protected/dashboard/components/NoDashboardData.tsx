import React from 'react';

type NoDashboardDataProps = {
    errorMessage: boolean;
};

const NoDashboardData = ({ errorMessage }: NoDashboardDataProps) => {
    return (
        <div className="p-4">
            <div className="text-center flex flex-col justify-center mt-[2%]">
                <img
                    className="w-1/4 mx-auto"
                    src="/no-dashboard-data.jpg"
                    alt="No dashboard data found"
                />
                <p className="font-semibold text-md mt-6 mb-3">
                    {errorMessage
                        ? 'Your watchlist has no Variations!'
                        : 'Start building your Dashboard!'}
                </p>
                <p className="text-accent text-sm">
                    Start by searching for a location, add properties to your
                    watchlist <br /> and see the metrics appear here.
                </p>
            </div>
        </div>
    );
};

export default NoDashboardData;
