import React from 'react';

const AssetSummary = () => {
    return (
        <>
            <h1 className="font-semibold text-xl mt-8 mb-4">Asset Summary</h1>
            <div className="border border-gray-300 rounded-lg p-6 bg-white">
                <div className="flex flex-row justify-between py-4 items-center">
                    <div>
                        <p>
                            Total Building Less <br /> (Yearly)
                        </p>
                    </div>
                    <div className="border border-gray-300 w-24 h-10 text-sm text-center content-center rounded-md font-semibold">
                        $360.450
                    </div>
                </div>
                <div className="flex flex-row justify-between py-4 items-center">
                    <div>
                        <p>
                            Updated Total Building Loss <br /> (Yearly)
                        </p>
                    </div>
                    <div className="border border-gray-300 w-24 h-10 text-sm text-center content-center rounded-md font-semibold">
                        $216.723
                    </div>
                </div>
                <div className="flex flex-row justify-between py-4 items-center">
                    <div>
                        <p>
                            Indirect Adaptation Cost <br /> (Yearly)
                        </p>
                    </div>
                    <div className="border border-gray-300 w-24 h-10 text-sm text-center content-center rounded-md font-semibold">
                        $0
                    </div>
                </div>
                <div className="flex flex-row justify-between py-4 items-center">
                    <div>
                        <p>
                            Adaptation Loss Savings <br /> (Yearly)
                        </p>
                    </div>
                    <div className="border border-gray-300 w-24 h-10 text-sm text-center content-center rounded-md font-semibold text-green-500">
                        $143.747
                    </div>
                </div>
                <div className="h-0.5 bg-gray-300 my-4"></div>
                <div className="flex flex-row justify-between py-4 items-center">
                    <div>
                        <p>
                            Direct Adaption Cost <br /> (One-Off)
                        </p>
                    </div>
                    <div className="border border-gray-300 w-24 h-10 text-sm text-center content-center rounded-md font-semibold">
                        $360.450
                    </div>
                </div>
                <div className="flex flex-row justify-between py-4 items-center">
                    <div>
                        <p>
                            Total Adaptation Cost <br /> (Yearly)
                        </p>
                    </div>
                    <div className="border border-gray-300 w-24 h-10 text-sm text-center content-center rounded-md font-semibold">
                        $216.723
                    </div>
                </div>
                <div className="flex flex-row justify-between py-4 items-center">
                    <div>
                        <p>
                            RQI <br /> (Yearly)
                        </p>
                    </div>
                    <div className="border border-gray-300 w-24 h-10 text-sm text-center content-center rounded-md font-semibold text-green-500">
                        709%
                    </div>
                </div>
                <div className="flex flex-row justify-between py-4 items-center">
                    <div>
                        <p>
                            RQI <br /> (All Time)
                        </p>
                    </div>
                    <div className="border border-gray-300 w-24 h-10 text-sm text-center content-center rounded-md font-semibold text-green-500">
                        1,66.4%
                    </div>
                </div>
            </div>
        </>
    );
};

export default AssetSummary;
