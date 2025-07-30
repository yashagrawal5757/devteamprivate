import CapsuleTabs from '@ui/tabs/capsule-tabs/CapsuleTabs';
import Calculator from './calculator/Calculator';
import PropertyAIAssistant from './ai-assistant/PropertyAIAssistant';

const tabData = [
    { id: 1, title: 'Calculator', content: Calculator },
    { id: 2, title: 'AI Assistant', content: PropertyAIAssistant }
];

const PropertyCalculator = () => {
    return (
        <div className="border border-accent-light rounded p-2 h-full">
            <div className="h-full">
                <CapsuleTabs data={tabData} />
            </div>
        </div>
    );
};

export default PropertyCalculator;
