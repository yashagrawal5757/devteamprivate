import React from 'react';
import useLoading from '@hooks/useLoading';
import { FcSearch } from 'react-icons/fc';

const NoWatchlists = () => {
    const { loading } = useLoading();

    return (
        <div className="p-4 pt-0 h-full">
            <div className="text-center h-9/10 flex flex-col justify-center">
                <img
                    className="w-1/4 mx-auto"
                    src="/no-watchlists.jpg"
                    alt="No properties found"
                />
                {!loading.isLoading && (
                    <>
                        <div className="flex flex-row items-center justify-center mt-6 mb-3">
                            <FcSearch size={18} />
                            <p className="font-semibold text-md ml-1">
                                Oops! Looks like you don't have any Watchlists
                                yet...
                            </p>
                        </div>
                        <p className="text-accent text-xs">
                            Use the search function to find properties and add
                            them to your <br /> Watchlist for easier tracking.
                        </p>
                    </>
                )}
                {loading.isLoading && (
                    <>
                        <div className="flex flex-row items-center justify-center mt-6 mb-3">
                            <FcSearch size={18} />
                            <p className="font-semibold text-md ml-1">
                                Loading results...
                            </p>
                        </div>
                        <p className="text-accent text-xs">Please wait!</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default NoWatchlists;
