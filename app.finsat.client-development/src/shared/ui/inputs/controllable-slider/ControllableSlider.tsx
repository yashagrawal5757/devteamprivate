import React from 'react';
import { Controller } from 'react-hook-form';
import { Slider } from 'antd';
import { MdOutlineInfo } from 'react-icons/md';

type ControllableSliderProps = {
    name: string;
    control: any;
    labelText?: string;
    errorMessage?: string;
    required: boolean;
    disabled?: boolean;
    min: number;
    max: number;
    step?: number;
    defaultValue?: number;
    marks?: Record<number, string | React.ReactNode>;
    open?: boolean;
    infoMessage?: boolean;
    onChange?: (value: number) => void;
};

const ControllableSlider = ({
    name,
    control,
    labelText,
    errorMessage,
    required: isRequired,
    disabled,
    min,
    max,
    step,
    defaultValue,
    marks,
    open,
    infoMessage,
    onChange
}: ControllableSliderProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div>
                    {labelText && (
                        <label
                            htmlFor={name}
                            className="block text-sm font-medium text-accent"
                        >
                            {labelText} {isRequired && <span>*</span>}
                        </label>
                    )}
                    {infoMessage && (
                        <div className="flex flex-row items-center italic mt-1">
                            <MdOutlineInfo className="text-primary mr-1" />
                            <label
                                htmlFor={name}
                                className="block text-xs font-medium text-accent"
                            >
                                Min: {min} and Max: {max}
                            </label>
                        </div>
                    )}
                    <Slider
                        {...field}
                        id={name}
                        min={min}
                        max={max}
                        step={step}
                        marks={marks}
                        tooltip={{ open: open }}
                        defaultValue={defaultValue}
                        disabled={disabled}
                        value={field.value}
                        onChange={(value) => {
                            field.onChange(value);
                            if (onChange) onChange(value);
                        }}
                    />
                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                </div>
            )}
        />
    );
};

export default ControllableSlider;
