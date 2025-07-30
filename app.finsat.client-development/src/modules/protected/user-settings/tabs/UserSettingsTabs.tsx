import React, { useState } from 'react';
import ReleaseNotes from './release-notes/ReleaseNotes';
import VerticalTabs from '@ui/tabs/vertical-tabs/VerticalTabs';
import { MdOutlineSpeakerNotes, MdSpeakerNotes } from 'react-icons/md';

const UserSettingsTabs = () => {
    const [activeTab, setActiveTab] = useState(1);

    const tabData = [
        {
            id: 1,
            title: 'Release Notes',
            content: ReleaseNotes,
            activeIcon: MdSpeakerNotes,
            inactiveIcon: MdOutlineSpeakerNotes
        }
    ];

    return (
        <div className="h-full">
            <VerticalTabs
                data={tabData}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </div>
    );
};

export default UserSettingsTabs;
