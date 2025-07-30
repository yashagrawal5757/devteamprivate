import React from 'react';
import { Controller } from 'react-hook-form';

type ControllableToggleProps = {
    id?: string;
    name: string;
    className?: string;
    control: any;
    labelText?: string;
    errorMessage?: string;
    disabled?: boolean;
};

const ControllableToggle = ({
    id,
    name,
    control,
    labelText,
    errorMessage,
    disabled
}: ControllableToggleProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex items-center mt-2">
                    <label className="relative flex justify-between items-center group text-xl">
                        <input
                            {...field}
                            type="checkbox"
                            id={id}
                            name={name}
                            className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md cursor-pointer"
                            disabled={disabled}
                        />
                        <span className="w-11 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-primary after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 peer-checked:after:cursor-pointer"></span>
                    </label>
                    {labelText && <span className="ml-2">{labelText}</span>}
                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                </div>
            )}
        />
    );
};

export default ControllableToggle;
