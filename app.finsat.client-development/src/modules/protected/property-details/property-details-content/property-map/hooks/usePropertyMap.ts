import React, { useState } from 'react';
import { Cartesian3, Rectangle } from 'cesium';
import useSolarCalculationEstimate from 'modules/protected/property-details/hooks/solar-calculation-estimate/useSolarCalculationEstimate';
import NumberUtils from '@services/numberUtils';

const usePropertyMap = () => {
    const [isSolarPanelVisible, setIsSolarPanelVisible] =
        useState<boolean>(true);
    const [isFinancialPanelVisible, setIsFinancialPanelVisible] =
        useState<boolean>(true);

    const [isInitialFootprintStep, setIsInitialFootprintStep] = useState<boolean>(true);

    const setSolarPanelVisible = (value: boolean) => {
        setIsSolarPanelVisible(value);
    };

    const setFinancialMetricsVisible = (value: boolean) => {
        setIsFinancialPanelVisible(value);
    };

    const { solarFinancialOutput } = useSolarCalculationEstimate();

    const moveCameraToLocation = (
        viewerRef: any,
        latitude: number,
        longitude: number,
        duration: number = 0
    ) => {
        const cartesianPosition = Cartesian3.fromDegrees(
            longitude,
            latitude,
            250
        );

        const viewer = viewerRef.current.cesiumElement;

        viewer.camera.flyTo({
            destination: cartesianPosition,
            duration
        });
    };

    const moveCameraToLocationByFootprint = (
        viewerRef: any,
        footprint: Array<Array<[number, number]>>,
        duration: number = 0,
        zoomLevel: number = 0.00005
    ) => {
        const flatFootprint = footprint.flat();
        
        const lats = flatFootprint.map((coord) => coord[0]);
        const lngs = flatFootprint.map((coord) => coord[1]);

        const minLat = Math.min(...lats) - zoomLevel;
        const maxLat = Math.max(...lats) + zoomLevel;
        const minLng = Math.min(...lngs) - zoomLevel;
        const maxLng = Math.max(...lngs) + zoomLevel;

        const rectangle = Rectangle.fromDegrees(minLng, minLat, maxLng, maxLat);

        const viewer = viewerRef.current.cesiumElement;

        viewer.camera.flyTo({
            destination: rectangle,
            duration
        });
    };

    const getCashFlowChartSeries = (): any => {
        const series = [];

        if (solarFinancialOutput === undefined) {
            return;
        }

        const systemCost = [-solarFinancialOutput.input.systemCost];
        const cashFlows = solarFinancialOutput.input.cashFlows.map(
            (cashFlow) => cashFlow
        );
        const systemCostAndCashFlows = systemCost.concat(cashFlows);
        const firstYear = 1;

        const data = systemCostAndCashFlows.map((costAndCash, index) => ({
            x: firstYear + index,
            y: costAndCash
        }));

        series.push({
            name: 'Cash flow',
            data
        });

        return series;
    };

    const getCashFlowChartOptions = (): any => {
        if (solarFinancialOutput === undefined) {
            return;
        }

        const systemCost = [-solarFinancialOutput.input.systemCost];
        const cashFlows = solarFinancialOutput.input.cashFlows.map(
            (cashFlow) => cashFlow
        );
        const tickYearsAmount = systemCost.concat(cashFlows).length - 1;

        return {
            chart: {
                type: 'bar',
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '80%'
                }
            },
            colors: ['#2CB59B'],
            grid: {
                padding: {
                    left: 0,
                    right: 0
                }
            },
            dataLabels: {
                enabled: false
            },
            title: {
                text: 'Annual Cash Flow Over Time',
                align: 'center',
                style: {
                    fontWeight: 'normal',
                    fontSize: '14px'
                }
            },
            yaxis: {
                title: {
                    text: 'Annual Cash Flow (€)',
                    style: {
                        fontWeight: 'normal',
                        fontSize: '11px'
                    }
                },
                labels: {
                    formatter: function (y: any) {
                        return NumberUtils.formatWithCommas(y.toFixed(0));
                    }
                }
            },
            xaxis: {
                type: 'numeric',
                title: {
                    text: 'Years',
                    style: {
                        fontWeight: 'normal',
                        fontSize: '11px'
                    }
                },
                tickAmount: tickYearsAmount,
                labels: {
                    formatter: (val: number, index: number) => {
                        if (tickYearsAmount > 15) {
                            return (index - 1) % 5 === 0 ? val - 1 : '';
                        } else {
                            return val - 1;
                        }
                    }
                }
            },
            tooltip: {
                x: {
                    formatter: (val: number) => `Year: ${val - 1}`
                }
            }
        };
    };

    const getNpvDiscountRateChartSeries = (): any => {
        if (!solarFinancialOutput) return [];

        const data = solarFinancialOutput.predictions
            .map((prediction) => ({
                x: prediction.discountRate,
                y: prediction.netPresentValue
            }))
            .sort((a, b) => a.x - b.x);

        return [
            {
                name: 'NPV',
                data,
                markers: {
                    size: 4
                }
            }
        ];
    };

    const addNpvDiscountRateSpecialMarker = (): any[] => {
        if (!solarFinancialOutput) return [];

        return solarFinancialOutput.predictions
            .sort((a, b) => a.discountRate - b.discountRate)
            .filter(
                (prediction) =>
                    prediction.discountRate ===
                    solarFinancialOutput.input.discountRate
            )
            .map((prediction) => ({
                seriesIndex: 0,
                dataPointIndex:
                    solarFinancialOutput.predictions.indexOf(prediction),
                fillColor: '#FF0000',
                strokeColor: '#FF0000',
                size: 5
            }));
    };

    const getNpvDiscountRateChartOptions = (): any => {
        if (solarFinancialOutput === undefined) {
            return;
        }

        const maxDiscountAmount = Math.max(
            ...solarFinancialOutput.predictions.map(
                (prediction) => prediction.discountRate
            )
        );
        const tickDiscountAmount = maxDiscountAmount - 1;

        return {
            chart: {
                type: 'line',
                zoom: { enabled: false },
                toolbar: { show: false }
            },
            dataLabels: { enabled: false },
            stroke: {
                curve: 'straight',
                width: 2
            },
            markers: {
                size: 4,
                fillColor: '#1C88EC',
                strokeColor: '#1C88EC',
                discrete: addNpvDiscountRateSpecialMarker()
            },
            title: {
                text: 'Sensitivity Analysis: NPV vs Discount Rate',
                align: 'center',
                style: {
                    fontWeight: 'normal',
                    fontSize: '14px'
                }
            },
            xaxis: {
                type: 'numeric',
                title: {
                    text: 'Discount Rate (%)',
                    style: {
                        fontWeight: 'normal',
                        fontSize: '11px'
                    }
                },
                min: 1,
                max: maxDiscountAmount,
                tickAmount: tickDiscountAmount,
                labels: {
                    formatter: (x: number) => Math.round(x).toString()
                }
            },
            yaxis: {
                title: {
                    text: 'NPV (€)',
                    style: {
                        fontWeight: 'normal',
                        fontSize: '11px'
                    }
                },
                labels: {
                    formatter: (y: any) =>
                        NumberUtils.formatWithCommas(y.toFixed(0))
                }
            }
        };
    };

    const getPaybackPeriodChartSeries = (): any => {
        if (solarFinancialOutput === undefined) {
            return;
        }

        const cashFlows = solarFinancialOutput.input.cashFlows.map(
            (cashFlow) => cashFlow
        );

        const currentYear = new Date().getFullYear();

        const data = cashFlows.map((flow, index) => ({
            x: currentYear + index,
            y: flow
        }));

        return [
            {
                name: 'Cash Flow',
                data
            }
        ];
    };

    const addPaybackPeriodSpecialMarker = (): any[] => {
        if (!solarFinancialOutput) return [];

        const cashFlows = solarFinancialOutput.input.cashFlows.map(
            (cashFlow) => cashFlow
        );

        const currentYear = new Date().getFullYear();
        const allYears = cashFlows.map((_, index) => currentYear + index);
        const paybackPeriod = Math.ceil(
            solarFinancialOutput.predictions.map(
                (pred) => pred.paybackPeriod
            )[0]
        );
        const breakEvenYear = paybackPeriod + currentYear;

        return [
            {
                seriesIndex: 0,
                dataPointIndex: allYears.indexOf(breakEvenYear),
                fillColor: '#FFF',
                strokeColor: '#FF4D00',
                size: 5
            }
        ];
    };

    const getPaybackPeriodChartOptions = (): any => {
        if (solarFinancialOutput === undefined) {
            return;
        }

        const tickYearsAmount =
            solarFinancialOutput.input.cashFlows.map((cashFlow) => cashFlow)
                .length - 1;
        const paybackPeriod = Math.ceil(
            solarFinancialOutput.predictions.map(
                (pred) => pred.paybackPeriod
            )[0]
        );
        const currentYear = new Date().getFullYear();
        const breakEvenYear = paybackPeriod + currentYear;

        return {
            chart: {
                type: 'line',
                zoom: { enabled: false },
                toolbar: { show: false }
            },
            stroke: {
                curve: 'straight',
                width: 2
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'horizontal',
                    gradientToColors: ['#FFD700'],
                    stops: [0, 100]
                }
            },
            colors: ['#FF0000'],
            markers: {
                size: 4,
                strokeColor: '#FF4D00',
                strokeWidth: 2,
                fillOpacity: 1,
                shape: 'circle',
                discrete: addPaybackPeriodSpecialMarker()
            },
            title: {
                text: 'Payback Period (Break-Even Timeline)',
                align: 'center',
                style: {
                    fontWeight: 'normal',
                    fontSize: '14px'
                }
            },
            xaxis: {
                type: 'numeric',
                title: {
                    text: 'Years',
                    style: {
                        fontWeight: 'normal',
                        fontSize: '11px'
                    }
                },
                tickAmount: tickYearsAmount,
                labels: {
                    formatter: (val: number, index: number) => {
                        if (tickYearsAmount > 15) {
                            return index % 5 === 0
                                ? Math.round(val).toString()
                                : '';
                        } else {
                            return Math.round(val).toString();
                        }
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Cumulative Cash Flow (€)',
                    style: {
                        fontWeight: 'normal',
                        fontSize: '11px'
                    }
                },
                labels: {
                    formatter: (y: number) =>
                        NumberUtils.formatWithCommas(y.toFixed(0))
                }
            },
            tooltip: {
                x: {
                    formatter: (val: number) => `Year: ${val}`
                }
            },
            annotations: {
                xaxis: [
                    {
                        x: breakEvenYear,
                        borderColor: '#FF5733',
                        strokeDashArray: 5,
                        label: {
                            text: `Break-Even: Year ${breakEvenYear - currentYear + 1}`,
                            position: 'top',
                            orientation: 'vertical',
                            offsetX: 15,
                            offsetY: -10,
                            style: {
                                color: '#FFA500',
                                fontWeight: 'normal',
                                fontSize: '10px',
                                background: 'transparent',
                                padding: 0,
                                borderWidth: 0
                            }
                        }
                    }
                ]
            }
        };
    };

    return {
        isInitialFootprintStep,
        isSolarPanelVisible,
        isFinancialPanelVisible,
        setSolarPanelVisible,
        setFinancialMetricsVisible,
        setIsInitialFootprintStep,
        getCashFlowChartSeries,
        getCashFlowChartOptions,
        getNpvDiscountRateChartSeries,
        getNpvDiscountRateChartOptions,
        getPaybackPeriodChartSeries,
        getPaybackPeriodChartOptions,
        moveCameraToLocation,
        moveCameraToLocationByFootprint
    };
};

export default usePropertyMap;
