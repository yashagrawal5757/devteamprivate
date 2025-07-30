import { useMemo } from 'react';
import DefaultSelect from '@ui/select-inputs/default-select/DefaultSelect';
import useSolarCalculationEstimate from 'modules/protected/property-details/hooks/solar-calculation-estimate/useSolarCalculationEstimate';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { CalculateSolarPanelAnnualMetrics } from 'modules/protected/property-details/state/solar-generation-output/SolarGenerationOutputDefaults';
import DateUtils from '@services/dateUtils';
import NumberUtils from '@services/numberUtils';
import { getDisplayPowerUnit } from '@services/unitConversionUtils';
import useProfile from 'modules/protected/profile/hooks/useProfile';
import { powerUnitMetadata } from '@metadata/PowerUnit.metadata';
import { Month } from '@enums/Month';

type SolarDataProps = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    isFinancialPanelOpen: boolean;
};

const annualAndMonthMetadata: Record<Month | -1, string> = {
    [-1]: 'Annual',
    [Month.JANUARY]: 'January',
    [Month.FEBRUARY]: 'February',
    [Month.MARCH]: 'March',
    [Month.APRIL]: 'April',
    [Month.MAY]: 'May',
    [Month.JUNE]: 'June',
    [Month.JULY]: 'July',
    [Month.AUGUST]: 'August',
    [Month.SEPTEMBER]: 'September',
    [Month.OCTOBER]: 'October',
    [Month.NOVEMBER]: 'November',
    [Month.DECEMBER]: 'December'
};

