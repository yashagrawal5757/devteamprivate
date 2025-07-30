import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import resetPasswordFormSchema from './ResetPasswordForm.validators';
import useProfile from '../../hooks/useProfile';
import ControllableInput from '@ui/inputs/controllable-input/ControllableInput';
import Button from '@ui/buttons/button/Button';

export type ResetPasswordForm = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

const ResetPassword = () => {
    const { onResetPassword } = useProfile();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ResetPasswordForm>({
        resolver: yupResolver(resetPasswordFormSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        mode: 'onChange',
        reValidateMode: 'onChange'
    });

    return (
        <div className="w-1/2">
            <p className="text-lg">Change Password</p>
            <p className="text-sm">
                To change your password, please verify it by entering your
                current password.
            </p>
            <div className="my-6">
                <ControllableInput
                    name={'currentPassword'}
                    control={control}
                    type="password"
                    labelText="Current Password"
                    errorMessage={errors.currentPassword?.message}
                    required={true}
                />
            </div>
            <div className="my-6">
                <ControllableInput
                    name={'newPassword'}
                    control={control}
                    type="password"
                    labelText="New Password"
                    errorMessage={errors.newPassword?.message}
                    required={true}
                />
            </div>
            <div className="mt-6 mb-12">
                <ControllableInput
                    name={'confirmPassword'}
                    control={control}
                    type="password"
                    labelText="Confirm Password"
                    errorMessage={errors.confirmPassword?.message}
                    required={true}
                />
            </div>
            <div className="flex ml-auto w-1/2">
                <Button
                    text="RESET PASSWORD"
                    type="button"
                    onClick={handleSubmit(onResetPassword)}
                />
            </div>
        </div>
    );
};

export default ResetPassword;
