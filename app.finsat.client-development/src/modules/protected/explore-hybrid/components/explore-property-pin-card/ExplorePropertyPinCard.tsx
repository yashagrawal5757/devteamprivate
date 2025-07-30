import React, { useCallback } from 'react';
import './ExplorePropertyPinCard.css';
import '../../explore-hybrid-content/explore-hybrid-properties/ExploreHybridProperties.css';
import { PiPlusBold } from 'react-icons/pi';
import { Routes, RoutingKeys } from '@routes/router.keys';
import { useNavigate } from 'react-router-dom';
import useExploreWatchlist from '../../hooks/watchlist/useExploreWatchlist';

type ExportPropertyPinCardProps = {
    id: string;
    name: string;
    type: 'SFP' | 'BP';
    addSinglePropertyToWatchlist: () => void;
};

const ExplorePropertyPinCard = ({
    id,
    name,
    type,
    addSinglePropertyToWatchlist
}: ExportPropertyPinCardProps) => {
    const {
        exploreWatchlist: { isMultiSelectActive, queue },
        addToWatchlistQueue,
        removeFromWatchlistQueue
    } = useExploreWatchlist();
    const navigate = useNavigate();

    const isChecked = useCallback(() => {
        return queue.findIndex((watchlistId) => watchlistId === id) !== -1;
    }, [queue]);

    const navigateToPropertyDetails = (e: any) => {
        e.preventDefault();
        navigate(`${RoutingKeys[Routes.PROPERTY_DETAILS]}`.replace(':id', `${type}-${id}`));
    };

    return (
        <div className="flex flex-row rounded-md border border-gray-300">
            <div
                className={`w-1/10 flex ${isChecked() ? 'bg-primary' : 'bg-gray-400'} p-2 rounded-l border-l border-l-gray-400 items-center justify-center`}
            >
                {isMultiSelectActive ? (
                    <div className="checkbox-property-card flex rounded-lg bg-white h-max">
                        <input
                            className="property-card-checkbox"
                            type="checkbox"
                            id={`property-card-checkbox-${id}`}
                            checked={isChecked()}
                            onChange={(event) => {
                                if (event.target.checked) {
                                    addToWatchlistQueue(id);
                                } else {
                                    removeFromWatchlistQueue(id);
                                }
                            }}
                        />
                        <label
                            htmlFor={`property-card-checkbox-${id}`}
                            className={isChecked() ? 'checked' : ''}
                        ></label>
                    </div>
                ) : (
                    <div
                        className="flex rounded bg-white h-max p-1 cursor-pointer mr-0.5"
                        onClick={addSinglePropertyToWatchlist}
                    >
                        <PiPlusBold className="text-primary" size={12} />
                    </div>
                )}
            </div>
            <div className="w-9/10 p-4">
                <div className="flex flex-col relative">
                    <div
                        className="flex px-2 items-center justify-start cursor-pointer"
                        onClick={navigateToPropertyDetails}
                    >
                        <img
                            src="/residential.svg"
                            alt="Residential proeprty"
                            width={40}
                        />
                        <p className="text-xs font-semibold cursor-pointer pl-1">
                            {name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExplorePropertyPinCard;
