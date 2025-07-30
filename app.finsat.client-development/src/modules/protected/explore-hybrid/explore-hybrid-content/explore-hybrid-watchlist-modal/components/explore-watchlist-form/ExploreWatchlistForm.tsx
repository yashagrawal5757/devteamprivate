import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import ControllableInput from '@ui/inputs/controllable-input/ControllableInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import exploreWatchlistFormSchema from './ExploreWatchlistForm.validators';
import Button from '@ui/buttons/button/Button';

type ExploreWatchlistFormProps = {
    onSubmit: SubmitHandler<ExploreWatchlistForm>;
};

type ExploreWatchlistForm = {
    name: string;
};

const ExploreWatchlistForm = ({ onSubmit }: ExploreWatchlistFormProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<ExploreWatchlistForm>({
        resolver: yupResolver(exploreWatchlistFormSchema),
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

export default ExploreWatchlistForm;
