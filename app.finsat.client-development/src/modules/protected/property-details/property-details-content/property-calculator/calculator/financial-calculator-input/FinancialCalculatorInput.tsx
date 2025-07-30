import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import financialFormSchema from './FinancialCalculatorInput.validators';
import ControllableInput from '@ui/inputs/controllable-input/ControllableInput';
import ControllableCheckbox from '@ui/inputs/controllable-checkbox/ControllableCheckbox';
import useSolarCalculationEstimate from 'modules/protected/property-details/hooks/solar-calculation-estimate/useSolarCalculationEstimate';
import Button from '@ui/buttons/button/Button';
import useCalculatorInput from '../hooks/useCalculatorInput';
import Tooltip from '@ui/tooltip/Tooltip';
import { IoMdInformationCircleOutline } from 'react-icons/io';

export type FinancialForm = {
    systemCost: { value: number; isDefaultValue: boolean };
    discountRate: { value: number; isDefaultValue: boolean };
    projectLifetime: { value: number; isDefaultValue: boolean };
    cashFlows: { value: number }[];
};

const FinancialCalculatorInput = () => {
    const {
        solarEstimateInput,
        solarGenerationOutput,
        onSubmitSolarFinancial
    } = useSolarCalculationEstimate();
    const { expanded, toggleExpand } = useCalculatorInput();

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors }
    } = useForm<FinancialForm>({
        resolver: yupResolver(financialFormSchema),
        defaultValues: {
            systemCost: {
                value: 1,
                isDefaultValue: false
            },
            discountRate: {
                value: 1,
                isDefaultValue: false
            },
            projectLifetime: {
                value: 1,
                isDefaultValue: false
            },
            cashFlows: []
        },
        mode: 'onChange',
        reValidateMode: 'onChange'
    });

    const applyFirstCashFlow = () => {
        const firstValue = getValues('cashFlows.0.value');
        const updatedCashFlows = getValues('cashFlows').map(() => ({
            value: firstValue
        }));
        setValue('cashFlows', updatedCashFlows);
    };

    const projectLifetimeValue = watch('projectLifetime.value');

    useEffect(() => {
        const currentCashFlow = getValues('cashFlows') || [];

        const newCashFlow = Array.from(
            { length: projectLifetimeValue },
            (_, i) => {
                const value = solarGenerationOutput
                    ? parseFloat(
                        solarGenerationOutput.predictedMetrics.cashFlow?.toFixed(
                            2
                        )
                    )
                    : parseFloat((currentCashFlow[i]?.value || 1)?.toFixed(2));
                return { value };
            }
        );

        setValue('cashFlows', newCashFlow);
    }, [
        projectLifetimeValue,
        setValue,
        getValues,
        solarGenerationOutput?.predictedMetrics.cashFlow
    ]);

    useEffect(() => {
        setValue(
            'systemCost.value',
            solarEstimateInput.financialMetrics.systemCost!
        );
        setValue('systemCost.isDefaultValue', false);
        setValue(
            'discountRate.value',
            solarEstimateInput.financialMetrics.discountRate!
        );
        setValue('discountRate.isDefaultValue', false);
        setValue(
            'projectLifetime.value',
            solarEstimateInput.financialMetrics.projectLifetime!,
            {
                shouldValidate: false,
                shouldDirty: false,
                shouldTouch: false
            }
        );
        setValue('projectLifetime.isDefaultValue', false, {
            shouldValidate: false,
            shouldDirty: false,
            shouldTouch: false
        });
        const formattedCashFlows = Array.isArray(
            solarEstimateInput.financialMetrics.cashFlows
        )
            ? solarEstimateInput.financialMetrics.cashFlows.map((value) => ({
                value: value ?? 0
            }))
            : [];
        setValue('cashFlows', formattedCashFlows);
    }, [solarEstimateInput.financialMetrics]);

    return (
        <div>
            <div className="flex flex-row items-center">
                <div className="w-1/3">
                    <p className="text-xs pr-1 flex items-center">System Cost (€):
                        <span className='ml-1'>
                            <Tooltip message="The upfront investment at year 0 (cash flow 1), representing the full cost to purchase and install the solar system">
                                <IoMdInformationCircleOutline size={14} />
                            </Tooltip>
                        </span>
                    </p>
                </div>
                <div className="flex flex-row justify-between w-2/3 items-center">
                    <div className="w-3/4 text-xs">
                        <ControllableInput
                            name="systemCost.value"
                            control={control}
                            type="number"
                            placeholder="Enter value"
                            required={true}
                            disabled={watch('systemCost.isDefaultValue')}
                            step={1}
                            errorMessage={errors.systemCost?.value?.message}
                        />
                    </div>
                    {/* <div className="text-xs">
                        <ControllableCheckbox
                            name={'systemCost.isDefaultValue'}
                            control={control}
                            labelText="Use Default Value"
                            errorMessage={errors.systemCost?.isDefaultValue?.message}
                        />
                    </div> */}
                </div>
            </div>
            <div className="flex flex-row items-center mt-3">
                <div className="w-1/3">
                    <p className="text-xs pr-1 flex items-center">Discount Rate (%):
                        <span className='ml-1'>
                            <Tooltip message="The percentage used  to adjust future cash flows to their present value, reflecting the cost of capital, risk, or desired return. Higher rates reduce the present value of future earnings">
                                <IoMdInformationCircleOutline size={14} />
                            </Tooltip>
                        </span>
                    </p>
                </div>
                <div className="flex flex-row justify-between w-2/3 items-center">
                    <div className="w-3/4 text-xs">
                        <ControllableInput
                            name="discountRate.value"
                            control={control}
                            type="number"
                            placeholder="Enter value"
                            required={true}
                            disabled={watch('discountRate.isDefaultValue')}
                            step={1}
                            errorMessage={errors.discountRate?.value?.message}
                        />
                    </div>
                    {/* <div className="text-xs">
                        <ControllableCheckbox
                            name={'discountRate.isDefaultValue'}
                            control={control}
                            labelText="Use Default Value"
                            errorMessage={errors.discountRate?.isDefaultValue?.message}
                        />
                    </div> */}
                </div>
            </div>
            <div className="flex flex-row items-center mt-3">
                <div className="w-1/3">
                    <p className="text-xs pr-1 flex items-center">Project Lifetime (Years):
                        <span className='ml-1'>
                            <Tooltip message="The expected operational lifespan of the solar system, used to project long-term returns">
                                <IoMdInformationCircleOutline size={14} />
                            </Tooltip>
                        </span>
                    </p>
                </div>
                <div className="flex flex-row justify-between w-2/3 items-center">
                    <div className="w-3/4 text-xs">
                        <ControllableInput
                            name="projectLifetime.value"
                            control={control}
                            type="number"
                            placeholder="Enter value"
                            required={true}
                            disabled={watch('projectLifetime.isDefaultValue')}
                            step={1}
                            errorMessage={
                                errors.projectLifetime?.value?.message
                            }
                        />
                    </div>
                    {/* <div className="text-xs">
                        <ControllableCheckbox
                            name={'projectLifetime.isDefaultValue'}
                            control={control}
                            labelText="Use Default Value"
                            errorMessage={errors.projectLifetime?.isDefaultValue?.message}
                        />
                    </div> */}
                </div>
            </div>
            {projectLifetimeValue > 0 && (
                <div className="mt-3 border border-gray-300 bg-gray-100 rounded-lg p-8">
                    {expanded && (
                        <div className="flex mb-4">
                            <div className="flex flex-col mr-4 text-xs w-2/3">
                                <p className="text-xs">{`Cash Flow Y1 (€):`}</p>
                                <ControllableInput
                                    name="cashFlows.0.value"
                                    control={control}
                                    type="number"
                                    placeholder="Enter value"
                                    required={true}
                                    step={0.1}
                                    centralize={true}
                                    errorMessage={
                                        errors.cashFlows?.[0]?.value?.message
                                    }
                                />
                                <p className="mt-1 text-primary italic">
                                    Use this as a master input to apply the same
                                    value to all years. Each year can still be
                                    edited manually.
                                </p>
                            </div>
                            <div className="w-1/3 mt-5 text-sm">
                                <Button
                                    text="Apply"
                                    type="button"
                                    onClick={applyFirstCashFlow}
                                />
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                        {(expanded
                            ? watch('cashFlows')?.slice(1)
                            : watch('cashFlows')?.slice(0, 9)
                        )?.map((_, index) => (
                            <div key={index} className="flex flex-col text-xs">
                                <p className="text-xs">{`Cash Flow Y${expanded ? index + 2 : index + 1} (€):`}</p>
                                <ControllableInput
                                    name={`cashFlows.${expanded ? index + 1 : index}.value`}
                                    control={control}
                                    type="number"
                                    placeholder="Enter value"
                                    required={true}
                                    step={0.1}
                                    centralize={true}
                                    errorMessage={
                                        errors.cashFlows?.[
                                            expanded ? index + 1 : index
                                        ]?.value?.message
                                    }
                                />
                            </div>
                        ))}
                    </div>
                    {watch('cashFlows')?.length > 9 && (
                        <>
                            {!expanded && (
                                <button
                                    onClick={toggleExpand}
                                    className="mt-6 text-primary text-sm font-semibold"
                                >
                                    See all{' '}
                                    <span className="bg-blue-100 py-3 px-4 ml-2 rounded-s-full rounded-e-full">
                                        {' '}
                                        +{watch('cashFlows').length - 9}
                                    </span>
                                </button>
                            )}
                            {expanded && (
                                <button
                                    onClick={toggleExpand}
                                    className="mt-6 text-blue-900 text-sm font-semibold"
                                >
                                    See less
                                </button>
                            )}
                        </>
                    )}
                </div>
            )}
            <div className="flex justify-end mt-6 text-xs w-1/3 ml-auto">
                <Button
                    text="CALCULATE"
                    type="button"
                    onClick={handleSubmit(onSubmitSolarFinancial)}
                />
            </div>
        </div>
    );
};

export default FinancialCalculatorInput;
