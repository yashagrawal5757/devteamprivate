import React, { useState } from 'react';
import EditProfile from './edit-profile/EditProfile';
import ResetPassword from './reset-password/ResetPassword';
import VerticalTabs from '@ui/tabs/vertical-tabs/VerticalTabs';
import { FaRegUserCircle, FaUserCircle } from 'react-icons/fa';
import { MdLock, MdLockOutline } from 'react-icons/md';
import { RiUserSettingsFill, RiUserSettingsLine } from 'react-icons/ri';
import Preferences from './preferences/Preferences';

const ProfileTabs = () => {
    const [activeTab, setActiveTab] = useState(1);

    const tabData = [
        {
            id: 1,
            title: 'Profile',
            content: EditProfile,
            activeIcon: FaUserCircle,
            inactiveIcon: FaRegUserCircle
        },
        {
            id: 2,
            title: 'Security',
            content: ResetPassword,
            activeIcon: MdLock,
            inactiveIcon: MdLockOutline
        },
        {
            id: 3,
            title: 'Preferences',
            content: Preferences,
            activeIcon: RiUserSettingsFill,
            inactiveIcon: RiUserSettingsLine
        }
    ];

    return (
        <VerticalTabs
            data={tabData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />
    );
};

export default ProfileTabs;
