import React, { useState } from 'react';

type TabProp = {
    id: number;
    title: string;
    content: React.ElementType;
};

type TabsProps = {
    data: Array<TabProp>;
};

const CapsuleTabs = ({ data: tabData }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(tabData[0].id);

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedTabId = parseInt(event.target.value);
        setActiveTab(selectedTabId);
    };

    return (
        <div className="h-full">
            <div className="sm:hidden ml-8">
                <label htmlFor="tabs" className="sr-only">
                    Select your country
                </label>
                <select
                    id="tabs"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    value={activeTab}
                    onChange={handleSelectChange}
                >
                    {tabData.map((tab) => (
                        <option key={tab.id} value={tab.id}>
                            {tab.title}
                        </option>
                    ))}
                </select>
            </div>

            <ul className="hidden h-[46px] text-sm font-medium text-center text-gray-500 rounded justify-center sm:flex">
                {tabData.map((tab, index) => (
                    <li key={tab.id} className="w-1/2 focus-within:z-10">
                        <button
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`inline-block w-full px-4 py-3 font-semibold h-full
                                ${activeTab === tab.id ? 'text-white bg-primary' : 'bg-white hover:text-gray-700 hover:bg-gray-50'}
                                ${index === 0 ? 'rounded-l' : ''} 
                                ${index === tabData.length - 1 ? 'rounded-r' : ''} 
                                border border-gray-200 
                                `}
                            aria-current={
                                activeTab === tab.id ? 'page' : undefined
                            }
                        >
                            {tab.title}
                        </button>
                    </li>
                ))}
            </ul>

            <div
                id="default-styled-tab-content"
                className="tabs-content my-3 py-1 pr-2 rounded-lg overflow-y-auto"
            >
                {tabData.map((tab) => (
                    <div
                        key={tab.id}
                        className={`rounded-lg h-full ${activeTab === tab.id ? 'block' : 'hidden'}`}
                        role="tabpanel"
                        aria-labelledby={`${tab.title.toLowerCase()}-tab`}
                    >
                        <tab.content changeTab={setActiveTab} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CapsuleTabs;
