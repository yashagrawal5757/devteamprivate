import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import editProfileFormSchema from './EditProfileForm.validators';
import useProfile from '../../hooks/useProfile';
import ControllableInput from '@ui/inputs/controllable-input/ControllableInput';
import Button from '@ui/buttons/button/Button';
import useSessionData from '@hooks/useSessionData';

export type EditProfileForm = {
    email: string;
    firstName: string;
    lastName: string;
};

const EditProfile = () => {
    const { onEditProfile } = useProfile();
    const { sessionData } = useSessionData();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<EditProfileForm>({
        resolver: yupResolver(editProfileFormSchema),
        defaultValues: {
            email: sessionData.authenticatedUser?.email,
            firstName: sessionData.authenticatedUser?.firstName,
            lastName: sessionData.authenticatedUser?.lastName
        },
        mode: 'onChange',
        reValidateMode: 'onChange'
    });

    return (
        <div className="w-1/2">
            <p className="text-lg">Edit Profile</p>
            <p className="text-sm">Give your profile a fresh look.</p>
            <div className="my-6">
                <ControllableInput
                    name={'firstName'}
                    control={control}
                    type="text"
                    labelText="First Name"
                    errorMessage={errors.firstName?.message}
                    required={true}
                />
            </div>
            <div className="my-6">
                <ControllableInput
                    name={'lastName'}
                    control={control}
                    type="text"
                    labelText="Last Name"
                    errorMessage={errors.lastName?.message}
                    required={true}
                />
            </div>
            <div className="mt-6 mb-12">
                <ControllableInput
                    name={'email'}
                    control={control}
                    type="text"
                    labelText="Email"
                    errorMessage={errors.email?.message}
                    required={true}
                    disabled={true}
                />
            </div>
            <div className="flex ml-auto w-1/2">
                <Button
                    text="EDIT PROFILE"
                    type="button"
                    onClick={handleSubmit(onEditProfile)}
                />
            </div>
        </div>
    );
};

export default EditProfile;
