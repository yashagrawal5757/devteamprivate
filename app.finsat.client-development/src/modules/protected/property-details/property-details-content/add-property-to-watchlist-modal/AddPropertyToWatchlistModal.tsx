import React, { useCallback, useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { PiPlusCircle, PiListPlusBold } from 'react-icons/pi';
import { TbReplace } from 'react-icons/tb';
import { IoCloseOutline } from 'react-icons/io5';
import { AddToWatchlistType } from '@enums/AddToWatchlistType';
import useAddPropertyToWatchlistModal from './hooks/useAddPropertyToWatchlistModal';
import AddPropertyToWatchlistForm from './components/add-property-to-watchlist-form/AddPropertyToWatchlistForm';
import usePropertyDetailsWatchlist from '../../hooks/watchlist/usePropertyDetailsWatchlist';
import useExistingWatchlists from '../../hooks/existing-watchlists/useExistingWatchlists';

const _ = require('lodash');

const AddPropertyToWatchlistModal = () => {
    const {
        isAddNewWatchlistActive,
        addNewWatchlistToggle,
        setAddNewWatchlistToggle,
        onAddNewWatchlist,
        onGetWatchlists,
        onAddPropertyToWatchlist
    } = useAddPropertyToWatchlistModal();

    const {
        exploreWatchlist: { isWatchlistModalOpen },
        emptyQueueAndToggleWatchlistModal
    } = usePropertyDetailsWatchlist();

    const { existingWatchlists, searchQuery, setSearchQuery } =
        useExistingWatchlists();

    const debouncedSearch = useCallback(
        _.debounce((value: string) => {
            onGetWatchlists(value);
        }, 500),
        []
    );

    useEffect(() => {
        debouncedSearch(searchQuery);
    }, [searchQuery]);

    if (!isWatchlistModalOpen) {
        return <></>;
    }

    return (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-[600px] h-[500px] bg-white rounded-lg pb-8 pt-10 px-7 mx-auto shadow-lg flex flex-col justify-between">
                <IoCloseOutline
                    className="text-2xl absolute top-2 right-2 cursor-pointer"
                    onClick={() => {
                        emptyQueueAndToggleWatchlistModal();
                        setAddNewWatchlistToggle(false);
                    }}
                />
                <div className="h-[120px]">
                    {isAddNewWatchlistActive ? (
                        <AddPropertyToWatchlistForm
                            onSubmit={({ name }) => onAddNewWatchlist(name)}
                        />
                    ) : (
                        <div
                            className="flex flex-row w-full p-3 border border-gray-300 rounded-lg items-center text-sm cursor-pointer"
                            onClick={addNewWatchlistToggle}
                        >
                            <PiPlusCircle className="text-primary text-xl" />
                            <p className="text-primary font-semibold pl-2">
                                Add New Watchlist
                            </p>
                        </div>
                    )}
                    <div className="h-[1px] bg-gray-200 w-full my-3"></div>
                    <div className="relative flex w-full items-center flex-grow mb-4 text-sm">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Find a Watchlist"
                            className="w-full rounded-lg pl-10 p-3 border border-gray-300 focus:outline-none"
                        />
                        <IoIosSearch className="absolute left-3 text-xl text-primary" />
                    </div>
                </div>
                <div className="h-watchlist-input-find text-sm overflow-y-auto pr-4">
                    <p className="text-sm mb-2">Existing Watchlists:</p>
                    {existingWatchlists.map((existingWatchlist, index) => (
                        <div
                            className="flex flex-row justify-between mb-2"
                            key={index}
                        >
                            <div className="watchlist-box p-3 border border-gray-300 rounded-lg items-center">
                                {existingWatchlist.name}
                            </div>
                            <div
                                className="w-[46px] p-3 border border-gray-300 rounded-lg items-center cursor-pointer"
                                title="Append to Watchlist"
                                onClick={() =>
                                    onAddPropertyToWatchlist(
                                        existingWatchlist.id,
                                        AddToWatchlistType.APPEND
                                    )
                                }
                            >
                                <PiListPlusBold className="text-xl" />
                            </div>
                            <div
                                className="w-[46px] p-3 border border-gray-300 rounded-lg items-center cursor-pointer"
                                title="Replace the whole Watchlist"
                                onClick={() =>
                                    onAddPropertyToWatchlist(
                                        existingWatchlist.id,
                                        AddToWatchlistType.REPLACE
                                    )
                                }
                            >
                                <TbReplace className="text-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddPropertyToWatchlistModal;
