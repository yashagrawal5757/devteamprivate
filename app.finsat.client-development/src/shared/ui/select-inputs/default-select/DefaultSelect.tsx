import React from 'react';

type DefaultSelectOption = {
    key: any;
    labelText: string;
};

type DefaultSelectProps = {
    id: string;
    options: Array<DefaultSelectOption>;
    name?: string;
    labelText?: string;
    selectedOptionKey?: any;
    disabled?: boolean;
    required?: boolean;
    errorMessage?: string;
    onChange?: (event: any) => void;
};

const DefaultSelect = ({
    id,
    options,
    name,
    labelText,
    selectedOptionKey,
    disabled,
    required,
    errorMessage,
    onChange
}: DefaultSelectProps) => {
    return (
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
                    id={id}
                    name={name}
                    className="mt-1 block text-primary w-full py-1 px-2 border border-white rounded focus:outline-none appearance-none pr-10"
                    disabled={disabled}
                    value={selectedOptionKey}
                    required={required}
                    onChange={onChange}
                >
                    {/* <option value="" disabled>
                        Select an option
                    </option> */}
                    {options.map((option) => (
                        <option
                            className="text-black"
                            key={option.key}
                            value={option.key}
                        >
                            {option.labelText}
                        </option>
                    ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-primary"
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
    );
};

export default DefaultSelect;
