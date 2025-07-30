import React, { useCallback, useEffect, useRef, useState } from 'react';
import './MainLayout.css';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    IoIosNotificationsOutline,
    IoIosInformationCircleOutline,
    IoIosSearch
} from 'react-icons/io';
import { RiDashboardFill } from 'react-icons/ri';
import { HiMiniUsers } from 'react-icons/hi2';
import { MdLogout } from 'react-icons/md';
import useSessionData from '../../../hooks/useSessionData';
import NameInitialUtils from '../../../services/nameInitialUtils';
import { FaRegUser } from 'react-icons/fa';
import { Routes, RoutingKeys } from '../../../routes/router.keys';
import { Link } from 'react-router-dom';
import useDestinationLookup from '@hooks/useDestinationLookup';
import { IoCloseOutline } from 'react-icons/io5';
import _ from 'lodash';
import { BsFillBookmarkDashFill } from 'react-icons/bs';
import { ApplicationRole } from '@state/session-data/SessionDataDefaults';
import useSubscriptions from '@hooks/subscriptions/useSubscriptions';
import useExploreLoad from '@hooks/useExploreLoad';
import { GoCheck } from 'react-icons/go';
import { UpgradePlan } from '@enums/UpgradePlan';

const MainLayout = () => {
    const { logout, sessionData } = useSessionData();
    const {
        subscriptions,
        generateRedirectLink,
        getCurrentSubscriptionPlan,
        startSubscriptionPolling
    } = useSubscriptions();
    const navigate = useNavigate();
    const destinationLookup = useDestinationLookup();
    const { exploreLoading } = useExploreLoad();
    const profileRef = useRef<HTMLDivElement | null>(null);
    const upgradePlanRef = useRef<HTMLDivElement | null>(null);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [isUpgradPlaneDropdownOpen, setUpgradePlanDropdownOpen] =
        useState(false);

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const toggleUpgradePlanDropdown = () => {
        setUpgradePlanDropdownOpen(!isUpgradPlaneDropdownOpen);
    };

    const navigateToProfile = (e: any) => {
        e.preventDefault();
        setProfileDropdownOpen(false);
        navigate(RoutingKeys[Routes.PROFILE]);
    };

    const navigateToReleaseNotes = (e: any) => {
        e.preventDefault();
        setProfileDropdownOpen(false);
        navigate(RoutingKeys[Routes.RELEASE_NOTES]);
    };

    const debouncedSearch = useCallback(
        _.debounce((value: string) => {
            destinationLookup.displaySearchDestination(value);
        }, 500),
        []
    );

    const handleChange = (event: any) => {
        const { value } = event.target;
        destinationLookup.setLocation(value);
        debouncedSearch(value);
    };

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
    }, [profileRef]);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                upgradePlanRef.current &&
                !upgradePlanRef.current.contains(event.target)
            ) {
                setUpgradePlanDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
    }, [upgradePlanRef]);

    useEffect(() => {
        getCurrentSubscriptionPlan();
    }, []);

    return (
        <div className="h-screen w-screen">
            <div className="header h-[80px] flex items-center justify-between border-solid border-b-2 border-b-primary bg-primary">
                <div className="flex items-center ml-4">
                    <img
                        src="/logo.png"
                        alt="FinSat Logo"
                        className="h-7 ml-2"
                    />
                </div>
                <div className="relative w-2/5">
                    <canvas
                        id="pseudoCesiumContainer"
                        className="w-32 h-32 hidden"
                    ></canvas>
                    <input
                        type="text"
                        className={`w-full pl-9 pr-3 py-3 border border-gray-300 focus:outline-none rounded-lg text-xs`}
                        placeholder="Search by address, company, city, state, or zip code..."
                        value={destinationLookup.location}
                        onChange={handleChange}
                    />
                    <IoIosSearch className="absolute left-3 top-3 text-primary text-md" />
                    {destinationLookup.location !== undefined &&
                        destinationLookup.location !== '' && (
                            <button
                                className="absolute right-4 top-3 text-gray-400"
                                onClick={destinationLookup.clearLocation}
                            >
                                <IoCloseOutline className="text-primary text-md" />
                            </button>
                        )}
                    {destinationLookup.searchDestinations.length > 0 && (
                        <ul className="absolute z-30 top-10 w-full mt-2 bg-white border border-gray-300 rounded-lg">
                            {destinationLookup.searchDestinations.map(
                                (suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            exploreLoading();
                                            destinationLookup.handleDestinationClick(
                                                suggestion
                                            );
                                            destinationLookup.setLocation('');
                                            navigate(
                                                RoutingKeys[Routes.EXPLORE]
                                            );
                                        }}
                                        className="cursor-pointer px-4 py-2 hover:bg-gray-100 hover:rounded-lg text-xs"
                                    >
                                        {suggestion.displayName}
                                    </li>
                                )
                            )}
                        </ul>
                    )}
                </div>
                <div className="flex items-center space-x-4 mr-8">
                    {/* <button className="text-3xl text-white">
                        <IoIosNotificationsOutline />
                    </button> */}
                    <div ref={upgradePlanRef}>
                        <button
                            id="dropdownUpgradePlanButton"
                            data-dropdown-toggle="dropdownUpgradePlan"
                            className="flex justify-center p-3 bg-gray-50 rounded-lg text-xs"
                            type="button"
                            onClick={toggleUpgradePlanDropdown}
                        >
                            Upgrade to Pro
                        </button>
                        <div
                            id="dropdownUpgradePlan"
                            className={`z-20 ${isUpgradPlaneDropdownOpen ? '' : 'hidden'} border-gray shadow-lg absolute right-36 top-14 mt-2 bg-white bg-white divide-y divide-gray-100 rounded-lg shadow`}
                        >
                            <div className="flex flex-row justify-between items-center px-4 py-3 text-sm text-gray-900 font-medium">
                                <div className="flex flex-col">
                                    <div>Free</div>
                                    <div className="text-xs truncate">
                                        Use for free
                                    </div>
                                </div>
                                {subscriptions.plan === UpgradePlan.FREE && (
                                    <GoCheck size={18} className="ml-8" />
                                )}
                            </div>
                            <div className="flex flex-row justify-between items-center px-4 py-3 text-sm text-gray-900 font-medium">
                                <div className="flex flex-col">
                                    <div>Basic</div>
                                    <div className="text-xs truncate">
                                        Increase your estimation & more
                                    </div>
                                </div>
                                {subscriptions.plan === UpgradePlan.BASIC ? (
                                    <GoCheck size={18} className="ml-8" />
                                ) : (
                                    <button
                                        id="dropdownUpgradePlanButton"
                                        data-dropdown-toggle="dropdownUpgradePlan"
                                        className="flex justify-center px-3 py-2 bg-gray-200 rounded-full text-xs ml-6"
                                        type="button"
                                        onClick={() => {
                                            generateRedirectLink();
                                            setUpgradePlanDropdownOpen(false);
                                            startSubscriptionPolling();
                                        }}
                                    >
                                        <p className="content-center">
                                            Upgrade
                                        </p>
                                    </button>
                                )}
                            </div>
                            <div className="px-4 py-3 text-sm text-gray-900 font-medium">
                                <div>Enterprise</div>
                                <div className="text-xs truncate">
                                    Contact Sales
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="p-2 text-3xl text-white">
                        <IoIosInformationCircleOutline
                            onClick={navigateToReleaseNotes}
                        />
                    </button>
                    <div ref={profileRef}>
                        <button
                            id="dropdownUserAvatarButton"
                            data-dropdown-toggle="dropdownAvatar"
                            className="flex justify-center p-3 w-[40px] h-[40px] bg-gray-300 rounded-full text-xs w-8 h-8 md:me-0"
                            type="button"
                            onClick={toggleProfileDropdown}
                        >
                            {NameInitialUtils.getInitials(
                                `${sessionData.authenticatedUser?.firstName} ${sessionData.authenticatedUser?.lastName}`
                            )}
                        </button>
                        <div
                            id="dropdownAvatar"
                            className={`z-20 ${isProfileDropdownOpen ? '' : 'hidden'} border-gray shadow-lg absolute right-6 top-14 mt-2 bg-gray-50 divide-y divide-gray-100 rounded-lg shadow`}
                        >
                            <div className="px-4 py-3 text-sm text-gray-900">
                                <div>
                                    {sessionData.authenticatedUser?.firstName}{' '}
                                    {sessionData.authenticatedUser?.lastName}
                                </div>
                                <div className="font-medium truncate">
                                    {sessionData.authenticatedUser?.email}
                                </div>
                            </div>
                            <div className="py-2">
                                <Link
                                    to="#"
                                    onClick={navigateToProfile}
                                    className="block flex items-center px-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <button className="p-2 text-xl text-gray-600">
                                        <FaRegUser size={20} />
                                    </button>
                                    <span>Profile</span>
                                </Link>
                            </div>
                            <div className="py-2">
                                <Link
                                    to="#"
                                    onClick={logout}
                                    className="block flex items-center px-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <button className="p-2 text-xl text-gray-600">
                                        <MdLogout />
                                    </button>
                                    <span>Sign out</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-layout flex flex-row">
                <div className="w-1/18 border-solid border-r-2 border-r-gray-200">
                    <nav className="min-w-max">
                        <ul className="space-y-2 text-2xl">
                            <li className="flex flex-col justify-center">
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `nav-links w-full flex justify-center py-4 hover:text-primary ${isActive ? 'text-primary' : ''}`
                                    }
                                    style={({ isActive }) => ({
                                        color: isActive ? undefined : '#C8D1DA'
                                    })}
                                >
                                    <RiDashboardFill />
                                </NavLink>
                                <NavLink
                                    to="/watchlist"
                                    className={({ isActive }) =>
                                        `nav-links w-full flex justify-center py-4 hover:text-primary ${isActive ? 'text-primary' : ''}`
                                    }
                                    style={({ isActive }) => ({
                                        color: isActive ? undefined : '#C8D1DA',
                                        fontSize: '22px'
                                    })}
                                >
                                    <BsFillBookmarkDashFill />
                                </NavLink>
                                {sessionData.authenticatedUser?.role ===
                                    ApplicationRole.Admin && (
                                    <NavLink
                                        to="/waitlist-users"
                                        className={({ isActive }) =>
                                            `nav-links w-full flex justify-center py-4 hover:text-primary ${isActive ? 'text-primary' : ''}`
                                        }
                                        style={({ isActive }) => ({
                                            color: isActive
                                                ? undefined
                                                : '#C8D1DA'
                                        })}
                                    >
                                        <HiMiniUsers />
                                    </NavLink>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="w-17/18 h-full overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
