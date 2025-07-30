import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import resetPasswordFormSchema from './ResetPasswordForm.validators';
import ControllableInput from '@ui/inputs/controllable-input/ControllableInput';
import Button from '@ui/buttons/button/Button';

type ResetPasswordFormProps = {
    onSubmit: SubmitHandler<ResetPasswordForm>;
};

type ResetPasswordForm = {
    password: string;
    confirmPassword: string;
};

const ResetPasswordForm = ({ onSubmit }: ResetPasswordFormProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<ResetPasswordForm>({
        resolver: yupResolver(resetPasswordFormSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        },
        mode: 'onChange',
        reValidateMode: 'onChange'
    });

    return (
        <form>
            <div className="mb-6 mt-12">
                <ControllableInput
                    name={'password'}
                    control={control}
                    type="password"
                    labelText="Password"
                    errorMessage={errors.password?.message}
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
            <Button
                text="RESET PASSWORD"
                type="submit"
                onClick={handleSubmit(onSubmit)}
            />
        </form>
    );
};

export default ResetPasswordForm;
