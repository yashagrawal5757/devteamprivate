import React from 'react';
import { ExplorePropertiesSortOption } from '@enums/ExplorePropertiesSortOption';
import { explorePropertiesSortOptionMetadata } from '@metadata/ExplorePropertiesSortOption.metadata';
import Button from '@ui/buttons/button/Button';
import { BsSortDown } from 'react-icons/bs';
import {
    RiCheckboxMultipleBlankLine,
    RiCheckboxMultipleLine
} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { SortType } from '@enums/SortType';
import useExploreWatchlist from 'modules/protected/explore-hybrid/hooks/watchlist/useExploreWatchlist';
import usePinPoints from 'modules/protected/explore-hybrid/hooks/pin-points/usePinPoints';

const ExplorePropertiesHeader = () => {
    const { pinPoints } = usePinPoints();

    const {
        exploreWatchlist: { isMultiSelectActive, queue },
        toggleWatchlistModal,
        togglePropertiesMultiSelect
    } = useExploreWatchlist();

    return (
        <>
            <div className="flex flex-row justify-between py-3 border-b border-b-gray-300 items-center">
                <p className="text-xs">{pinPoints.length} Properties Found</p>
                {/* <div
                    className={`relative flex flex-row items-center h-full ${getActiveSortOption() !== explorePropertiesSortOptionMetadata[ExplorePropertiesSortOption.DEFAULT] && 'w-[150px]'} text-xs border border-gray-200 ${isSortSelectActive ? 'rounded-t-lg' : 'rounded-lg'} px-2 py-1 items-center`}
                >
                    <BsSortDown />
                    <Link
                        to="#"
                        className="pointer pl-1"
                        onClick={sortSelectToggle}
                    >
                        <div
                            className={`${getActiveSortOption() !== explorePropertiesSortOptionMetadata[ExplorePropertiesSortOption.DEFAULT] && 'w-[110px]'} truncate`}
                        >
                            {getActiveSortOption()}
                        </div>
                    </Link>
                    <div
                        id="dropdown"
                        className={`${!isSortSelectActive && 'hidden'} z-30 absolute right-0 top-4 mt-2 w-full rounded-b-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
                    >
                        <div className="py-1">
                            <Link
                                to="#"
                                className={`block px-4 py-2 text-xs text-gray-700 ${getActiveSortOption() === explorePropertiesSortOptionMetadata[ExplorePropertiesSortOption.DEFAULT] && 'bg-gray-100'}`}
                                onClick={() => {
                                    setExplorePropertiesSortOption(
                                        '',
                                        SortType.ASC
                                    );
                                    sortSelectToggle();
                                }}
                            >
                                {
                                    explorePropertiesSortOptionMetadata[
                                        ExplorePropertiesSortOption.DEFAULT
                                    ]
                                }
                            </Link>
                            <Link
                                to="#"
                                className={`block px-4 py-2 text-xs text-gray-700 ${getActiveSortOption() === explorePropertiesSortOptionMetadata[ExplorePropertiesSortOption.NAME_ASC] && 'bg-gray-100'}`}
                                onClick={() => {
                                    setExplorePropertiesSortOption(
                                        'name',
                                        SortType.ASC
                                    );
                                    sortSelectToggle();
                                }}
                            >
                                {
                                    explorePropertiesSortOptionMetadata[
                                        ExplorePropertiesSortOption.NAME_ASC
                                    ]
                                }
                            </Link>
                            <Link
                                to="#"
                                className={`block px-4 py-2 text-xs text-gray-700 ${getActiveSortOption() === explorePropertiesSortOptionMetadata[ExplorePropertiesSortOption.NAME_DESC] && 'bg-gray-100'}`}
                                onClick={() => {
                                    setExplorePropertiesSortOption(
                                        'name',
                                        SortType.DESC
                                    );
                                    sortSelectToggle();
                                }}
                            >
                                {
                                    explorePropertiesSortOptionMetadata[
                                        ExplorePropertiesSortOption.NAME_DESC
                                    ]
                                }
                            </Link>
                            <Link
                                to="#"
                                className={`block px-4 py-2 text-xs text-gray-700 ${getActiveSortOption() === explorePropertiesSortOptionMetadata[ExplorePropertiesSortOption.HIGHEST_SOLAR_HOURS] && 'bg-gray-100'}`}
                                onClick={() => {
                                    setExplorePropertiesSortOption(
                                        'solar_hours',
                                        SortType.DESC
                                    );
                                    sortSelectToggle();
                                }}
                            >
                                {
                                    explorePropertiesSortOptionMetadata[
                                        ExplorePropertiesSortOption
                                            .HIGHEST_SOLAR_HOURS
                                    ]
                                }
                            </Link>
                            <Link
                                to="#"
                                className={`block px-4 py-2 text-xs text-gray-700 ${getActiveSortOption() === explorePropertiesSortOptionMetadata[ExplorePropertiesSortOption.LOWEST_SOLAR_HOURS] && 'bg-gray-100'}`}
                                onClick={() => {
                                    setExplorePropertiesSortOption(
                                        'solar_hours',
                                        SortType.ASC
                                    );
                                    sortSelectToggle();
                                }}
                            >
                                {
                                    explorePropertiesSortOptionMetadata[
                                        ExplorePropertiesSortOption
                                            .LOWEST_SOLAR_HOURS
                                    ]
                                }
                            </Link>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="flex flex-row justify-between py-3 border-b border-b-gray-300">
                <div
                    className="flex flex-row items-center cursor-pointer"
                    onClick={togglePropertiesMultiSelect}
                >
                    {isMultiSelectActive ? (
                        <RiCheckboxMultipleLine className="mr-1 text-primary text-2xl" />
                    ) : (
                        <RiCheckboxMultipleBlankLine className="mr-1 text-gray-400 text-2xl" />
                    )}
                    <p
                        className={`text-xs ${isMultiSelectActive ? 'text-blue-700' : 'text-gray-700'}`}
                    >
                        Activate Multi Select
                    </p>
                </div>
                <div className="text-xs">
                    <Button
                        text="+ Add to Watchlist"
                        type="button"
                        onClick={toggleWatchlistModal}
                        styleType={
                            isMultiSelectActive && queue.length > 0
                                ? 'primary'
                                : 'light-gray'
                        }
                        disabled={!(isMultiSelectActive && queue.length > 0)}
                    />
                </div>
            </div>
        </>
    );
};

export default ExplorePropertiesHeader;
