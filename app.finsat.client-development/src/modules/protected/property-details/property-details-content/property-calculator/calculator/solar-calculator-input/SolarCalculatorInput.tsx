import React, { useEffect } from 'react';
import { SolarPanelType } from '@enums/SolarPanelType';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import solarPanelFormSchema from './SolarCalculatorInput.validators';
import ControllableSelect from '@ui/inputs/controllable-select/ControllableSelect';
import ControllableInput from '@ui/inputs/controllable-input/ControllableInput';
import ControllableCheckbox from '@ui/inputs/controllable-checkbox/ControllableCheckbox';
import { solarPanelEfficiencyMetadata } from '@metadata/SolarPanelType.metadata';
import ControllableRadioButton from '@ui/inputs/controllable-radio-button/ControllableRadioButton';
import { areaConfigurationTypeMetadata } from '@metadata/AreaConfigurationType.metadata';
import { AreaConfigurationType } from '@enums/AreaConfigurationType';
import useSolarCalculationEstimate from 'modules/protected/property-details/hooks/solar-calculation-estimate/useSolarCalculationEstimate';
import Button from '@ui/buttons/button/Button';
import useProperty from 'modules/protected/property-details/hooks/property/useProperty';
import { powerUnitMetadata } from '@metadata/PowerUnit.metadata';
import useProfile from 'modules/protected/profile/hooks/useProfile';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import Tooltip from '@ui/tooltip/Tooltip';
import { getPanelSpecsByType } from '@services/calculatorUtils';

export type SolarPanelForm = {
    type: { value: SolarPanelType };
    panelHorizontalLength: { value: number; isDefaultValue: boolean };
    panelVerticalLength: { value: number; isDefaultValue: boolean };
    panelEfficiency: { value: number; isDefaultValue: boolean };
    areaConfigurationType: { value: AreaConfigurationType };
    areaConfigurationValue: { value: number; isNull: boolean };
    slope: { value: number; isDefaultValue: boolean };
    revenuePerKWh: { value: number; isDefaultValue: boolean };
    electricityPrice: { value: number; isDefaultValue: boolean };
    maintenanceCost: { value: number; isDefaultValue: boolean };
};

