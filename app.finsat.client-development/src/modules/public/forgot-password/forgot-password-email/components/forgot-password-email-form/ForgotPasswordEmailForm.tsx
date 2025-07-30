import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import forgotPasswordEmailFormSchema from './ForgotPasswordEmailForm.validators';
import ControllableInput from '@ui/inputs/controllable-input/ControllableInput';
import Button from '@ui/buttons/button/Button';

type ForgotPasswordEmailFormProps = {
    onSubmit: SubmitHandler<ForgotPasswordEmailForm>;
};

type ForgotPasswordEmailForm = {
    email: string;
};

const ForgotPasswordEmailForm = ({
    onSubmit
}: ForgotPasswordEmailFormProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<ForgotPasswordEmailForm>({
        resolver: yupResolver(forgotPasswordEmailFormSchema),
        defaultValues: {
            email: ''
        },
        mode: 'onChange',
        reValidateMode: 'onChange'
    });

    return (
        <form>
            <div className="my-12">
                <ControllableInput
                    name={'email'}
                    control={control}
                    type="text"
                    labelText="Email"
                    errorMessage={errors.email?.message}
                    required={true}
                />
            </div>
            <Button
                text="FORGOT PASSWORD"
                type="submit"
                onClick={handleSubmit(onSubmit)}
            />
        </form>
    );
};

export default ForgotPasswordEmailForm;
