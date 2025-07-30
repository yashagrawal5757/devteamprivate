import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import Accordion from '@ui/accordion/Accordion';
import useWatchlistsSelectQueue from '@watchlist/hooks/watchlists-select-queue/useWatchlistsSelectQueue';
import useWatchlists from '@watchlist/hooks/watchlists/useWatchlists';
import { FaRegTrashAlt, FaTrashAlt } from 'react-icons/fa';
import { WatchlistPropertyType } from '@watchlist/state/watchlists/WatchlistsDefaults';
import { propertyGroupMapMetadata } from '@metadata/BuildingType.metadata';
import { cityMetadata } from '@metadata/City.metadata';
import { countryMetadata } from '@metadata/Country.metadata';
import { RiParkingBoxLine } from 'react-icons/ri';
import { PiExportBold, PiSolarRoofLight } from 'react-icons/pi';
import './WatchlistAccordion.css';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoIosSearch } from 'react-icons/io';
import Button from '@ui/buttons/button/Button';
import _ from 'lodash';
import useWatchlistAccordion from './hooks/useWatchlistAccordion';
import usePropertiesSelectQueue from './hooks/usePropertiesSelectQueue';
import { useNavigate } from 'react-router-dom';
import { Routes, RoutingKeys } from '@routes/router.keys';
import useLoading from '@hooks/useLoading';
import useWatchlistsPropertiesPagination from '@watchlist/hooks/watchlists-pagination/useWatchlistsPropertiesPagination';
import { getDisplayPowerUnit } from '@services/unitConversionUtils';
import DateUtils from '@services/dateUtils';
import NumberUtils from '@services/numberUtils';
import useProfile from 'modules/protected/profile/hooks/useProfile';
import { powerUnitMetadata } from '@metadata/PowerUnit.metadata';

type WatchlistAccordionProps = {
    id: string;
    name: string;
    properties: Array<WatchlistPropertyType>;
};

