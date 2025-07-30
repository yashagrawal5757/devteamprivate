import React from 'react';
import useExploreLoad from '@hooks/useExploreLoad';

const NoProperties = () => {
    const { exploreLoad } = useExploreLoad();

    return (
        <div className="p-4 h-full">
            <p className="font-semibold border-b border-b-gray-300 pb-1">
                Properties
            </p>
            <div className="text-center h-9/10 flex flex-col justify-center">
                <img
                    className="w-4/5 mx-auto"
                    src="/no-properties.jpg"
                    alt="No properties found"
                />
                {exploreLoad.isExploreLoading && (
                    <>
                        <p className="font-semibold text-md mt-6 mb-3">
                            Loading results...
                        </p>
                        <p className="text-accent text-xs">Please wait!</p>
                    </>
                )}
                {!exploreLoad.isExploreLoading && (
                    <>
                        <p className="font-semibold text-md mt-6 mb-3">
                            No matching search results
                        </p>
                        <p className="text-accent text-xs">
                            Try again using more general <br /> search terms.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default NoProperties;
