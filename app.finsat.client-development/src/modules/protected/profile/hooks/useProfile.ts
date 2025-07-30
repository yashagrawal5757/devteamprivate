import useProfileApi, { EditProfileResponse } from './useProfileApi';
import { ResetPasswordForm } from '../tabs/reset-password/ResetPassword';
import { AxiosResponse } from 'axios';
import { EditProfileForm } from '../tabs/edit-profile/EditProfile';
import useError from '@hooks/useError';
import useSuccess from '@hooks/useSuccess';
import useLoading from '@hooks/useLoading';
import useSessionData from '@hooks/useSessionData';
import { PowerUnit } from '@enums/PowerUnit';
import { PowerUnitActions } from '../../../../state/power-unit/PowerUnitActions';
import usePowerUnitContext from '@contexts/power-unit/usePowerUnitContext';

const useProfile = () => {
    const error = useError();
    const success = useSuccess();
    const loading = useLoading();
    const profileApi = useProfileApi();
    const sessionData = useSessionData();
    const powerUnitContext = usePowerUnitContext();

    const onEditProfile = ({ firstName, lastName }: EditProfileForm) => {
        loading.load();

        profileApi
            .editProfile(firstName, lastName)
            .then((response: AxiosResponse<EditProfileResponse, any>) => {
                const { data } = response;

                sessionData.updateAuthenticatedUser({
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    role: data.role
                });

                success.setSuccessMessage(
                    'Your profile data has been successfully changed'
                );
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const onResetPassword = ({
        currentPassword,
        newPassword,
        confirmPassword
    }: ResetPasswordForm) => {
        loading.load();

        profileApi
            .resetPassword(currentPassword, newPassword)
            .then(() => {
                success.setSuccessMessage(
                    'Your password has been successfully changed'
                );
                sessionData.logout();
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const onGetPreferences = () => {
        loading.load();

        profileApi
            .getPreferences()
            .then((response) => {
                const { data: unit } = response;

                powerUnitContext.dispatch({
                    type: PowerUnitActions.SET_POWER_UNIT,
                    payload: unit
                });
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const onChangePowerUnit = (unit: PowerUnit) => {
        loading.load();

        profileApi
            .changePowerUnit(unit)
            .then((response) => {
                const { data: unit } = response;

                powerUnitContext.dispatch({
                    type: PowerUnitActions.SET_POWER_UNIT,
                    payload: unit
                });
            })
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    return {
        powerUnit: powerUnitContext.state,
        onEditProfile,
        onResetPassword,
        onGetPreferences,
        onChangePowerUnit
    };
};

export default useProfile;
