import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type TabProp = {
    id: number;
    title: string;
    content: React.ElementType;
};

type TabsProps = {
    data: Array<TabProp>;
};

const DefaultTabs = ({ data: tabData }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(tabData[0].id);

    return (
        <div className="h-full">
            <div className="h-1/10 content-center">
                <div className="mx-4 bg-white rounded-lg">
                    <ul className="flex flex-wrap justify-between text-sm font-medium text-center text-gray-500">
                        {tabData.map((tab) => (
                            <li key={tab.id} className="me-2">
                                <Link
                                    to="#"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`inline-block p-4 ${activeTab === tab.id ? 'text-primary font-semibold' : 'hover:text-primary'}`}
                                >
                                    {tab.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="h-9/10 py-4">
                <div
                    id="default-styled-tab-content rounded-lg"
                    style={{ height: '100%' }}
                >
                    {tabData.map((tab) => (
                        <div
                            key={tab.id}
                            className={`p-4 bg-white mx-4 rounded-lg ${activeTab === tab.id ? 'block' : 'hidden'}`}
                            role="tabpanel"
                            aria-labelledby={`${tab.title.toLowerCase()}-tab`}
                            style={{ height: '100%' }}
                        >
                            <tab.content />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DefaultTabs;
