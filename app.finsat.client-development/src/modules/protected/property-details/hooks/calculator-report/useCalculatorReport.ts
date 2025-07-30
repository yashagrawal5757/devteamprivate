import React from 'react';
import useSolarCalculationEstimate from '../solar-calculation-estimate/useSolarCalculationEstimate';
import useError from '@hooks/useError';
import useLoading from '@hooks/useLoading';
import useCalculatorReportApi from './useCalculatorReportApi';
import useProperty from '../property/useProperty';
import { AxiosResponse } from 'axios';

const useCalculatorReport = () => {
    const error = useError();
    const loading = useLoading();
    const calculatorReportApi = useCalculatorReportApi();
    const { property } = useProperty();
    const { solarEstimateInput, solarGenerationOutput, solarFinancialOutput } =
        useSolarCalculationEstimate();

    const onGenerateReport = (id: string, base64Image: string) => {
        if (property === undefined) {
            return;
        }

        if (solarGenerationOutput === undefined) {
            return;
        }

        if (solarFinancialOutput === undefined) {
            return;
        }

        loading.load();

        // if (property.schematic.levels === 0) { //TODO
        //     property.schematic.levels = null;
        // }

        // if (property.schematic.yearBuilt === 0) {
        //     property.schematic.yearBuilt = null;
        // }

        calculatorReportApi
            .generateReport(
                id,
                '',
                '',
                base64Image,
                property,
                solarEstimateInput,
                solarGenerationOutput,
                solarFinancialOutput
            )
            .then((response: AxiosResponse<BlobPart, any>) => {
                const { data } = response;

                const contentType =
                    response.headers['content-type'] ||
                    'application/octet-stream';
                const content = data as BlobPart;
                const filename = 'Solar_Panel_Report.pdf';

                openSolarGenerationReport(content, filename, contentType);
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const openSolarGenerationReport = (
        content: BlobPart,
        filename: string,
        contentType: string
    ): void => {
        if (!contentType) {
            contentType = 'application/octet-stream';
        }

        const newBlob = new Blob([content], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(newBlob);
        const mapWin = window.open(fileURL, '_blank')!;

        if (!mapWin || mapWin.closed || typeof mapWin.closed === 'undefined') {
            alert(
                'The report could not be opened. Please disable your pop-up blocker or allow pop-ups for this site.'
            );
            return;
        }

        mapWin.onload = (): void => {
            setTimeout(() => {
                mapWin.document.title = filename;
            }, 800);
        };
    };

    return { onGenerateReport };
};

export default useCalculatorReport;
