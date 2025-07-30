import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginFormSchema from './LoginForm.validators';
import useLoginForm from './useLoginForm';
import { Link } from 'react-router-dom';
import ControllableInput from '@ui/inputs/controllable-input/ControllableInput';
import Button from '@ui/buttons/button/Button';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

type LoginFormProps = {
    onSubmit: SubmitHandler<LoginForm>;
};

type LoginForm = {
    email: string;
    password: string;
};

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const { showPassword, navigateToForgotPassword, onShowPassword } =
        useLoginForm();
    const PasswordIcon = showPassword ? FaRegEye : FaRegEyeSlash;

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginForm>({
        resolver: yupResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange',
        reValidateMode: 'onChange'
    });

    return (
        <form>
            <div className="my-6">
                <ControllableInput
                    name={'email'}
                    control={control}
                    type="text"
                    labelText="Email"
                    errorMessage={errors.email?.message}
                    required={true}
                />
            </div>
            <div className="mt-6">
                <ControllableInput
                    name={'password'}
                    control={control}
                    type={showPassword ? 'text' : 'password'}
                    labelText="Password"
                    errorMessage={errors.password?.message}
                    required={true}
                    icon={
                        <PasswordIcon
                            className="cursor-pointer text-gray-500"
                            onClick={onShowPassword}
                            size={16}
                        />
                    }
                />
            </div>
            <div className="mb-14 mt-1 w-full">
                <div className="flex items-center justify-end">
                    <div className="text-sm">
                        <Link
                            to="#"
                            className="font-medium text-accent hover:text-primary_hover"
                            onClick={navigateToForgotPassword}
                        >
                            Forgot password?
                        </Link>
                    </div>
                </div>
            </div>
            <Button
                text="LOGIN"
                type="submit"
                onClick={handleSubmit(onSubmit)}
            />
        </form>
    );
};

export default LoginForm;
