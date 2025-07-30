import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';

type InputType =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

type ControllableInputProps = {
    id?: string;
    name: string;
    className?: string;
    type: InputType;
    placeholder?: string;
    control: any;
    labelText?: string;
    errorMessage?: string;
    required: boolean;
    disabled?: boolean;
    step?: number;
    min?: number;
    max?: number;
    centralize?: boolean;
    icon?: JSX.Element;
};

const ControllableInput = ({
    id,
    name,
    type,
    placeholder,
    labelText,
    errorMessage,
    control,
    required: isRequired,
    disabled,
    step,
    min,
    max,
    centralize = false,
    icon
}: ControllableInputProps) => {
    const handleWheel = () => {
        const activeElement = document.activeElement as HTMLInputElement;

        if (activeElement && activeElement.type === 'number') {
            activeElement.blur();
        }
    };

    useEffect(() => {
        document.addEventListener('wheel', handleWheel);

        return () => {
            document.removeEventListener('wheel', handleWheel);
        };
    }, []);

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
                    <div className="relative">
                        <input
                            {...field}
                            type={type}
                            id={id}
                            name={name}
                            className={`mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm ${centralize ? 'text-center' : 'text-left'} focus:outline-none focus:border-l-8 focus:border-l-primary ${icon ? 'pr-10' : ''}`}
                            placeholder={placeholder}
                            disabled={disabled}
                            step={step}
                            min={min}
                            max={max}
                        />
                        {icon && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                {icon}
                            </div>
                        )}
                    </div>
                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                </>
            )}
        />
    );
};

export default ControllableInput;
