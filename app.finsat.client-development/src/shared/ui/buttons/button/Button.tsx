import React, { useEffect, useState } from 'react';

type ButtonType = 'button' | 'submit' | 'reset';

type ButtonStyleType =
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'light-gray'
    | 'dark-gray'
    | 'white'
    | 'danger';

type ButtonProps = {
    text: string;
    type: ButtonType;
    onClick: () => void;
    styleType?: ButtonStyleType;
    disabled?: boolean;
    icon?: JSX.Element;
};

const Button = ({
    text,
    type,
    onClick,
    styleType,
    disabled,
    icon
}: ButtonProps) => {
    const [classType, setClassType] = useState<ButtonStyleType>('primary');

    useEffect(() => {
        if (styleType === undefined) {
            return;
        }

        setClassType(styleType);
    }, [styleType]);

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`flex flex-row items-center justify-center h-max p-2.5 rounded-md w-full
                ${classType === 'primary' ? `bg-primary text-white ${!disabled ? 'hover:bg-primary_hover' : ''}` : ''}
                ${classType === 'secondary' ? `bg-secondary text-white ${!disabled ? 'hover:bg-primary_hover' : ''}` : ''}
                ${classType === 'accent' ? `bg-accent text-white ${!disabled ? 'hover:bg-gray-400' : ''}` : ''}
                ${classType === 'light-gray' ? `bg-gray-200 text-black ${!disabled ? 'hover:text-white hover:bg-gray-400' : ''}` : ''}
                ${classType === 'dark-gray' ? `bg-[#6E879D] text-white ${!disabled ? 'hover:text-white hover:bg-[#5B7082]' : ''}` : ''}
                ${classType === 'white' ? `bg-white text-black ${!disabled ? 'hover:bg-gray-200' : ''}` : ''}
                ${classType === 'danger' ? `bg-red-500 text-white ${!disabled ? 'hover:bg-red-700' : ''}` : ''}
            `}
        >
            {icon}
            {text}
        </button>
    );
};

export default Button;