const SolarCalculatorInput = () => {
    const {
        solarEstimateInput,
        solarPanelTypeOptions,
        onSubmitSolarGeneration
    } = useSolarCalculationEstimate();
    const { property } = useProperty();
    const { powerUnit } = useProfile();

    const defaultPanelType = getPanelSpecsByType(SolarPanelType.MONOCRYSTALLINE);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors }
    } = useForm<SolarPanelForm>({
        resolver: yupResolver(solarPanelFormSchema),
        defaultValues: {
            type: {
                value: SolarPanelType.MONOCRYSTALLINE
            },
            panelHorizontalLength: {
                value: defaultPanelType.width,
                isDefaultValue: false
            },
            panelVerticalLength: {
                value: defaultPanelType.height,
                isDefaultValue: false
            },
            panelEfficiency: {
                value: defaultPanelType.efficiency,
                isDefaultValue: false
            },
            areaConfigurationType: {
                value: AreaConfigurationType.BY_PANELS
            },
            areaConfigurationValue: {
                value: 1,
                isNull: false
            },
            slope: {
                value: 0.17,
                isDefaultValue: false
            },
            revenuePerKWh: {
                value: 1,
                isDefaultValue: false
            },
            electricityPrice: {
                value: 1,
                isDefaultValue: false
            },
            maintenanceCost: {
                value: 1,
                isDefaultValue: false
            }
        },
        mode: 'onChange',
        reValidateMode: 'onChange'
    });

    const areaConfigurationTypeValue = watch('areaConfigurationType.value');
    const panelTypeWatch = watch('type.value');

    const resetAreaConfigurationValue = (param: AreaConfigurationType): void => {
        const totalAvailableSpace = solarEstimateInput.solarPanelMetrics.totalAvailableSpace === 0 ? 1 : solarEstimateInput.solarPanelMetrics.totalAvailableSpace;
        const numberOfPanels = solarEstimateInput.solarPanelMetrics.areaConfigurationType === AreaConfigurationType.BY_PANELS ? solarEstimateInput.solarPanelMetrics.areaConfigurationValue : 1;

        if (param === AreaConfigurationType.BY_PANELS) {
            setValue('areaConfigurationValue.value', numberOfPanels as number);

            return;
        }

        if (param === AreaConfigurationType.BY_AREA) {
            setValue('areaConfigurationValue.value', totalAvailableSpace);

            return;
        }

        setValue('areaConfigurationValue.value', 1);
    };

    // useEffect(() => {
    //     if (areaConfigurationTypeValue === AreaConfigurationType.AUTOMATIC) {
    //         setValue('areaConfigurationValue.isNull', true, {
    //             shouldValidate: true
    //         });
    //     } else {
    //         setValue('areaConfigurationValue.isNull', false, {
    //             shouldValidate: true
    //         });
    //     }
    // }, [areaConfigurationTypeValue]);

    useEffect(() => {
        const panelTypeSpecs = getPanelSpecsByType(parseInt(panelTypeWatch as unknown as string));

        setValue('panelHorizontalLength.value', panelTypeSpecs.width);
        setValue('panelVerticalLength.value', panelTypeSpecs.height);
        setValue('panelEfficiency.value', panelTypeSpecs.efficiency);
    }, [panelTypeWatch]);

    useEffect(() => {
        setValue('type.value', solarEstimateInput.solarPanelMetrics.type!, { shouldDirty: false, shouldTouch: false });
        setValue(
            'panelHorizontalLength.value',
            solarEstimateInput.solarPanelMetrics.panelHorizontalLength!
        );
        setValue('panelHorizontalLength.isDefaultValue', false);
        setValue(
            'panelVerticalLength.value',
            solarEstimateInput.solarPanelMetrics.panelVerticalLength!
        );
        setValue('panelVerticalLength.isDefaultValue', false);
        setValue(
            'panelEfficiency.value',
            solarEstimateInput.solarPanelMetrics.panelEfficiency!
        );
        setValue('panelEfficiency.isDefaultValue', false);
        setValue(
            'areaConfigurationType.value',
            solarEstimateInput.solarPanelMetrics.areaConfigurationType!
        );
        setValue(
            'areaConfigurationValue.value',
            solarEstimateInput.solarPanelMetrics.areaConfigurationValue!
        );
        setValue(
            'slope.value',
            parseInt(solarEstimateInput.solarPanelMetrics.slope!.toString())
        );
        setValue('slope.isDefaultValue', false);
        setValue(
            'revenuePerKWh.value',
            solarEstimateInput.solarPanelMetrics.revenuePerKWh!
        );
        setValue('revenuePerKWh.isDefaultValue', false);
        setValue(
            'electricityPrice.value',
            solarEstimateInput.solarPanelMetrics.electricityPrice!
        );
        setValue('electricityPrice.isDefaultValue', false);
        setValue(
            'maintenanceCost.value',
            solarEstimateInput.solarPanelMetrics.maintenanceCost!
        );
        setValue('maintenanceCost.isDefaultValue', false);
    }, [solarEstimateInput]);

    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <p className="text-xs pr-1 w-1/3 flex items-center">Panel Type:
                    <span className='ml-1'>
                        <Tooltip message=" Select the type of solar panel which determines its performance characteristics">
                            <IoMdInformationCircleOutline size={14} />
                        </Tooltip>
                    </span>
                </p>
                <div className="w-2/3 text-xs">
                    <ControllableSelect
                        name={'type.value'}
                        control={control}
                        errorMessage={errors.type?.value?.message}
                        required={true}
                        options={solarPanelTypeOptions}
                    />
                </div>
            </div>
            <div className="flex flex-row items-center mt-3">
                <div className="w-1/3">
                    <p className="text-xs pr-1 flex items-center">Panel Height (m):
                        <span className='ml-1'>
                            <Tooltip message="The vertical dimension of a single panel, used to calculate total panel area">
                                <IoMdInformationCircleOutline size={14} />
                            </Tooltip>
                        </span>
                    </p>
                </div>
                <div className="flex flex-row justify-between w-2/3 items-center">
                    <div className="w-3/4 text-xs">
                        <ControllableInput
                            name="panelVerticalLength.value"
                            control={control}
                            type="number"
                            placeholder="Enter value"
                            required={true}
                            disabled={watch(
                                'panelVerticalLength.isDefaultValue'
                            )}
                            step={1}
                            errorMessage={
                                errors.panelVerticalLength?.value?.message
                            }
                        />
                    </div>
                    {/* <div className="text-xs">
                        <ControllableCheckbox
                            name={'panelVerticalLength.isDefaultValue'}
                            control={control}
                            labelText="Use Default Value"
                            errorMessage={
                                errors.panelVerticalLength?.isDefaultValue
                                    ?.message
                            }
                        />
                    </div> */}
                </div>
            </div>
            <div className="flex flex-row items-center mt-3">
                <div className="w-1/3">
                    <p className="text-xs pr-1 flex items-center">Panel Width (m):
                        <span className='ml-1'>
                            <Tooltip message="The horizontal dimension of a single panel, used to calculate total panel area">
                                <IoMdInformationCircleOutline size={14} />
                            </Tooltip>
                        </span>
                    </p>
                </div>
                <div className="flex flex-row justify-between w-2/3 items-center">
                    <div className="w-3/4 text-xs">
                        <ControllableInput
                            name="panelHorizontalLength.value"
                            control={control}
                            type="number"
                            placeholder="Enter value"
                            required={true}
                            disabled={watch(
                                'panelHorizontalLength.isDefaultValue'
                            )}
                            step={1}
                            errorMessage={
                                errors.panelHorizontalLength?.value?.message
                            }
                        />
                    </div>
                    {/* <div className="text-xs">
                        <ControllableCheckbox
                            name={'panelHorizontalLength.isDefaultValue'}
                            control={control}
                            labelText="Use Default Value"
                            errorMessage={
                                errors.panelHorizontalLength?.isDefaultValue
                                    ?.message
                            }
                        />
                    </div> */}
                </div>
            </div>
            <div className="flex flex-row items-center mt-3">
                <div className="w-1/3">
                    <p className="text-xs pr-1 flex items-center">Panel Efficiency (%):
                        <span className='ml-1'>
                            <Tooltip message=" The percentage of sunlight that the panel converts into usable electricity">
                                <IoMdInformationCircleOutline size={14} />
                            </Tooltip>
                        </span>
                    </p>
                </div>
                <div className="flex flex-row justify-between w-2/3 items-center">
                    <div className="w-3/4 text-xs">
                        <ControllableInput
                            name="panelEfficiency.value"
                            control={control}
                            type="number"
                            placeholder="Enter value"
                            required={true}
                            disabled={watch('panelEfficiency.isDefaultValue')}
                            step={1}
                            errorMessage={
                                errors.panelEfficiency?.value?.message
                            }
                            min={0}
                            max={33}
                        />
                    </div>
                    {/* <div className="text-xs">
                        <ControllableCheckbox
                            name={'panelEfficiency.isDefaultValue'}
                            control={control}
                            labelText="Use Default Value"
                            errorMessage={
                                errors.panelEfficiency?.isDefaultValue?.message
                            }
                        />
                    </div> */}
                </div>
            </div>
            <div className="flex flex-row mt-3 text-xs">
                <ControllableRadioButton
                    name={'areaConfigurationType.value'}
                    control={control}
                    options={Object.entries(areaConfigurationTypeMetadata).map(
                        ([value, label]) => ({
                            value: Number(value),
                            label
                        })
                    )}
                    labelText=""
                    required
                    errorMessage={errors.areaConfigurationType?.value?.message}
                    onClick={resetAreaConfigurationValue}
                />
            </div>
            {(areaConfigurationTypeValue === 0 ||
                areaConfigurationTypeValue === 1) && (
                    <div className="flex flex-row mt-3 items-center">
                        <div className="w-1/3">
                            <p className="text-xs pr-1 flex items-center">
                                {areaConfigurationTypeValue === 0
                                    ? 'Number of Panels:'
                                    : 'Area (m²):'}
                                <span className='ml-1'>
                                    <Tooltip message={areaConfigurationTypeValue === 0 ? 'The number of panels to be installed on the property' : 'The total area of panels to be installed on the property'}>
                                        <IoMdInformationCircleOutline size={14} />
                                    </Tooltip>
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-row justify-between w-2/3 items-center">
                            <div className="w-3/4 text-xs">
                                <ControllableInput
                                    name={'areaConfigurationValue.value'}
                                    control={control}
                                    type="number"
                                    errorMessage={
                                        errors.areaConfigurationValue?.value
                                            ?.message
                                    }
                                    required
                                // max={property?.schematic.size} TODO
                                />
                            </div>
                        </div>
                    </div>
                )}
            <div className="flex flex-row items-center mt-3">
                <div className="w-1/3">
                    <p className="text-xs pr-1 flex items-center">Slope (°):
                        <span className='ml-1'>
                            <Tooltip message="The tilt angle of the panel, which impacts solar energy production and performance">
                                <IoMdInformationCircleOutline size={14} />
                            </Tooltip>
                        </span>
                    </p>
                </div>
                <div className="flex flex-row justify-between w-2/3 items-center">
                    <div className="w-3/4 text-xs">
                        <ControllableInput
                            name="slope.value"
                            control={control}
                            type="number"
                            placeholder="Enter value"
                            required={true}
                            disabled={watch('slope.isDefaultValue')}
                            step={1}
                            errorMessage={errors.slope?.value?.message}
                        />
                    </div>
                    {/* <div className="text-xs">
                        <ControllableCheckbox
                            name={'slope.isDefaultValue'}
                            control={control}
                            labelText="Use Default Value"
                            errorMessage={errors.slope?.isDefaultValue?.message}
                        />
                    </div> */}
                </div>
            </div>
            <div className="flex flex-row items-center mt-3">
                <div className="w-1/3">
                    <p className="text-xs pr-1 flex items-center">
                        Revenue per MWh{' '}
                        (€):
                        <span className='ml-1'>
                            <Tooltip message="How much money is earned for each kilowatt-hour of electricity produced by the panels">
                                <IoMdInformationCircleOutline size={14} />
                            </Tooltip>
                        </span>
                    </p>
                </div>
                <div className="flex flex-row justify-between w-2/3 items-center">
                    <div className="w-3/4 text-xs">
                        <ControllableInput
                            name="revenuePerKWh.value"
                            control={control}
                            type="number"
                            placeholder="Enter value"
                            required={true}
                            disabled={watch('revenuePerKWh.isDefaultValue')}
                            step={1}
                            errorMessage={errors.revenuePerKWh?.value?.message}
                        />
                    </div>
                    {/* <div className="text-xs">
                        <ControllableCheckbox
                            name={'revenuePerKWh.isDefaultValue'}
                            control={control}
                            labelText="Use Default Value"
                            errorMessage={
                                errors.revenuePerKWh?.isDefaultValue?.message
                            }
                        />
                    </div> */}
                </div>
            </div>
            <div className="flex flex-row items-center mt-3">
                <div className="w-1/3">
                    <p className="text-xs pr-1">Electricity Price per {powerUnitMetadata[powerUnit?.powerUnit]} (€):
                        <span className='ml-1'>
                            <Tooltip message="The current or projected cost of electricity, used to estimate revenue or cost savings">
                                <IoMdInformationCircleOutline size={14} />
                            </Tooltip>
                        </span>
                    </p>
                </div>
                <div className="flex flex-row justify-between w-2/3 items-center">
                    <div className="w-3/4 text-xs">
                        <ControllableInput
                            name="electricityPrice.value"
                            control={control}
                            type="number"
                            placeholder="Enter value"
                            required={true}
                            disabled={watch('electricityPrice.isDefaultValue')}
                            step={1}
                            errorMessage={
                                errors.electricityPrice?.value?.message
                            }
                        />
                    </div>
                    {/* <div className="text-xs">
                        <ControllableCheckbox
                            name={'electricityPrice.isDefaultValue'}
                            control={control}
                            labelText="Use Default Value"
                            errorMessage={
                                errors.electricityPrice?.isDefaultValue?.message
                            }
                        />
                    </div> */}
                </div>
            </div>
            <div className="flex flex-row items-center mt-3">
                <div className="w-1/3">
                    <p className="text-xs pr-1">Maintenance Cost (€) / year:
                        <span className='ml-1'>
                            <Tooltip message="The  annual  cost to operate and maintain the solar system, subtracted from total projected revenue">
                                <IoMdInformationCircleOutline size={14} />
                            </Tooltip>
                        </span>
                    </p>
                </div>
                <div className="flex flex-row justify-between w-2/3 items-center">
                    <div className="w-3/4 text-xs">
                        <ControllableInput
                            name="maintenanceCost.value"
                            control={control}
                            type="number"
                            placeholder="Enter value"
                            required={true}
                            disabled={watch('maintenanceCost.isDefaultValue')}
                            step={1}
                            errorMessage={
                                errors.maintenanceCost?.value?.message
                            }
                        />
                    </div>
                    {/* <div className="text-xs">
                        <ControllableCheckbox
                            name={'maintenanceCost.isDefaultValue'}
                            control={control}
                            labelText="Use Default Value"
                            errorMessage={
                                errors.maintenanceCost?.isDefaultValue?.message
                            }
                        />
                    </div> */}
                </div>
            </div>
            <div className="flex justify-end mt-6 text-xs w-1/3 ml-auto">
                <Button
                    text="CALCULATE"
                    type="button"
                    onClick={handleSubmit(onSubmitSolarGeneration)}
                />
            </div>
        </div>
    );
};

export default SolarCalculatorInput;
