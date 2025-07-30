import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

type OptionType = {
    value: any;
    label: string;
};

type ControllableSelectProps<T extends FieldValues> = {
    id?: string;
    name: Path<T>;
    control: Control<T>;
    labelText?: string;
    errorMessage?: string;
    required?: boolean;
    disabled?: boolean;
    options: OptionType[];
    showOption?: boolean;
};

const ControllableSelect = <T extends FieldValues>({
    id,
    name,
    control,
    labelText,
    errorMessage,
    required,
    disabled,
    options,
    showOption = true
}: ControllableSelectProps<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <>
                    {labelText && (
                        <label
                            htmlFor={id}
                            className="block text-sm font-medium text-accent"
                        >
                            {labelText}
                        </label>
                    )}
                    <div className="relative">
                        <select
                            {...field}
                            id={id}
                            name={name}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none appearance-none pr-10"
                            disabled={disabled}
                            required={required}
                        >
                            {showOption && (
                                <option value="" disabled>
                                    Select an option
                                </option>
                            )}
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 9l6 6 6-6"
                                />
                            </svg>
                        </span>
                    </div>
                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                </>
            )}
        />
    );
};

export default ControllableSelect;
