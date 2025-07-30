import { createBrowserRouter } from 'react-router-dom';
import { Routes, RoutingKeys } from './router.keys';
import NotFound from '../ui/error-pages/not-found/NotFound';
import Login from '../../modules/public/login/Login';
import EmptyLayout from '../ui/layouts/empty-layout/EmptyLayout';
import AuthService from '../../core/auth/auth.service';
import MainLayout from '../ui/layouts/main-layout/MainLayout';
import Register from '../../modules/public/register/Register';
import PrivacyPolicy from '../../modules/public/privacy-policy/PrivacyPolicy';
import WrapperLayout from '../ui/layouts/wrapper-layout/WrapperLayout';
import Waitlist from '../../modules/public/waitlist/Waitlist';
import WaitlistUsers from '../../modules/protected/waitlist-users/WaitlistUsers';
import { WaitlistUsersContextProvider } from '../../modules/protected/waitlist-users/context/useWaitlistUsersContext';
import ForgotPasswordEmail from '../../modules/public/forgot-password/forgot-password-email/ForgotPasswordEmail';
import ResetPassword from '../../modules/public/forgot-password/reset-password/ResetPassword';
import Verification from '../../modules/public/forgot-password/verification/Verification';
import LegalDisclaimer from '../../modules/public/legal-disclaimer/LegalDisclaimer';
import Profile from '../../modules/protected/profile/Profile';
import Simulation from 'modules/protected/simulation/Simulation';
import Watchlist from 'modules/protected/watchlist/Watchlist';
import PropertyDetails from 'modules/protected/property-details/PropertyDetails';
import Dashboard from '@dashboard/Dashboard';
import ExploreHybrid from 'modules/protected/explore-hybrid/ExploreHybrid';
import UserSettings from 'modules/protected/user-settings/UserSettings';
import AVATermsAndConditions from 'modules/public/ava/terms-and-conditions/AVATermsAndConditions';
import AVAPrivacyPolicy from 'modules/public/ava/privacy-policy/AVAPrivacyPolicy';

const router = createBrowserRouter([
    {
        element: <WrapperLayout />,
        children: [
            {
                element: <EmptyLayout />,
                children: [
                    {
                        path: RoutingKeys[Routes.DEFAULT],
                        element: <Login />,
                        errorElement: <NotFound />
                    },
                    {
                        path: RoutingKeys[Routes.LOGIN],
                        element: <Login />,
                        errorElement: <NotFound />
                    },
                    {
                        path: RoutingKeys[Routes.FORGOT_PASSWORD_EMAIL],
                        element: <ForgotPasswordEmail />,
                        errorElement: <NotFound />
                    },
                    {
                        path: RoutingKeys[Routes.VERIFICATION],
                        element: <Verification />,
                        errorElement: <NotFound />
                    },
                    {
                        path: RoutingKeys[Routes.RESET_PASSWORD],
                        element: <ResetPassword />,
                        errorElement: <NotFound />
                    },
                    {
                        path: RoutingKeys[Routes.REGISTER],
                        element: <Register />,
                        errorElement: <NotFound />
                    },
                    {
                        path: RoutingKeys[Routes.REGISTER_CONFIRMATION],
                        element: <Waitlist />,
                        errorElement: <NotFound />
                    },
                    {
                        path: RoutingKeys[Routes.PRIVACY_POLICY],
                        element: <PrivacyPolicy />,
                        errorElement: <NotFound />
                    },
                    {
                        path: RoutingKeys[Routes.LEGAL_DISCLAIMER],
                        element: <LegalDisclaimer />,
                        errorElement: <NotFound />
                    },
                    {
                        path: RoutingKeys[Routes.AVA_TERMS_AND_CONDITIONS],
                        element: <AVATermsAndConditions />,
                        errorElement: <NotFound />
                    },
                    {
                        path: RoutingKeys[Routes.AVA_PRIVACY_POLICY],
                        element: <AVAPrivacyPolicy />,
                        errorElement: <NotFound />
                    },
                ]
            },
            {
                element: <MainLayout />,
                loader: AuthService.authenticationLoader,
                children: [
                    {
                        path: RoutingKeys[Routes.DASHBOARD],
                        element: <Dashboard />,
                        errorElement: <NotFound />
                    },
                    {
                        path: RoutingKeys[Routes.EXPLORE],
                        element: <ExploreHybrid />,
                        errorElement: <NotFound />
                    },
                    {
                        path: RoutingKeys[Routes.WATCHLIST],
                        element: <Watchlist />,
                        errorElement: <NotFound />
                    },
                    {
                        path: RoutingKeys[Routes.PROPERTY_DETAILS],
                        element: <PropertyDetails />,
                        errorElement: <NotFound />
                    },
                    {
                        path: RoutingKeys[Routes.SIMULATION],
                        element: <Simulation />,
                        errorElement: <NotFound />
                    },
                    {
                        path: RoutingKeys[Routes.WAITLIST_USERS],
                        element: (
                            <WaitlistUsersContextProvider>
                                <WaitlistUsers />
                            </WaitlistUsersContextProvider>
                        ),
                        errorElement: <NotFound />
                    },
                    {
                        path: RoutingKeys[Routes.PROFILE],
                        element: <Profile />,
                        errorElement: <NotFound />
                    },
                    {
                        path: RoutingKeys[Routes.RELEASE_NOTES],
                        element: <UserSettings />,
                        errorElement: <NotFound />
                    }
                ]
            },
            { path: '*', element: <NotFound /> }
        ]
    }
]);

export default router;
