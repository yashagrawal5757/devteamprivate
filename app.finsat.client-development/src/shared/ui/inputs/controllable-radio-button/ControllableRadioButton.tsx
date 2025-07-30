import React from 'react';
import { Controller } from 'react-hook-form';

type Option = {
    value: number;
    label: string;
};

type ControllableRadioButtonProps = {
    name: string;
    control: any;
    options: Option[];
    labelText?: string;
    required?: boolean;
    errorMessage?: string;
    onClick?: (value: any) => void;
};

const ControllableRadioButton = ({
    name,
    control,
    options,
    labelText,
    required,
    errorMessage,
    onClick
}: ControllableRadioButtonProps) => {
    return (
        <div>
            {labelText && (
                <label className="block text-sm font-medium text-accent">
                    {labelText} {required && <span>*</span>}
                </label>
            )}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div className="mt-2">
                        {options.map((option) => (
                            <label
                                key={option.value}
                                className="inline-flex items-center mr-4"
                            >
                                <input
                                    type="radio"
                                    value={option.value}
                                    checked={field.value === option.value}
                                    onChange={() => {
                                        field.onChange(option.value);
                                        onClick && onClick(option.value);
                                    }}
                                    className="form-radio text-primary"
                                />
                                <span className="ml-2">{option.label}</span>
                            </label>
                        ))}
                    </div>
                )}
            />
            {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
        </div>
    );
};

export default ControllableRadioButton;