const SolarData = ({
    isOpen,
    onClose,
    onOpen,
    isFinancialPanelOpen
}: SolarDataProps) => {
    const {
        solarEstimateInput,
        solarGenerationOutput,
        solarFinancialOutput,
        selectedOutputDataOption,
        handleSelectChange,
        filterDataByOption,
        convertToPercentage
    } = useSolarCalculationEstimate();

    const { powerUnit } = useProfile();

    const dataOutput = filterDataByOption(selectedOutputDataOption);

    const solarFinancialOutputData = solarFinancialOutput?.predictions.find(
        (prediction) =>
            prediction.discountRate ===
            solarEstimateInput.financialMetrics.discountRate
    );

    const isFinancialOpenAndHasData = useMemo(
        () => isFinancialPanelOpen && solarFinancialOutput !== undefined,
        [isFinancialPanelOpen, solarFinancialOutput]
    );

    if (
        solarGenerationOutput === undefined &&
        solarFinancialOutput === undefined
    ) {
        return;
    }

    return (
        <>
            <div
                className={`absolute bg-white bg-opacity-85 top-0 left-0 w-3/10 ${isFinancialOpenAndHasData ? 'h-1/2' : 'h-full'} overflow-y-auto p-3 transition-all duration-500 ${
                    isOpen
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-full'
                }`}
            >
                {solarGenerationOutput && (
                    <>
                        <p className="text-xs py-1 px-2 bg-white rounded text-primary font-semibold mb-2">
                            Overall Metrics
                        </p>
                        <div className="flex flex-row justify-between text-x border-b border-b-gray-300 p-1">
                            <p className="w-13/20">Watt Peak Power:</p>
                            <p className="w-7/20">
                                {NumberUtils.formatWithCommas(
                                    solarGenerationOutput.overallMetrics.wattPeakPower.toFixed(
                                        2
                                    )
                                )}{' '}
                                W
                            </p>
                        </div>
                        <div className="flex flex-row justify-between text-x border-b border-b-gray-300 p-1">
                            <p className="w-13/20">Total Watt Peak Power:</p>
                            <p className="w-7/20">
                                {NumberUtils.formatWithCommas(
                                    solarGenerationOutput.overallMetrics.totalWattPeakPower.toFixed(
                                        2
                                    )
                                )}{' '}
                                kW
                            </p>
                        </div>
                        <div className="flex flex-row justify-between text-x border-b border-b-gray-300 p-1">
                            <p className="w-13/20">Average Cash Flow:</p>
                            <p className="w-7/20">
                                {NumberUtils.formatWithCommas(
                                    solarGenerationOutput.predictedMetrics.cashFlow.toFixed(
                                        0
                                    )
                                )}
                                €
                            </p>
                        </div>
                    </>
                )}
                {solarFinancialOutputData && (
                    <>
                        <p className="text-xs py-1 px-2 bg-white rounded text-primary font-semibold mb-2 mt-4">
                            Investment
                        </p>
                        <div className="flex flex-row justify-between text-x border-b border-b-gray-300 p-1">
                            <p className="w-13/20">Net Present Value:</p>
                            <p className="w-7/20">
                                {NumberUtils.formatWithCommas(
                                    solarFinancialOutputData.netPresentValue.toFixed(
                                        0
                                    )
                                )}
                                €
                            </p>
                        </div>
                        <div className="flex flex-row justify-between text-x border-b border-b-gray-300 p-1">
                            <p className="w-13/20">Payback Period:</p>
                            <p className="w-7/20">
                                {Math.floor(
                                    solarFinancialOutputData.paybackPeriod
                                ) > 0 && (
                                    <span>
                                        {Math.floor(
                                            solarFinancialOutputData.paybackPeriod
                                        )}{' '}
                                        years
                                    </span>
                                )}
                                {Math.floor(
                                    solarFinancialOutputData.paybackPeriod
                                ) > 0 &&
                                    Math.ceil(
                                        DateUtils.getMonths(
                                            solarFinancialOutputData.paybackPeriod
                                        )
                                    ) > 0 && <span>,</span>}{' '}
                                {Math.ceil(
                                    DateUtils.getMonths(
                                        solarFinancialOutputData.paybackPeriod
                                    )
                                ) > 0 && (
                                    <span>
                                        {Math.ceil(
                                            DateUtils.getMonths(
                                                solarFinancialOutputData.paybackPeriod
                                            )
                                        )}{' '}
                                        months
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="flex flex-row justify-between text-x border-b border-b-gray-300 p-1">
                            <p className="w-13/20">Internal Rate of Return:</p>
                            <p className="w-7/20">
                                {solarFinancialOutputData.internalRateOfReturn.toFixed(
                                    2
                                )}{' '}
                                %
                            </p>
                        </div>
                    </>
                )}
                {solarGenerationOutput && dataOutput && (
                    <>
                        <div className="text-xs font-semibold mb-2 mt-4">
                            <DefaultSelect
                                id="calculator-metrics"
                                selectedOptionKey={selectedOutputDataOption}
                                options={[
                                    { key: 'Annual', labelText: 'Annual' },
                                    ...solarGenerationOutput.monthlyMetrics.map(
                                        (monthData, index) => {
                                            return {
                                                key: monthData.month,
                                                labelText:
                                                    annualAndMonthMetadata[
                                                        monthData.month
                                                    ]
                                            };
                                        }
                                    )
                                ]}
                                onChange={handleSelectChange}
                            />
                        </div>
                        <div className="flex flex-row justify-between text-x border-b border-b-gray-300 p-1">
                            <p className="w-13/20">Power Output:</p>
                            <p className="w-7/20">
                                {NumberUtils.formatWithCommas(
                                    getDisplayPowerUnit(
                                        dataOutput.powerOutput,
                                        powerUnit?.powerUnit
                                    ).toFixed(2)
                                )}{' '}
                                {powerUnitMetadata[powerUnit?.powerUnit]}
                            </p>
                        </div>
                        <div className="flex flex-row justify-between text-x border-b border-b-gray-300 p-1">
                            <p className="w-13/20">Total Power Output:</p>
                            <p className="w-7/20">
                                {NumberUtils.formatWithCommas(
                                    getDisplayPowerUnit(
                                        dataOutput.totalPowerOutput,
                                        powerUnit?.powerUnit
                                    ).toFixed(2)
                                )}{' '}
                                {powerUnitMetadata[powerUnit?.powerUnit]}
                            </p>
                        </div>
                        <div className="flex flex-row justify-between text-x border-b border-b-gray-300 p-1">
                            <p className="w-13/20">Energy Production:</p>
                            <p className="w-7/20">
                                {NumberUtils.formatWithCommas(
                                    getDisplayPowerUnit(
                                        dataOutput.energyProduction,
                                        powerUnit?.powerUnit
                                    ).toFixed(2)
                                )}{' '}
                                {powerUnitMetadata[powerUnit?.powerUnit]}
                            </p>
                        </div>
                        <div className="flex flex-row justify-between text-x border-b border-b-gray-300 p-1">
                            <p className="w-13/20">Net Power Output:</p>
                            <p className="w-7/20">
                                {NumberUtils.formatWithCommas(
                                    getDisplayPowerUnit(
                                        dataOutput.netPowerOutput,
                                        powerUnit?.powerUnit
                                    ).toFixed(2)
                                )}{' '}
                                {powerUnitMetadata[powerUnit?.powerUnit]}
                            </p>
                        </div>
                        <div className="flex flex-row justify-between text-x border-b border-b-gray-300 p-1">
                            <p className="w-13/20">Net Total Power Output:</p>
                            <p className="w-7/20">
                                {NumberUtils.formatWithCommas(
                                    getDisplayPowerUnit(
                                        dataOutput.netTotalPowerOutput,
                                        powerUnit?.powerUnit
                                    ).toFixed(2)
                                )}{' '}
                                {powerUnitMetadata[powerUnit?.powerUnit]}
                            </p>
                        </div>
                        <div className="flex flex-row justify-between text-x border-b border-b-gray-300 p-1">
                            <p className="w-13/20">Net Energy Production:</p>
                            <p className="w-7/20">
                                {NumberUtils.formatWithCommas(
                                    getDisplayPowerUnit(
                                        dataOutput.netEnergyProduction,
                                        powerUnit?.powerUnit
                                    ).toFixed(2)
                                )}{' '}
                                {powerUnitMetadata[powerUnit?.powerUnit]}
                            </p>
                        </div>
                        {selectedOutputDataOption === 'Annual' && (
                            <div className="flex flex-row justify-between text-x border-b border-b-gray-300 p-1 items-center">
                                <p className="w-13/20">
                                    Producible Energy Percentage:
                                </p>
                                <p className="w-7/20">
                                    {convertToPercentage(
                                        (
                                            dataOutput as CalculateSolarPanelAnnualMetrics
                                        ).producableEnergyPercentage
                                    ).toFixed(2)}{' '}
                                    %
                                </p>
                            </div>
                        )}
                        <div className="flex flex-row justify-between text-x border-b border-b-gray-300 p-1">
                            <p className="w-13/20">Energy Savings:</p>
                            <p className="w-7/20">
                                {NumberUtils.formatWithCommas(
                                    Math.abs(dataOutput.energySavings).toFixed(
                                        0
                                    )
                                )}
                                €
                            </p>
                        </div>
                        <div className="flex flex-row justify-between text-x border-b border-b-gray-300 p-1">
                            <p className="w-13/20">Cost Reduction:</p>
                            <p className="w-7/20">
                                {NumberUtils.formatWithCommas(
                                    Math.abs(dataOutput.costReduction).toFixed(
                                        0
                                    )
                                )}
                                €
                            </p>
                        </div>
                        <div className="flex flex-row justify-between text-x border-b border-b-gray-300 p-1">
                            <p className="w-13/20">Revenue:</p>
                            <p className="w-7/20">
                                {NumberUtils.formatWithCommas(
                                    dataOutput.energyRevenue.toFixed(0)
                                )}
                                €
                            </p>
                        </div>
                        <div className="flex flex-row justify-between text-x border-b border-b-gray-300 p-1">
                            <p className="w-13/20">Net Revenue:</p>
                            <p className="w-7/20">
                                {NumberUtils.formatWithCommas(
                                    dataOutput.netEnergyRevenue.toFixed(0)
                                )}
                                €
                            </p>
                        </div>
                    </>
                )}
            </div>
            {!isOpen && (
                <div
                    className={`absolute top-0 left-0 bg-primary w-[20px] ${isFinancialOpenAndHasData ? 'h-1/2' : 'h-full'} flex justify-center items-center cursor-pointer`}
                    onClick={onOpen}
                >
                    <div
                        className="w-full h-full"
                        style={{
                            writingMode: 'vertical-rl',
                            textOrientation: 'upright'
                        }}
                    >
                        <p className="text-xs text-center whitespace-nowrap overflow-hidden text-white pr-0.5">
                            Solar Data
                        </p>
                    </div>
                </div>
            )}
            <FaCircleArrowLeft
                className={`absolute top-3 left-[28.5%] text-primary bg-white rounded-full cursor-pointer transition-transform ${
                    isOpen ? '' : 'translate-x-[-200%]'
                } ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}
                size={22}
                onClick={onClose}
            />
        </>
    );
};

export default SolarData;
