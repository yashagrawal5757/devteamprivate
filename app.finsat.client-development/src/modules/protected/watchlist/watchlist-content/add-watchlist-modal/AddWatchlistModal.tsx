import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import AddWatchlistForm from './components/add-watchlist-form/AddWatchlistForm';
import useWatchlists from '@watchlist/hooks/watchlists/useWatchlists';

const _ = require('lodash');

type AddWatchlistModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const AddWatchlistModal = ({ isOpen, onClose }: AddWatchlistModalProps) => {
    const { addNewWatchlist } = useWatchlists();

    if (!isOpen) {
        return <></>;
    }

    return (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-[600px] bg-white rounded-lg pb-10 pt-8 px-7 mx-auto shadow-lg flex flex-col justify-between">
                <IoCloseOutline
                    className="text-2xl absolute top-2 right-2 cursor-pointer"
                    onClick={onClose}
                />
                <div>
                    <p className="font-semibold mb-4">Add new watchlist</p>
                    <AddWatchlistForm
                        onSubmit={({ name }) => addNewWatchlist(name, onClose)}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddWatchlistModal;
