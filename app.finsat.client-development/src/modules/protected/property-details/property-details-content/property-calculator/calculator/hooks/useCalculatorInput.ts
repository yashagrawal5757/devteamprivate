import React, { useState } from 'react';

const useCalculatorInput = () => {
    const [isSolarPanelsOpen, setIsSolarPanelsOpen] = useState(false);
    const [isFinancialMetricsOpen, setIsFinancialMetricsOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const toggleAccordionSolarPanels = () => {
        setIsSolarPanelsOpen(!isSolarPanelsOpen);
    };

    const toggleAccordionFinancialMetrics = () => {
        setIsFinancialMetricsOpen(!isFinancialMetricsOpen);
    };

    const toggleExpand = () => {
        setExpanded((prev) => !prev);
    };

    return {
        isSolarPanelsOpen,
        isFinancialMetricsOpen,
        expanded,
        toggleAccordionSolarPanels,
        toggleAccordionFinancialMetrics,
        toggleExpand
    };
};

export default useCalculatorInput;
