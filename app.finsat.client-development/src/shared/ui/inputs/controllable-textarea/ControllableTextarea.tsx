import React from 'react';
import { Controller } from 'react-hook-form';

type ControllableTextareaProps = {
    id?: string;
    name: string;
    className?: string;
    placeholder?: string;
    control: any;
    labelText?: string;
    errorMessage?: string;
    required: boolean;
    disabled?: boolean;
    rows?: number;
    maxLength?: number;
};

const ControllableTextarea = ({
    id,
    name,
    placeholder,
    labelText,
    errorMessage,
    control,
    required: isRequired,
    disabled,
    rows = 3,
    maxLength
}: ControllableTextareaProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <>
                    {labelText && (
                        <label
                            htmlFor={name}
                            className="block text-sm font-medium text-accent"
                        >
                            {labelText} {isRequired && <span>*</span>}
                        </label>
                    )}
                    <textarea
                        {...field}
                        id={id}
                        name={name}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-l-8 focus:border-l-primary"
                        placeholder={placeholder}
                        disabled={disabled}
                        rows={rows}
                        maxLength={maxLength}
                    />
                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                </>
            )}
        />
    );
};

export default ControllableTextarea;
