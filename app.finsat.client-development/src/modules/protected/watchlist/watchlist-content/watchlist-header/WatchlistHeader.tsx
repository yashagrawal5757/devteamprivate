import React from 'react';
import './WatchlistHeader.css';
import Button from '@ui/buttons/button/Button';
import useWatchlists from '@watchlist/hooks/watchlists/useWatchlists';
import { FaTrashAlt } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { PiExportBold, PiPlusCircle } from 'react-icons/pi';
import useAddWatchlistModal from '../add-watchlist-modal/hooks/useAddWatchlistModal';
import useWatchlistsSelectQueue from '@watchlist/hooks/watchlists-select-queue/useWatchlistsSelectQueue';
import {
    RiCheckboxMultipleBlankLine,
    RiCheckboxMultipleLine
} from 'react-icons/ri';
import AddWatchlistModal from '../add-watchlist-modal/AddWatchlistModal';
import _ from 'lodash';

type WatchlistHeaderProps = {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
};

const WatchlistHeader = ({
    searchQuery,
    setSearchQuery
}: WatchlistHeaderProps) => {
    const { watchlists, deleteWatchlists, deleteAllWatchlists } =
        useWatchlists();

    const { isAddNewWatchlistActive, setAddNewWatchlistToggle } =
        useAddWatchlistModal();

    const {
        watchlistsSelectQueue: {
            isMultiSelectActive,
            isSelectAllActive,
            queue
        },
        toggleWatchlistsMultiSelect,
        addAllToQueue,
        removeAllFromQueue,
        toggleSelectAll
    } = useWatchlistsSelectQueue();

    return (
        <>
            <div className="flex flex-row mt-3">
                <div className="w-1/4">
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
                </div>
                <div className="ml-4">
                    <div
                        className="flex flex-row w-full p-2 border border-gray-300 rounded-lg items-center text-xs cursor-pointer"
                        onClick={() => setAddNewWatchlistToggle(true)}
                    >
                        <PiPlusCircle className="text-primary" size={16} />
                        <p className="text-primary font-semibold pl-2">
                            Add New Watchlist
                        </p>
                    </div>
                </div>
            </div>
            <div className="h-[1px] bg-gray-200 w-full my-3"></div>
            {watchlists.length > 0 && (
                <div className="flex flex-row justify-between mb-3">
                    <div>
                        <div
                            className="flex flex-row items-center cursor-pointer"
                            onClick={toggleWatchlistsMultiSelect}
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
                        <div
                            className={`checkbox-watchlist-header flex rounded-lg bg-white h-max mt-3 items-center ${isMultiSelectActive ? 'visible' : 'invisible'}`}
                        >
                            <input
                                className="watchlist-header-checkbox"
                                type="checkbox"
                                id="custom-checkbox-watchlist-header"
                                checked={isSelectAllActive}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        addAllToQueue(
                                            watchlists.map(
                                                (watchlist) => watchlist.id
                                            )
                                        );
                                    } else {
                                        removeAllFromQueue();
                                    }

                                    toggleSelectAll();
                                }}
                            />
                            <label
                                htmlFor="custom-checkbox-watchlist-header"
                                className={isSelectAllActive ? 'checked' : ''}
                            ></label>
                            <span className="text-xs ml-2">Select All</span>
                        </div>
                    </div>
                    <div className="flex flex-row text-xs my-auto">
                        {queue.length > 0 && (
                            <Button
                                text="Delete"
                                type="button"
                                styleType="dark-gray"
                                onClick={() =>
                                    isSelectAllActive
                                        ? deleteAllWatchlists(searchQuery)
                                        : deleteWatchlists(queue)
                                }
                                icon={<FaTrashAlt className="mr-1" />}
                            />
                        )}
                        {/* <div className='ml-3'>
                            <Button
                                text="Export"
                                type="button"
                                onClick={() => {}}
                                icon={<PiExportBold className="mr-1" />}
                            />
                        </div> */}
                    </div>
                </div>
            )}
            <AddWatchlistModal
                isOpen={isAddNewWatchlistActive}
                onClose={() => setAddNewWatchlistToggle(false)}
            />
        </>
    );
};

export default WatchlistHeader;