const WatchlistAccordion = ({
    id,
    name,
    properties
}: WatchlistAccordionProps) => {
    const [activeRow, setActiveRow] = useState<number | null>(null);

    const {
        watchlistsSelectQueue: { isMultiSelectActive, queue },
        addToQueue: addToWatchlistQueue,
        removeFromQueue: removeFromWatchlistQueue
    } = useWatchlistsSelectQueue();

    const {
        watchlists,
        fetchPropertiesForWatchlist,
        deleteWatchlists,
        deleteWatchlistProperties,
        deleteAllWatchlistProperties
    } = useWatchlists();

    const { searchPropertyQuery, setSearchPropertyQuery, getNavigationPropertyId } =
        useWatchlistAccordion();

    const {
        propertiesSelectQueue,
        addToQueue: addToPropertiesQueue,
        addAllToQueue: addAllToPropertiesQueue,
        removeFromQueue: removeFromPropertiesQueue,
        removeAllFromQueue: removeAllFromPropertiesQueue,
        toggleSelectAll: togglePropertiesSelectAll,
        setSelectAllValue: setPropertiesSelectAllValue
    } = usePropertiesSelectQueue();

    const { paginations, getByWatchlistId } =
        useWatchlistsPropertiesPagination();

    const { powerUnit } = useProfile();

    const navigate = useNavigate();
    const { loading } = useLoading();

    const watchlistPropertiesSelectQueue = useMemo(
        () => propertiesSelectQueue.find((watchlist) => watchlist.id === id),
        [propertiesSelectQueue]
    );

    const isWatchlistChecked = useCallback(() => {
        return queue.findIndex((watchlistId) => watchlistId === id) !== -1;
    }, [queue]);

    const isPropertyChecked = useCallback(
        (propertyId: string) => {
            return (
                propertiesSelectQueue
                    .find((watchlist) => watchlist.id === id)
                    ?.queue.findIndex((id) => id === propertyId) !== -1
            );
        },
        [propertiesSelectQueue]
    );

    const [openAccordions, setOpenAccordions] = useState<
        Record<string, boolean>
    >({});

    const toggleAccordion = (id: string) => {
        setOpenAccordions((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }));

        fetchPropertiesForWatchlist(id, 1);

        if (openAccordions[id]) {
            setSearchPropertyQuery((prev) => ({
                ...prev,
                [id]: ''
            }));
        }
    };

    const openActionMenu = (e: any, rowIndex: number) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveRow(activeRow === rowIndex ? null : rowIndex);
    };

    const handleSearchPropertiesChange = (id: string, value: string) => {
        setSearchPropertyQuery((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    useEffect(() => {
        if (properties === undefined || properties === null) {
            return;
        }

        if (properties?.length === 0) {
            return;
        }

        const isSelectAllCheckboxActive = properties
            .map((property) => property.variationId)
            .every((variationId) =>
                propertiesSelectQueue
                    .find((watchlist) => watchlist.id === id)
                    ?.queue.includes(variationId)
            );

        setPropertiesSelectAllValue(id, isSelectAllCheckboxActive);
    }, [propertiesSelectQueue.find((watchlist) => watchlist.id === id)?.queue]);

    const debouncedSearch = useCallback(
        _.debounce((id: string, value: string) => {
            fetchPropertiesForWatchlist(id, 1, value);
        }, 500),
        []
    );

    const navigateToPropertyDetails = (
        e: any,
        propertyId: string,
        variationId: string
    ) => {
        e.preventDefault();
        navigate(
            `${RoutingKeys[Routes.PROPERTY_DETAILS]}`.replace(
                ':id',
                propertyId
            ),
            { state: { variationId } }
        );
    };

    // const containerRefs = useRef<Record<string, HTMLDivElement | null>>({});
    // const previousScrollTopRefs = useRef<Record<string, number>>({});
    // const loadingRefs = useRef<Record<string, boolean>>({});
    // const [loading, setLoading] = useState<Record<string, boolean>>({});

    // useEffect(() => {
    //     const container = containerRefs.current[id];
    //     const paginationData = paginations;

    //     if (!container || !paginationData) return;

    //     const handleScroll = () => {
    //         console.log('handle');

    //         const container = containerRefs.current[id];
    //         const pagination = getByWatchlistId(id)?.pagination;

    //         console.log('con: ', container);
    //         console.log('pag: ', pagination);

    //         if (!container || !pagination || !pagination.hasNext || loadingRefs.current[id]) {
    //             console.log('return');

    //             return;
    //         };

    //         const currentScrollTop = container.scrollTop;
    //         const previousScrollTop = previousScrollTopRefs.current[id] || 0;
    //         const isScrollingDown = currentScrollTop > previousScrollTop;
    //         previousScrollTopRefs.current[id] = currentScrollTop;

    //         const nearBottom = container.scrollHeight - currentScrollTop <= container.clientHeight + 100;

    //         if (isScrollingDown && nearBottom) {
    //             console.log('loadi');

    //             loadMore(id);
    //         }
    //     };

    //     container.addEventListener('scroll', handleScroll);
    //     return () => container.removeEventListener('scroll', handleScroll);
    // }, [id, getByWatchlistId(id)]);

    // const loadMore = async (watchlistId: string) => {
    //     if (loadingRefs.current[watchlistId]) return;

    //     loadingRefs.current[watchlistId] = true;
    //     setLoading((prev) => ({ ...prev, [watchlistId]: true }));

    //     const paginationData = getByWatchlistId(watchlistId);
    //     if (!paginationData) return;

    //     const nextPage = paginationData.pagination.currentPage + 1;

    //     // Assuming this will update the store/context state
    //     await fetchPropertiesForWatchlist(watchlistId, nextPage, true);

    //     setLoading((prev) => ({ ...prev, [watchlistId]: false }));
    //     loadingRefs.current[watchlistId] = false;
    // };

    useEffect(() => {
        if (searchPropertyQuery[id] !== undefined) {
            debouncedSearch(id, searchPropertyQuery[id]);
        }
    }, [searchPropertyQuery[id]]);

    useEffect(() => {}, [openAccordions[id]]);

    return (
        <>
            <div className="flex flex-row mb-2 items-center">
                {isMultiSelectActive && (
                    <div className="checkbox-watchlist-container flex rounded-lg bg-white h-max mr-4 mb-auto mt-4">
                        <input
                            className="accordion-checkbox"
                            type="checkbox"
                            id={`custom-checkbox-${id}`}
                            checked={isWatchlistChecked()}
                            onChange={(event) => {
                                if (event.target.checked) {
                                    addToWatchlistQueue(id);
                                } else {
                                    removeFromWatchlistQueue(id);
                                }
                            }}
                        />
                        <label
                            htmlFor={`custom-checkbox-${id}`}
                            className={isWatchlistChecked() ? 'checked' : ''}
                        ></label>
                    </div>
                )}
                <div className="w-full">
                    <Accordion
                        isOpen={openAccordions[id]}
                        setOpen={() => toggleAccordion(id)}
                        title={name}
                        actions={[
                            {
                                id: '1',
                                text: 'Delete',
                                icon: <FaRegTrashAlt />,
                                onClick: () => deleteWatchlists([id])
                            }
                        ]}
                    >
                        <>
                            <div className="w-1/4">
                                <div className="relative flex w-full items-center flex-grow text-xs">
                                    <input
                                        type="text"
                                        value={searchPropertyQuery[id] || ''}
                                        onChange={(e) =>
                                            handleSearchPropertiesChange(
                                                id,
                                                e.target.value
                                            )
                                        }
                                        placeholder="Find a Property"
                                        className="w-full rounded-lg pl-8 p-2 border border-gray-300 focus:outline-none"
                                    />
                                    <IoIosSearch
                                        size={16}
                                        className="absolute left-3 text-primary"
                                    />
                                </div>
                            </div>
                            {properties?.length === 0 ? (
                                <div className="text-center flex flex-col justify-center">
                                    <div className="h-[1px] bg-gray-200 w-full my-3"></div>
                                    {loading.isLoading && (
                                        <>
                                            <p className="font-semibold text-md ml-1">
                                                Loading watchlists...
                                            </p>
                                            <p className="text-accent text-xs">
                                                Please wait!
                                            </p>
                                        </>
                                    )}
                                    {!loading.isLoading && (
                                        <>
                                            <p className="font-semibold text-md ml-1">
                                                Watchlist does not have any
                                                property
                                            </p>
                                            <p className="text-accent text-xs">
                                                Use Explore to find and add
                                                properties to watchlist
                                            </p>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-row justify-between mb-2 items-center">
                                        <div className="checkbox-property-container flex rounded-lg bg-white h-max items-center ml-2">
                                            <input
                                                className="accordion-checkbox"
                                                type="checkbox"
                                                id={`custom-checkbox-property-${id}`}
                                                checked={
                                                    propertiesSelectQueue.find(
                                                        (watchlist) =>
                                                            watchlist.id === id
                                                    )?.isSelectAllActive
                                                }
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        addAllToPropertiesQueue(
                                                            id,
                                                            properties.map(
                                                                (property) =>
                                                                    property.variationId
                                                            )
                                                        );
                                                    } else {
                                                        removeAllFromPropertiesQueue(
                                                            id
                                                        );
                                                    }

                                                    togglePropertiesSelectAll(
                                                        id
                                                    );
                                                }}
                                            />
                                            <label
                                                htmlFor={`custom-checkbox-property-${id}`}
                                                className={
                                                    propertiesSelectQueue.find(
                                                        (watchlist) =>
                                                            watchlist.id === id
                                                    )?.isSelectAllActive
                                                        ? 'checked'
                                                        : ''
                                                }
                                            ></label>
                                            <span className="text-xs ml-2">
                                                Select All
                                            </span>
                                        </div>
                                        <div className="flex flex-row text-xs my-auto">
                                            <div className="ml-3 invisible">
                                                <Button
                                                    text="Export"
                                                    type="button"
                                                    onClick={() => {}}
                                                    icon={
                                                        <PiExportBold className="mr-1" />
                                                    }
                                                />
                                            </div>
                                            {watchlistPropertiesSelectQueue !==
                                                undefined &&
                                                watchlistPropertiesSelectQueue
                                                    .queue.length > 0 && (
                                                    <Button
                                                        text="Delete"
                                                        type="button"
                                                        styleType="dark-gray"
                                                        onClick={() => {
                                                            propertiesSelectQueue.find(
                                                                (watchlist) =>
                                                                    watchlist.id ===
                                                                    id
                                                            )?.isSelectAllActive
                                                                ? deleteAllWatchlistProperties(
                                                                      id,
                                                                      ''
                                                                  )
                                                                : deleteWatchlistProperties(
                                                                      id,
                                                                      propertiesSelectQueue.find(
                                                                          (
                                                                              watchlist
                                                                          ) =>
                                                                              watchlist.id ===
                                                                              id
                                                                      )!.queue
                                                                  );
                                                        }}
                                                        icon={
                                                            <FaTrashAlt className="mr-1" />
                                                        }
                                                    />
                                                )}
                                        </div>
                                    </div>
                                    <div
                                        className="relative overflow-y-auto border-gray-200 border rounded-lg max-h-[240px]"
                                        // ref={(el) => {
                                        //     containerRefs.current[id] = el;
                                        // }}
                                    >
                                        <table className="w-full text-x text-left rtl:text-right">
                                            <thead className="text-primary bg-gray-100">
                                                <tr className="tr-accordion">
                                                    <th
                                                        scope="col"
                                                        className="th-accordion p-4"
                                                    >
                                                        <div className="flex items-center">
                                                            <input
                                                                id="checkbox-all-search"
                                                                type="checkbox"
                                                                className="accordion-checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                            />
                                                            <label
                                                                htmlFor="checkbox-all-search"
                                                                className="sr-only"
                                                            >
                                                                checkbox
                                                            </label>
                                                        </div>
                                                    </th>
                                                    {/* <th
                                                        scope="col"
                                                        className="th-accordion px-6 py-2"
                                                    >
                                                        Property Name:
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="th-accordion px-6 py-2"
                                                    >
                                                        Property Type:
                                                    </th> */}
                                                    <th
                                                        scope="col"
                                                        className="th-accordion px-6 py-2"
                                                    >
                                                        Variation Name:
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="th-accordion px-6 py-2"
                                                    >
                                                        Total Available Space:
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="th-accordion px-6 py-2"
                                                    >
                                                        Net Energy Production:
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="th-accordion px-6 py-2"
                                                    >
                                                        Net Revenue:
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="th-accordion px-6 py-2"
                                                    >
                                                        Net Present Value:
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="th-accordion px-6 py-2"
                                                    >
                                                        Internal Rate of Return:
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="th-accordion px-6 py-2"
                                                    >
                                                        Payback Period:
                                                    </th>
                                                    {/* <th
                                                        scope="col"
                                                        className="th-accordion px-6 py-2"
                                                    >
                                                        Structure Type:
                                                    </th> */}
                                                    <th
                                                        scope="col"
                                                        className="th-accordion px-6 py-2 text-center"
                                                    >
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {properties?.length > 0 &&
                                                    properties.map(
                                                        (row, index) => (
                                                            <tr
                                                                key={index}
                                                                className="tr-accordion bg-white border-b cursor-pointer"
                                                                onClick={(e) =>
                                                                    navigateToPropertyDetails(
                                                                        e,
                                                                        getNavigationPropertyId(row.buildingId),
                                                                        row.variationId
                                                                    )
                                                                }
                                                            >
                                                                <td className="td-accordion w-4 p-4">
                                                                    <div className="checkbox-property-container flex rounded-lg bg-white h-max items-center">
                                                                        <input
                                                                            className="accordion-checkbox"
                                                                            type="checkbox"
                                                                            id={`custom-property-checkbox-${id}-${row.variationId}`}
                                                                            checked={isPropertyChecked(
                                                                                row.variationId
                                                                            )}
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                e.stopPropagation()
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) => {
                                                                                if (
                                                                                    event
                                                                                        .target
                                                                                        .checked
                                                                                ) {
                                                                                    addToPropertiesQueue(
                                                                                        id,
                                                                                        row.variationId
                                                                                    );
                                                                                } else {
                                                                                    removeFromPropertiesQueue(
                                                                                        id,
                                                                                        row.variationId
                                                                                    );
                                                                                }
                                                                            }}
                                                                        />
                                                                        <label
                                                                            htmlFor={`custom-property-checkbox-${id}-${row.variationId}`}
                                                                            className={
                                                                                isPropertyChecked(
                                                                                    row.variationId
                                                                                )
                                                                                    ? 'checked'
                                                                                    : ''
                                                                            }
                                                                            onClick={(
                                                                                e
                                                                            ) => {
                                                                                e.stopPropagation();
                                                                            }}
                                                                        ></label>
                                                                    </div>
                                                                </td>
                                                                {/* <th
                                                                    scope="row"
                                                                    className="th-accordion px-6 py-2 font-medium text-gray-900 whitespace-nowrap cursor-pointer"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        navigateToPropertyDetails(
                                                                            e,
                                                                            row.buildingId
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        row.buildingName
                                                                    }
                                                                </th>
                                                                <td className="td-accordion px-6 py-2">
                                                                    {propertyGroupMapMetadata[
                                                                        row
                                                                            .buildingType
                                                                    ].toUpperCase()}
                                                                </td> */}
                                                                <td className="td-accordion px-6 py-2">
                                                                    {
                                                                        row.buildingName
                                                                    }
                                                                </td>
                                                                <td className="td-accordion px-6 py-2">
                                                                    {NumberUtils.formatWithCommas(
                                                                        row.schematics.totalAvailableSpace?.toFixed(
                                                                            0
                                                                        )
                                                                    )}{' '}
                                                                    m²
                                                                </td>
                                                                <td className="td-accordion px-6 py-2">
                                                                    {NumberUtils.formatWithCommas(
                                                                        getDisplayPowerUnit(
                                                                            row
                                                                                .solarEstimation
                                                                                .netEnergyProduction,
                                                                            powerUnit?.powerUnit
                                                                        ).toFixed(
                                                                            2
                                                                        )
                                                                    )}{' '}
                                                                    {
                                                                        powerUnitMetadata[
                                                                            powerUnit
                                                                                ?.powerUnit
                                                                        ]
                                                                    }
                                                                    /year
                                                                </td>
                                                                <td className="td-accordion px-6 py-2">
                                                                    {NumberUtils.formatWithCommas(
                                                                        row.solarEstimation.netEnergyRevenue.toFixed(
                                                                            0
                                                                        )
                                                                    )}
                                                                    €/year
                                                                </td>
                                                                <td className="td-accordion px-6 py-2">
                                                                    {NumberUtils.formatWithCommas(
                                                                        row.solarEstimation.netPresentValue.toFixed(
                                                                            0
                                                                        )
                                                                    )}
                                                                    €
                                                                </td>
                                                                <td className="td-accordion px-6 py-2">
                                                                    {row.solarEstimation.internalRateOfReturn.toFixed(
                                                                        2
                                                                    )}{' '}
                                                                    %
                                                                </td>
                                                                <td className="td-accordion px-6 py-2">
                                                                    {Math.floor(
                                                                        row
                                                                            .solarEstimation
                                                                            .paybackPeriod
                                                                    ) > 0 && (
                                                                        <span>
                                                                            {Math.floor(
                                                                                row
                                                                                    .solarEstimation
                                                                                    .paybackPeriod
                                                                            )}{' '}
                                                                            years
                                                                        </span>
                                                                    )}
                                                                    {Math.floor(
                                                                        row
                                                                            .solarEstimation
                                                                            .paybackPeriod
                                                                    ) > 0 &&
                                                                        Math.ceil(
                                                                            DateUtils.getMonths(
                                                                                row
                                                                                    .solarEstimation
                                                                                    .paybackPeriod
                                                                            )
                                                                        ) >
                                                                            0 && (
                                                                            <span>
                                                                                ,
                                                                            </span>
                                                                        )}{' '}
                                                                    {Math.ceil(
                                                                        DateUtils.getMonths(
                                                                            row
                                                                                .solarEstimation
                                                                                .paybackPeriod
                                                                        )
                                                                    ) > 0 && (
                                                                        <span>
                                                                            {Math.ceil(
                                                                                DateUtils.getMonths(
                                                                                    row
                                                                                        .solarEstimation
                                                                                        .paybackPeriod
                                                                                )
                                                                            )}{' '}
                                                                            months
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                {/* <td className="td-accordion px-6 py-2 flex flex-row my-auto">
                                                                    <RiParkingBoxLine
                                                                        size={
                                                                            18
                                                                        }
                                                                        className="mr-1 my-auto"
                                                                    />
                                                                    <PiSolarRoofLight
                                                                        size={
                                                                            18
                                                                        }
                                                                        className="ml-1 my-auto"
                                                                    />
                                                                </td> */}
                                                                <td className="td-accordion relative px-12 py-2">
                                                                    <BsThreeDotsVertical
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            openActionMenu(
                                                                                e,
                                                                                index
                                                                            )
                                                                        }
                                                                        data-dropdown-toggle="dropdownAvatar1"
                                                                        size={
                                                                            18
                                                                        }
                                                                        className="mx-auto cursor-pointer"
                                                                    />
                                                                    <div
                                                                        id="dropdownAvatar1"
                                                                        className={`z-10 ${activeRow === index ? '' : 'hidden'} border border-gray-300 absolute right-4 top-6 mt-2 bg-white bg-white divide-y divide-gray-100 rounded-lg`}
                                                                    >
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="flex flex-row px-6 py-2 text-xs text-red-500 items-center cursor-pointer hover:bg-gray-100 hover:border hover:border-gray-300 hover:rounded-lg"
                                                                            onClick={(
                                                                                e
                                                                            ) => {
                                                                                e.stopPropagation();
                                                                                deleteWatchlistProperties(
                                                                                    id,
                                                                                    [
                                                                                        row.variationId
                                                                                    ]
                                                                                );
                                                                                setActiveRow(
                                                                                    null
                                                                                );
                                                                            }}
                                                                        >
                                                                            <span className="mr-3">
                                                                                Delete
                                                                            </span>
                                                                            <span>
                                                                                <FaRegTrashAlt />
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}
                        </>
                    </Accordion>
                </div>
            </div>
        </>
    );
};

export default WatchlistAccordion;
