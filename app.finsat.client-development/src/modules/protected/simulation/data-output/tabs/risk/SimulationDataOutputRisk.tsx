import DefaultProgressBar from '@ui/progress-bars/default-progress-bar/DefaultProgressBar';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

const lmh: any = {
    series: [75, 55, 24],
    options: {
        chart: {
            height: 390,
            type: 'radialBar'
        },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        show: false
                    }
                },
                barLabels: {
                    enabled: true,
                    useSeriesColors: true,
                    offsetX: -8,
                    fontSize: '16px',
                    formatter: function (seriesName: any, opts: any) {
                        return (
                            seriesName +
                            ':  ' +
                            opts.w.globals.series[opts.seriesIndex]
                        );
                    }
                }
            }
        },
        colors: ['#5bbff5', '#1C88EC', '#215494'],
        labels: ['Low risk', 'Medium risk', 'High risk'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        show: false
                    }
                }
            }
        ]
    }
};

const SimulationDataOutputRisk = () => {
    const [year, setYear] = useState(2025);
    const minYear = 2025;
    const maxYear = 2030;

    const handlePrevious = () => {
        if (year > minYear) {
            setYear(year - 1);
        }
    };

    const handleNext = () => {
        if (year < maxYear) {
            setYear(year + 1);
        }
    };

    const data: any = {
        2025: {
            flooding: { percentage: 45, impact: '0.001m/year' },
            subsidence: { percentage: 75, impact: '0.065m/year' },
            landslides: { percentage: 90, impact: '0.003m/year' },
            heat: { percentage: 30, impact: '+30%' },
            cold: { percentage: 30, impact: '+30%' },
            sea: { percentage: 93, impact: '0.25m/year' },
            hazard: { percentage: 50, impact: '+30%' }
        },
        2026: {
            flooding: { percentage: 55, impact: '0.002m/year' },
            subsidence: { percentage: 70, impact: '0.062m/year' },
            landslides: { percentage: 80, impact: '0.002m/year' },
            heat: { percentage: 40, impact: '+35%' },
            cold: { percentage: 40, impact: '+25%' },
            sea: { percentage: 85, impact: '0.22m/year' },
            hazard: { percentage: 60, impact: '+20%' }
        },
        2027: {
            flooding: { percentage: 65, impact: '0.003m/year' },
            subsidence: { percentage: 65, impact: '0.060m/year' },
            landslides: { percentage: 75, impact: '0.004m/year' },
            heat: { percentage: 45, impact: '+40%' },
            cold: { percentage: 35, impact: '+20%' },
            sea: { percentage: 80, impact: '0.20m/year' },
            hazard: { percentage: 70, impact: '+25%' }
        },
        2028: {
            flooding: { percentage: 60, impact: '0.004m/year' },
            subsidence: { percentage: 60, impact: '0.058m/year' },
            landslides: { percentage: 85, impact: '0.003m/year' },
            heat: { percentage: 50, impact: '+45%' },
            cold: { percentage: 30, impact: '+18%' },
            sea: { percentage: 90, impact: '0.18m/year' },
            hazard: { percentage: 75, impact: '+35%' }
        },
        2029: {
            flooding: { percentage: 70, impact: '0.005m/year' },
            subsidence: { percentage: 55, impact: '0.055m/year' },
            landslides: { percentage: 90, impact: '0.005m/year' },
            heat: { percentage: 60, impact: '+50%' },
            cold: { percentage: 40, impact: '+15%' },
            sea: { percentage: 88, impact: '0.15m/year' },
            hazard: { percentage: 65, impact: '+40%' }
        },
        2030: {
            flooding: { percentage: 80, impact: '0.006m/year' },
            subsidence: { percentage: 50, impact: '0.052m/year' },
            landslides: { percentage: 95, impact: '0.006m/year' },
            heat: { percentage: 70, impact: '+55%' },
            cold: { percentage: 50, impact: '+10%' },
            sea: { percentage: 92, impact: '0.12m/year' },
            hazard: { percentage: 80, impact: '+45%' }
        }
    };

    const currentData = data[year] || {};

    return (
        <>
            <div className="border border-gray-300 rounded-lg p-4 bg-white mb-4">
                <ReactApexChart
                    options={lmh.options}
                    series={lmh.series}
                    type="radialBar"
                    height={390}
                />
            </div>
            <div className="border border-gray-300 rounded-lg p-4 bg-white font-semibold text-lg mb-4">
                111 Wall Street Ct, New York, NY 10005
            </div>
            <div className="border border-gray-300 rounded-lg p-4 bg-white">
                <div className="flex flex-row justify-between mb-8">
                    <div className="w-6/19 text-center">
                        <p className="text-sm text-gray-400 mb-4">
                            Asset Score:
                        </p>
                        <p className="w-12 h-12 mx-auto text-center content-center text-primary bg-blue-100 rounded-full font-semibold">
                            A
                        </p>
                    </div>
                    <div className="w-6/19 text-center">
                        <p className="text-sm text-gray-400 mb-4">
                            City Score:
                        </p>
                        <p className="w-12 h-12 mx-auto text-center content-center text-primary bg-blue-100 rounded-full font-semibold">
                            C
                        </p>
                    </div>
                    <div className="w-6/19 text-center">
                        <p className="text-sm text-gray-400 mb-4">
                            Flooding Score:
                        </p>
                        <p className="w-12 h-12 mx-auto text-center content-center text-primary bg-blue-100 rounded-full font-semibold">
                            D
                        </p>
                    </div>
                </div>
                <div className="h-0.5 bg-gray-300 my-12"></div>
                <h1 className="text-lg font-semibold mb-6">
                    Probability and Severity
                </h1>
                <div className="flex items-center justify-center space-x-4 mb-4">
                    <IoChevronBackOutline
                        className={`cursor-pointer border border-gray-300 rounded-lg p-1 bg-gray-200 ${year > minYear ? 'visible' : 'invisible'}`}
                        size={28}
                        onClick={handlePrevious}
                    />
                    <span className="text-lg font-bold">{year}</span>
                    <IoChevronForwardOutline
                        className={`cursor-pointer border border-gray-300 rounded-lg p-1 bg-gray-200 ${year < maxYear ? 'visible' : 'invisible'}`}
                        size={28}
                        onClick={handleNext}
                    />
                </div>
                <div>
                    <DefaultProgressBar
                        title={`Flooding Projections by ${year}`}
                        percentage={currentData.flooding?.percentage || 0}
                        color="#5bbff5"
                        impact="0.001m/year"
                    />
                </div>
                <div className="mt-6">
                    <DefaultProgressBar
                        title="Subsidence"
                        percentage={currentData.subsidence?.percentage || 0}
                        color="#1C88EC"
                        impact="0.065m/year"
                    />
                </div>
                <div className="mt-6">
                    <DefaultProgressBar
                        title="Landslides"
                        percentage={currentData.landslides?.percentage || 0}
                        color="#215494"
                        impact="0.003m/year"
                    />
                </div>
                <div className="mt-6">
                    <DefaultProgressBar
                        title="Extreme Heat"
                        percentage={currentData.heat?.percentage || 0}
                        color="#5bbff5"
                        impact="+30%"
                    />
                </div>
                <div className="mt-6">
                    <DefaultProgressBar
                        title="Extreme Cold"
                        percentage={currentData.cold?.percentage || 0}
                        color="#5bbff5"
                        impact="+30%"
                    />
                </div>
                <div className="mt-6">
                    <DefaultProgressBar
                        title="Sea level rise"
                        percentage={currentData.sea?.percentage || 0}
                        color="#215494"
                        impact="0.25m/year"
                    />
                </div>
                <div className="mt-6">
                    <DefaultProgressBar
                        title="Other Hazard"
                        percentage={currentData.hazard?.percentage || 0}
                        color="#1C88EC"
                        impact="+30%"
                    />
                </div>
            </div>
        </>
    );
};

export default SimulationDataOutputRisk;
