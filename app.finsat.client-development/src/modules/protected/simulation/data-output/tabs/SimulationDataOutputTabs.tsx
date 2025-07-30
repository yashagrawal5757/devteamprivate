import React from 'react';
import SimulationDataOutputRisk from './risk/SimulationDataOutputRisk';
import SimulationDataOutputCalculator from './calculator/SimulationDataOutputCalculator';
import CapsuleTabs from '@ui/tabs/capsule-tabs/CapsuleTabs';

const tabData = [
    { id: 1, title: 'Risk', content: SimulationDataOutputRisk },
    {
        id: 2,
        title: 'Calculator',
        content: SimulationDataOutputCalculator
    }
];

const SimulationDataOutputTabs = () => {
    return (
        <div className="w-full mt-8">
            <CapsuleTabs data={tabData} />
        </div>
    );
};

export default SimulationDataOutputTabs;
