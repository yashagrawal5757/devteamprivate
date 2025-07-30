import React, { useCallback, useEffect } from 'react';
import { IoIosSearch, IoMdInformationCircleOutline } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import useAddVariationModal from './hooks/useAddVariationModal';
import _ from 'lodash';
import useExistingWatchlists from '../../hooks/existing-watchlists/useExistingWatchlists';
import useVariations from '../../hooks/variations/useVariations';
import useAddPropertyToWatchlistModal from '../add-property-to-watchlist-modal/hooks/useAddPropertyToWatchlistModal';
import AddPropertyToWatchlistForm from '../add-property-to-watchlist-modal/components/add-property-to-watchlist-form/AddPropertyToWatchlistForm';
import { PiListPlusBold, PiPlusCircle } from 'react-icons/pi';
import Tooltip from '@ui/tooltip/Tooltip';
import { TbReplace } from 'react-icons/tb';
import { AddToWatchlistType } from '@enums/AddToWatchlistType';
import ControllableInput from '@ui/inputs/controllable-input/ControllableInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useProperty from '../../hooks/property/useProperty';
import { Viewer as CesiumViewer } from 'cesium';
import { CesiumComponentRef } from 'resium';

type AddVariationModalProps = {
    id: string;
    isOpen: boolean;
    onClose: () => void;
    base64Image: string;
};

type AddPropertyVariationForm = {
    name?: string;
};

const AddVariationModal = ({ id, isOpen, onClose, base64Image }: AddVariationModalProps) => {
    const { onGetWatchlists } = useAddVariationModal();
    const { saveVariation } = useVariations();

    const {
        isAddNewWatchlistActive,
        addNewWatchlistToggle,
        onAddNewWatchlist
    } = useAddPropertyToWatchlistModal();

    const { existingWatchlists, searchQuery, setSearchQuery } =
        useExistingWatchlists();

    const { property } = useProperty();

    const debouncedSearch = useCallback(
        _.debounce((value: string) => {
            onGetWatchlists(value);
        }, 500),
        []
    );

    const schema = yup
        .object({
            name: yup.string()
        })
        .required();

    const {
        control,
        watch,
        formState: { errors }
    } = useForm<AddPropertyVariationForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: property?.name
        },
        mode: 'onChange',
        reValidateMode: 'onChange'
    });

    const nameValue = watch('name');

    useEffect(() => {
        debouncedSearch(searchQuery);
    }, [searchQuery]);

    if (!isOpen) {
        return;
    }

    if (property === undefined) {
        return;
    }

    return (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-[600px] h-[500px] bg-white rounded-lg pb-8 pt-10 px-7 mx-auto shadow-lg flex flex-col justify-between">
                <IoCloseOutline
                    className="text-2xl absolute top-2 right-2 cursor-pointer"
                    onClick={onClose}
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
                    <ControllableInput
                        name={'name'}
                        labelText="Variation Name"
                        control={control}
                        type="text"
                        errorMessage={errors.name?.message}
                        required={false}
                        placeholder="Enter Variation Name"
                    />
                    <p className="flex flex-row items-center text-sm mb-2 mt-4">
                        Existing Watchlists:
                        <span className="ml-1 text-gray-500">
                            <Tooltip message="Calculated results will be directly saved in the selected watchlist.">
                                <IoMdInformationCircleOutline size={14} />
                            </Tooltip>
                        </span>
                    </p>
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
                                    saveVariation(
                                        id,
                                        existingWatchlist.id,
                                        nameValue ? nameValue : property?.name,
                                        AddToWatchlistType.APPEND,
                                        base64Image
                                    )
                                }
                            >
                                <PiListPlusBold className="text-xl" />
                            </div>
                            <div
                                className="w-[46px] p-3 border border-gray-300 rounded-lg items-center cursor-pointer"
                                title="Replace the whole Watchlist"
                                onClick={() =>
                                    saveVariation(
                                        id,
                                        existingWatchlist.id,
                                        nameValue ? nameValue : property?.name,
                                        AddToWatchlistType.REPLACE,
                                        base64Image
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

export default AddVariationModal;
