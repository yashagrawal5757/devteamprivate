import React, { useState } from 'react';
import Button from '@ui/buttons/button/Button';
import { IoIosSearch } from 'react-icons/io';
import { PiExportBold } from 'react-icons/pi';
import useExistingWatchlists from './hooks/useExistingWatchlists';
import _ from 'lodash';
import useDashboard from '@dashboard/hooks/dashboard/useDashboard';

type DashboardHeaderProps = {
    searchQuery: string;
    watchlistId: string | null;
    setSearchQuery: (value: string) => void;
    setWatchlistId: (value: string | null) => void;
};

const DashboardHeader = ({
    searchQuery,
    watchlistId,
    setSearchQuery,
    setWatchlistId
}: DashboardHeaderProps) => {
    const { onGetPdf } = useDashboard();

    const [isBuildingTypeDropdownOpen, setBuildingTypeDropdownOpen] =
        useState<boolean>(false);

    const toggleBuildingTypeDropdown = () => {
        setBuildingTypeDropdownOpen(!isBuildingTypeDropdownOpen);
    };

    const { existingWatchlists } = useExistingWatchlists();

    const selectedWatchlist = existingWatchlists.find(
        (watchlist) => watchlist.id === watchlistId
    );

    const selectedWatchlistName =
        selectedWatchlist?.name ?? 'Select a Watchlist';

    if (watchlistId === null) {
        return;
    }

    return (
        <>
            <p className="font-semibold text-lg">Dashboard</p>
            <div className="flex flex-row justify-between mt-3 mb-6">
                <div className="relative w-1/5">
                    <button
                        id="dropdownBgHoverButton"
                        data-dropdown-toggle="dropdownBgHover"
                        className={`w-full justify-between border border-gray-300 text-sm focus:outline-none font-medium rounded-lg px-4 py-2 text-center inline-flex items-center ${existingWatchlists.length > 0 ? 'cursor-pointer text-black' : 'cursor-auto text-gray-300'}`}
                        type="button"
                        onClick={toggleBuildingTypeDropdown}
                        disabled={existingWatchlists.length <= 0}
                    >
                        {selectedWatchlistName}
                        <svg
                            className="w-2.5 h-2.5 ms-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={`${isBuildingTypeDropdownOpen ? 'm1 5 4-4 4 4' : 'm1 1 4 4 4-4'}`}
                            />
                        </svg>
                    </button>
                    <div
                        id="dropdownBgHover"
                        className={`absolute z-10 ${isBuildingTypeDropdownOpen ? '' : 'hidden'} w-full max-h-48 p-2 overflow-y-auto bg-white rounded-lg border border-gray-300 mt-1`}
                    >
                        <div className="relative flex w-full items-center flex-grow text-xs">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Find a Watchlist"
                                className="w-full rounded-lg pl-8 p-2 border border-gray-300 focus:outline-none"
                            />
                            <IoIosSearch
                                className="absolute left-3 text-primary"
                                size={16}
                            />
                        </div>
                        <div className="h-[1px] bg-gray-300 w-full my-2"></div>
                        {existingWatchlists.map((existingWatchlist, index) => (
                            <div
                                key={index}
                                className={`p-2 border border-gray-300 text-xs rounded-lg mb-1 cursor-pointer ${existingWatchlist.id === watchlistId && 'bg-blue-100'}`}
                                onClick={() => {
                                    setWatchlistId(existingWatchlist.id);
                                    toggleBuildingTypeDropdown();
                                }}
                            >
                                {existingWatchlist.name}
                            </div>
                        ))}
                    </div>
                </div>
                {/* {existingWatchlists.length > 0 && (
                    <div className="w-max text-sm">
                        <Button
                            text="Export"
                            type="button"
                            onClick={() => onGetPdf(watchlistId)}
                            icon={<PiExportBold className="mr-1" />}
                        />
                    </div>
                )} */}
            </div>
        </>
    );
};

export default DashboardHeader;
