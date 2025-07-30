import React from 'react';
import Accordion from '@ui/accordion/Accordion';
import SolarCalculatorInput from './solar-calculator-input/SolarCalculatorInput';
import useCalculatorInput from './hooks/useCalculatorInput';
import FinancialCalculatorInput from './financial-calculator-input/FinancialCalculatorInput';

const Calculator = () => {
    const {
        isSolarPanelsOpen,
        isFinancialMetricsOpen,
        toggleAccordionSolarPanels,
        toggleAccordionFinancialMetrics
    } = useCalculatorInput();

    return (
        <>
            <div>
                <Accordion
                    isOpen={isSolarPanelsOpen}
                    setOpen={() => toggleAccordionSolarPanels()}
                    title={'Solar Panel Performance'}
                >
                    <SolarCalculatorInput />
                </Accordion>
            </div>
            <div className="mt-3">
                <Accordion
                    isOpen={isFinancialMetricsOpen}
                    setOpen={() => toggleAccordionFinancialMetrics()}
                    title={'Financial Metrics'}
                >
                    <FinancialCalculatorInput />
                </Accordion>
            </div>
        </>
    );
};

export default Calculator;
