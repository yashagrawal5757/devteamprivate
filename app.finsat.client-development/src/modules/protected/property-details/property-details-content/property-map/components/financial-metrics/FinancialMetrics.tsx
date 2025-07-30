import React from 'react';
import useSolarCalculationEstimate from 'modules/protected/property-details/hooks/solar-calculation-estimate/useSolarCalculationEstimate';
import { FaCircleArrowDown } from 'react-icons/fa6';
import Chart from 'react-apexcharts';
import usePropertyMap from '../../hooks/usePropertyMap';

type FinancialMetricsProps = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
};

const FinancialMetrics = ({
    isOpen,
    onClose,
    onOpen
}: FinancialMetricsProps) => {
    const {
        getCashFlowChartSeries,
        getCashFlowChartOptions,
        getNpvDiscountRateChartSeries,
        getNpvDiscountRateChartOptions,
        getPaybackPeriodChartSeries,
        getPaybackPeriodChartOptions
    } = usePropertyMap();

    const { solarFinancialOutput } = useSolarCalculationEstimate();

    if (solarFinancialOutput === undefined) {
        return;
    }

    return (
        <>
            <div
                className={`absolute bg-white bg-opacity-95 bottom-0 right-0 ${isOpen ? '' : 'translate-y-[-200%]'} w-full h-1/2 overflow-y-auto px-3 pt-2 transition-all duration-500 ${
                    isOpen
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-full'
                }`}
            >
                <div className="flex flex-row justify-between h-full overflow-hidden">
                    <div className="w-1/3 h-full m-0 p-0">
                        {solarFinancialOutput && (
                            <Chart
                                options={getCashFlowChartOptions()}
                                series={getCashFlowChartSeries()}
                                type="bar"
                                height="100%"
                            />
                        )}
                    </div>
                    <div className="w-1/3">
                        {solarFinancialOutput && (
                            <Chart
                                options={getNpvDiscountRateChartOptions()}
                                series={getNpvDiscountRateChartSeries()}
                                type="line"
                                height="100%"
                            />
                        )}
                    </div>
                    <div className="w-1/3">
                        {solarFinancialOutput && (
                            <Chart
                                options={getPaybackPeriodChartOptions()}
                                series={getPaybackPeriodChartSeries()}
                                type="line"
                                height="100%"
                            />
                        )}
                    </div>
                </div>
            </div>
            {!isOpen && (
                <div
                    className={`absolute bottom-0 right-0 bg-primary w-full h-[20px] flex justify-center items-center cursor-pointer`}
                    onClick={onOpen}
                >
                    <div className="w-full h-full">
                        <p className="text-xs text-center whitespace-nowrap overflow-hidden text-white pt-0.5">
                            Financial Metrics
                        </p>
                    </div>
                </div>
            )}
            <FaCircleArrowDown
                className={`absolute right-3 bottom-[48%] text-primary bg-white rounded-full cursor-pointer transition-transform ${
                    isOpen ? '' : 'translate-y-[-200%]'
                } ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
                size={22}
                onClick={onClose}
            />
        </>
    );
};

export default FinancialMetrics;
