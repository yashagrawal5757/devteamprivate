import React from 'react';
import {
    FaArrowDown,
    FaArrowLeft,
    FaArrowRight,
    FaArrowUp
} from 'react-icons/fa';
import { RiScrollToBottomFill } from 'react-icons/ri';

const SimulationControlsInfo = () => {
    return (
        <div className="absolute top-4 left-4">
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <div className="flex mx-auto mb-1">
                        <span className="w-8 h-8 bg-gray-500 text-white rounded-lg content-center text-center">
                            W
                        </span>
                    </div>
                    <div className="flex flex-row">
                        <span className="w-8 h-8 bg-gray-500 text-white rounded-lg content-center text-center">
                            A
                        </span>
                        <span className="w-8 h-8 bg-gray-500 text-white rounded-lg content-center text-center mx-1">
                            S
                        </span>
                        <span className="w-8 h-8 bg-gray-500 text-white rounded-lg content-center text-center">
                            D
                        </span>
                    </div>
                </div>
                <div className="flex flex-col ml-4">
                    <div className="flex mx-auto mb-1">
                        <span className="w-8 h-8 bg-gray-500 text-white rounded-lg content-center">
                            <FaArrowUp className="mx-auto" />
                        </span>
                    </div>
                    <div className="flex flex-row">
                        <span className="w-8 h-8 bg-gray-500 text-white rounded-lg content-center">
                            <FaArrowLeft className="mx-auto" />
                        </span>
                        <span className="w-8 h-8 bg-gray-500 text-white rounded-lg content-center mx-1">
                            <FaArrowDown className="mx-auto" />
                        </span>
                        <span className="w-8 h-8 bg-gray-500 text-white rounded-lg content-center">
                            <FaArrowRight className="mx-auto" />
                        </span>
                    </div>
                </div>
                <div className="flex flex-col ml-4">
                    <div className="flex mx-auto mb-1 ml-0">
                        <span className="w-8 h-8 bg-gray-500 text-white rounded-lg content-center">
                            <RiScrollToBottomFill className="mx-auto rotate-180" />
                        </span>
                        <span className="ml-2 text-white">Scroll Up</span>
                    </div>
                    <div className="flex mx-auto">
                        <span className="w-8 h-8 bg-gray-500 text-white rounded-lg content-center">
                            <RiScrollToBottomFill className="mx-auto " />
                        </span>
                        <span className="ml-2 text-white">Scroll Down</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimulationControlsInfo;
