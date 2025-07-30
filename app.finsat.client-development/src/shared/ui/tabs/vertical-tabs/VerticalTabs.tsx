import React from 'react';
import { Link } from 'react-router-dom';

type TabProp = {
    id: number;
    title: string;
    content: React.ElementType;
    activeIcon: any;
    inactiveIcon: any;
};

type TabsProps = {
    data: Array<TabProp>;
    activeTab: number;
    setActiveTab: (id: number) => void;
};

const VerticalTabs = ({
    data: tabData,
    activeTab,
    setActiveTab
}: TabsProps) => {
    return (
        <div className="md:flex h-full">
            <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 md:me-4 mb-4 md:mb-0">
                {tabData.map((tab) => {
                    const Icon =
                        activeTab === tab.id
                            ? tab.activeIcon
                            : tab.inactiveIcon;
                    return (
                        <li
                            key={tab.id}
                            className={`rounded-lg border border-transparent
                            ${
                                activeTab === tab.id
                                    ? 'text-white bg-primary'
                                    : 'hover:text-primary hover:border hover:border-primary'
                            }`}
                        >
                            <Link
                                key={tab.id}
                                to="#"
                                onClick={() => setActiveTab(tab.id)}
                                className={`inline-flex items-center px-4 py-4 rounded-lg w-64 ${
                                    activeTab === tab.id
                                        ? 'text-white bg-primary'
                                        : 'bg-gray-50'
                                }`}
                            >
                                <Icon className="w-4 h-4 mr-2" />
                                {tab.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <div className="p-6 bg-gray-50 text-medium text-gray-500 rounded-lg w-full h-full overflow-y-auto">
                {tabData.map((tab) => (
                    <div
                        key={tab.id}
                        className={activeTab === tab.id ? 'block' : 'hidden'}
                    >
                        <tab.content />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerticalTabs;
