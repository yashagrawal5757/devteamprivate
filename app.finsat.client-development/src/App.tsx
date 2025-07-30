import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from '@routes/main.routes';
import { LoadingContextProvider } from '@contexts/loading/useLoadingContext';
import { ErrorContextProvider } from '@contexts/error/useErrorContext';
import { SuccessContextProvider } from '@contexts/success/useSuccessContext';
import { SessionDataContextProvider } from '@contexts/session-data/useSessionDataContext';
import { DestinationLookupContextProvider } from '@contexts/destination-lookup/useDestinationLookupContext';
import { SolarProvider } from '@contexts/google-solar/solarContextProvider';
import { WarningContextProvider } from '@contexts/warning/useWarningContext';
import { PowerUnitContextProvider } from '@contexts/power-unit/usePowerUnitContext';
import { ExploreLoadContextProvider } from '@contexts/explore-load/useExploreLoadContext';
import { SubscriptionsContextProvider } from '@contexts/subscriptions/useSubscriptionsContext';

const App = () => {
    return (
        <LoadingContextProvider>
            <ErrorContextProvider>
                <SuccessContextProvider>
                    <WarningContextProvider>
                        <SessionDataContextProvider>
                            <ExploreLoadContextProvider>
                                <DestinationLookupContextProvider>
                                    <SolarProvider>
                                        <PowerUnitContextProvider>
                                            <SubscriptionsContextProvider>
                                                <RouterProvider
                                                    router={router}
                                                />
                                            </SubscriptionsContextProvider>
                                        </PowerUnitContextProvider>
                                    </SolarProvider>
                                </DestinationLookupContextProvider>
                            </ExploreLoadContextProvider>
                        </SessionDataContextProvider>
                    </WarningContextProvider>
                </SuccessContextProvider>
            </ErrorContextProvider>
        </LoadingContextProvider>
    );
};

export default App;
