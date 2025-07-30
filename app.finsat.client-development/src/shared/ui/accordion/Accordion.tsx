import React from 'react';
import useToggle from '@hooks/useToggle';
import { BsThreeDotsVertical } from 'react-icons/bs';

type AccordionProps = {
    isOpen: boolean;
    setOpen: (value: boolean) => void;
    title: string;
    children: React.ReactElement;
    actions?: Array<AccordionActionProps>;
};

type AccordionActionProps = {
    id: string;
    text: string;
    icon: JSX.Element;
    onClick: (id: string) => void;
};

const Accordion = ({
    isOpen,
    setOpen,
    title,
    children,
    actions
}: AccordionProps) => {
    const { isActive: isActionMenuActive, toggle: toggleActionMenu } =
        useToggle();

    const openActionMenu = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        toggleActionMenu();
    };

    return (
        <div id="accordion-collapse" data-accordion="collapse">
            <h2 id="accordion-collapse-heading-1">
                <button
                    type="button"
                    className="relative flex items-center justify-between w-full p-4 text-[#1c2833] rounded-md font-medium rtl:text-right font-semibold text-xs border border-gray-300 hover:bg-gray-100 gap-3"
                    onClick={() => setOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-controls="accordion-collapse-body-1"
                >
                    <div className="flex flex-row items-center">
                        <svg
                            data-accordion-icon
                            className={`w-2 h-2 shrink-0 transition-transform duration-200 ${!isOpen ? 'rotate-180' : ''}`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5 5 1 1 5"
                            />
                        </svg>
                        <span className="px-3">{title}</span>
                    </div>
                    {actions && (
                        <div>
                            <BsThreeDotsVertical
                                onClick={openActionMenu}
                                data-dropdown-toggle="dropdownAvatar1"
                                size={18}
                            />
                            <div
                                id="dropdownAvatar1"
                                className={`z-10 ${isActionMenuActive ? '' : 'hidden'} border border-gray-300 absolute right-2 top-8 mt-2 bg-white bg-white divide-y divide-gray-100 rounded-lg`}
                            >
                                {actions.map((action, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-row px-6 py-2 text-xs text-red-500 items-center hover:bg-gray-100 hover:border hover:border-gray-300 hover:rounded-lg"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            action.onClick(action.id);
                                            toggleActionMenu();
                                        }}
                                    >
                                        <span className="mr-3">
                                            {action.text}
                                        </span>
                                        <span>{action.icon}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </button>
            </h2>
            <div
                id="accordion-collapse-body-1"
                className={`${isOpen ? '' : 'hidden'}`}
                aria-labelledby="accordion-collapse-heading-1"
            >
                <div className="p-3 border border-gray-300 rounded-md mt-2">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Accordion;
