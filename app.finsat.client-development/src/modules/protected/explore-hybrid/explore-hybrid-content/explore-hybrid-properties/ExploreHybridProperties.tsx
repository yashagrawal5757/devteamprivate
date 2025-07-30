import { useCallback, useEffect, useRef, useState } from 'react';
import ExplorePropertiesHeader from './explore-properties-header/ExplorePropertiesHeader';
import NoProperties from './components/no-properties/NoProperties';
import { useSolarContext } from '../../../../../shared/contexts/google-solar/solarContextProvider';
import DateUtils from '@services/dateUtils';
import useExploreWatchlist from '../../hooks/watchlist/useExploreWatchlist';
import useProperties from '../../hooks/properties/useProperties';
import ExplorePropertyCard from '../../components/explore-property-card/ExplorePropertyCard';
import useHybridSolution from '../../hooks/hybrid-solution/useHybridSolution';
import useHybridPagination from '../../hooks/hybrid-pagination/useHybridPagination';
import useRegionSunHours from '../../hooks/region-sun-hours/useRegionSunHours';
import usePropertiesLookupLimit from '../../hooks/hybrid-solution/usePropertiesLookupLimit';

type SunshineHoursProps = {
    country: string;
    city: string;
    monthlySunshineHours: number[];
    annualSunshineHours: number;
};

const ExploreHybridProperties = () => {
    const {
        exploreWatchlist: { isMultiSelectActive, isSelectAllActive, queue },
        addToWatchlistQueue,
        addAllToWatchlistQueue,
        removeAllFromWatchlistQueue,
        toggleWatchlistModal,
        toggleSelectAll,
        setSelectAllValue
    } = useExploreWatchlist();
    const { properties } = useProperties();
    const { solarData } = useSolarContext();
    const [sunshineHours, setSunshineHours] = useState<number>(0);

    const { hybridModelHandler } = useHybridSolution();
    const { pagination } = useHybridPagination();
    const { regionSunHours } = useRegionSunHours();
    const { lookupLimit } = usePropertiesLookupLimit();

    const containerRef = useRef<HTMLDivElement>(null);
    const previousScrollTopRef = useRef(0);
    const loadingRef = useRef(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (!container || loadingRef.current || !pagination.hasNext) return;

            const currentScrollTop = container.scrollTop;
            const previousScrollTop = previousScrollTopRef.current;

            const isScrollingDown = currentScrollTop > previousScrollTop;
            previousScrollTopRef.current = currentScrollTop;

            const nearBottom =
                container.scrollHeight - currentScrollTop <=
                container.clientHeight + 100;

            if (!lookupLimit.isLoadMore) {
                return;
            }

            if (isScrollingDown && nearBottom) {
                loadMore();
            }
        };

        const current = containerRef.current;
        if (current) current.addEventListener('scroll', handleScroll);

        return () => {
            if (current) current.removeEventListener('scroll', handleScroll);
        };
    }, [pagination]);

    const loadMore = async () => {
        if (loadingRef.current) return;

        loadingRef.current = true;
        setLoading(true);

        const nextPagination = {
            ...pagination,
            currentPage: pagination.currentPage + 1
        };

        await hybridModelHandler(nextPagination);

        setLoading(false);
        loadingRef.current = false;
    };

    useEffect(() => {
        const isSelectAllCheckboxActive = properties
            .map((property) => property.osmId)
            .every((propertyId) => {
                if (propertyId === undefined) {
                    return;
                }

                return queue.includes(propertyId.toString());
            });

        setSelectAllValue(isSelectAllCheckboxActive);
    }, [queue]);

    useEffect(() => {
        setSunshineHours(
            solarData?.solarPotential?.maxSunshineHoursPerYear ?? 0
        );
    }, [solarData]);

    if (properties.length === 0) {
        return <NoProperties />;
    }

    if (properties.length > 0) {
        return (
            <div className="p-4 h-full">
                <div className="h-[175px]">
                    <p className="font-semibold border-b border-b-gray-300 pb-1">
                        Properties
                    </p>
                    <ExplorePropertiesHeader />
                    {isMultiSelectActive && (
                        <div className="checkbox-container flex rounded-lg bg-white h-max mt-3 items-center">
                            <input
                                className="properties-checkbox"
                                type="checkbox"
                                id="custom-checkbox"
                                checked={isSelectAllActive}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        addAllToWatchlistQueue();
                                    } else {
                                        removeAllFromWatchlistQueue();
                                    }

                                    toggleSelectAll();
                                }}
                            />
                            <label
                                htmlFor="custom-checkbox"
                                className={isSelectAllActive ? 'checked' : ''}
                            ></label>
                            <span className="text-xs ml-2">Select All</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-row w-full border border-gray-200 rounded p-3 items-center mr-1 justify-center">
                    <img src="/sun.svg" className="w-[20px]" alt="" />
                    <div className="flex flex-row ml-2">
                        <p className="text-sm mr-1">Peak Sun Hours:</p>
                        <p className="text-sm font-semibold text-primary">
                            {`${Math.floor(regionSunHours.sunHours)}h ${Math.floor(DateUtils.getMinutes(regionSunHours.sunHours))}min`}
                        </p>
                    </div>
                </div>
                <div
                    className="h-property overflow-y-auto mt-4"
                    ref={containerRef}
                >
                    {properties.map((property) => (
                        <div className="mb-4 mr-4" key={property.osmId}>
                            <ExplorePropertyCard
                                id={property.osmId}
                                name={property.name}
                                type={property.type}
                                // solarGeneration={{
                                //     totalSunHours:
                                //         solarData?.solarPotential
                                //             ?.maxSunshineHoursPerYear ?? 0
                                // }}
                                schematics={{
                                    size: property.schematics.size
                                }}
                                location={`
                                    ${property.location.streetNumber} 
                                    ${property.location.streetName ? property.location.streetName.replace('Street', 'St') + ',' : 'Unknown'} 
                                    ${property.location.zipCode ? property.location.zipCode + ',' : ''} 
                                    ${property.location.city !== '0' && property.location.city ? property.location.city + ',' : ''} 
                                    ${property.location.country !== '0' ? property.location.country : ''}`}
                                addSinglePropertyToWatchlist={() => {
                                    addToWatchlistQueue(property.osmId);
                                    toggleWatchlistModal();
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default ExploreHybridProperties;
