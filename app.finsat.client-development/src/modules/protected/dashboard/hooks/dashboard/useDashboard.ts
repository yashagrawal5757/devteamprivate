import React, { useState } from 'react';
import useLoading from '@hooks/useLoading';
import useError from '@hooks/useError';
import { AxiosResponse } from 'axios';
import useExploreWatchlistApi, {
    WatchlistResponse
} from '@explore/hooks/watchlist/useExploreWatchlistApi';
import useExistingWatchlists from '@dashboard/dashboard-content/dashboard-header/hooks/useExistingWatchlists';
import useDashboardApi, { DashboardDataResponse } from './useDashboardApi';
import useDashboardContext from '@dashboard/contexts/dashboard/useDashboardContext';
import { DashboardActions } from '@dashboard/state/dashboard/DashboardActions';

const useDashboard = () => {
    const [errorMessage, setErrorMessage] = useState<boolean>(true);
    const loading = useLoading();
    const error = useError();
    const exploreApi = useExploreWatchlistApi();
    const dashboardApi = useDashboardApi();

    const dashboardContext = useDashboardContext();

    const { setWatchlists } = useExistingWatchlists();

    const onGetWatchlists = (search?: string | undefined) => {
        loading.load();

        exploreApi
            .getWatchlists(search)
            .then((response: AxiosResponse<Array<WatchlistResponse>, any>) => {
                const { data } = response;
                const existingWatchlists = data;

                setWatchlists(existingWatchlists);
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const onGetDashboardDataAndPdf = (id: string, pdf: boolean = false) => {
        loading.load();

        dashboardApi
            .getDashboardData(id, pdf)
            .then(
                (
                    response: AxiosResponse<
                        DashboardDataResponse | BlobPart,
                        any
                    >
                ) => {
                    const { data } = response;

                    if (pdf) {
                        const contentType =
                            response.headers['content-type'] ||
                            'application/octet-stream';
                        const content = data as BlobPart;
                        const filename = 'Dashboard_Report.pdf';

                        openDashboardPdfReport(content, filename, contentType);
                    } else {
                        const {
                            annualPredictions,
                            monthlyPredictions,
                            cashFlowPredictions
                        } = data as DashboardDataResponse;

                        dashboardContext.dispatch({
                            type: DashboardActions.SET_DASHBOARD_DATA,
                            payload: {
                                annualPredictions: annualPredictions,
                                monthlyPredictions: monthlyPredictions,
                                cashFlowPredictions: cashFlowPredictions
                            }
                        });
                    }

                    setErrorMessage(false);
                }
            )
            .catch((e) => {
                if (e) {
                    setErrorMessage(true);
                }
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const onGetData = (id: string) => {
        onGetDashboardDataAndPdf(id);
    };

    const onGetPdf = (id: string) => {
        onGetDashboardDataAndPdf(id, true);
    };

    const openDashboardPdfReport = (
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

    return {
        dashboard: dashboardContext.state,
        errorMessage,
        onGetWatchlists,
        onGetData,
        onGetPdf
    };
};

export default useDashboard;
