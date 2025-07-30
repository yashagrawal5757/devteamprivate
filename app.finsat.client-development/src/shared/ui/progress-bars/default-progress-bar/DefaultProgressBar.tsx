import React from 'react';

type DefaultProgressBarProps = {
    title?: string;
    percentage: number;
    color: string;
    impact?: string;
};

const DefaultProgressBar = ({
    title,
    percentage,
    color,
    impact
}: DefaultProgressBarProps) => {
    return (
        <div>
            <div className="mb-2 text-sm font-medium text-gray-400">
                {title}:
            </div>
            <div className="flex flex-row">
                <div className="w-3/4">
                    <div className="w-full bg-gray-300 h-6 rounded-md">
                        <div
                            className="h-6 text-xs font-medium text-white text-end content-center p-0.5 pr-2 leading-none rounded-md"
                            style={{
                                width: `${percentage}%`,
                                backgroundColor: color
                            }}
                        >
                            {percentage}%
                        </div>
                    </div>
                </div>
                <div className="w-1/4 font-semibold text-sm ml-4">{impact}</div>
            </div>
        </div>
    );
};

export default DefaultProgressBar;
