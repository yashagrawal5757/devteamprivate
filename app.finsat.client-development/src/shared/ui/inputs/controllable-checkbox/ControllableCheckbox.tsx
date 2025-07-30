import React from 'react';
import { Controller } from 'react-hook-form';
import './ControllableCheckbox.css';

type ControllableCheckboxProps = {
    id?: string;
    name: string;
    className?: string;
    control: any;
    labelText?: string;
    errorMessage?: string;
    required?: boolean;
    disabled?: boolean;
};

const ControllableCheckbox = ({
    id,
    name,
    control,
    labelText,
    errorMessage,
    required,
    disabled
}: ControllableCheckboxProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex items-center mt-auto">
                    <label className="flex items-center mt-6"></label>
                    <input
                        {...field}
                        type={'checkbox'}
                        id={id}
                        name={name}
                        className="controllable-checkbox w-4 h-4"
                        disabled={disabled}
                        checked={field.value}
                    />
                    {labelText && <span className="ml-2">{labelText}</span>}
                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                </div>
            )}
        />
    );
};

export default ControllableCheckbox;
