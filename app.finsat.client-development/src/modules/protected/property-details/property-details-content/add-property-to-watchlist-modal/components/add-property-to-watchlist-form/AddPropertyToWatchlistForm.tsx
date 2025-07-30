import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import ControllableInput from '@ui/inputs/controllable-input/ControllableInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import addPropertyToWatchlistFormSchema from './AddPropertyToWatchlistForm.validators';
import Button from '@ui/buttons/button/Button';

type AddPropertyToWatchlistFormProps = {
    onSubmit: SubmitHandler<AddPropertyToWatchlistForm>;
};

type AddPropertyToWatchlistForm = {
    name: string;
};

const AddPropertyToWatchlistForm = ({
    onSubmit
}: AddPropertyToWatchlistFormProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<AddPropertyToWatchlistForm>({
        resolver: yupResolver(addPropertyToWatchlistFormSchema),
        defaultValues: {
            name: ''
        },
        mode: 'onChange',
        reValidateMode: 'onChange'
    });

    return (
        <form>
            <div className="flex flex-row justify-between text-sm">
                <div className="watchlist-input">
                    <ControllableInput
                        name={'name'}
                        control={control}
                        type="text"
                        errorMessage={errors.name?.message}
                        required={true}
                        placeholder="Enter Watchlist Name"
                    />
                </div>
                <div className="w-[100px] h-full mt-1.5">
                    <Button
                        text="SAVE"
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                    />
                </div>
            </div>
        </form>
    );
};

export default AddPropertyToWatchlistForm;
