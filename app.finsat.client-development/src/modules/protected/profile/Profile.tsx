import React from 'react';
import ProfileTabs from './tabs/ProfileTabs';

const Profile = () => {
    return (
        <div className="relative w-full h-full bg-white overflow-y-auto p-8">
            <ProfileTabs />
        </div>
    );
};

export default Profile;
