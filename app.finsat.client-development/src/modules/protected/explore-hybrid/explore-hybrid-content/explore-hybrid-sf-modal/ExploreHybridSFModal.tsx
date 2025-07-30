import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoCloseOutline } from 'react-icons/io5';
import exploreHybridSFModalFormSchema from './ExploreHybridSFModal.validators';
import ControllableInput from '@ui/inputs/controllable-input/ControllableInput';
import ControllableSelect from '@ui/inputs/controllable-select/ControllableSelect';
import { SpatialFeatureType } from '@enums/SpatialFeatureType';
import { spatialFeatureTypeMetadata } from '@metadata/SpatialFeatyre.metadata';
import Button from '@ui/buttons/button/Button';

type ExploreHybridSFModalProps = {
    onClose: () => void;
    onSubmit: SubmitHandler<CreateSpatialFeatureForm>;
}

type CreateSpatialFeatureForm = {
    name: string;
    type: any;
}

const spatialFeatureTypeOptions = Object.keys(SpatialFeatureType)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
        value: SpatialFeatureType[key as keyof typeof SpatialFeatureType],
        label: spatialFeatureTypeMetadata[
            SpatialFeatureType[key as keyof typeof SpatialFeatureType]
        ]
    }));

const ExploreHybridSFModal = ({ onSubmit, onClose }: ExploreHybridSFModalProps) => {
    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<CreateSpatialFeatureForm>({
        resolver: yupResolver(exploreHybridSFModalFormSchema),
        defaultValues: {
            name: '',
            type: 0
        },
        mode: 'onChange',
        reValidateMode: 'onChange'
    });

    return (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-[450px] h-[400px] bg-white rounded-lg pb-8 pt-10 px-7 mx-auto shadow-lg flex flex-col justify-between">
                <IoCloseOutline
                    className="text-2xl absolute top-2 right-2 cursor-pointer"
                    onClick={onClose}
                />
                <div className="h-[120px]">
                    <h2 className="text-2xl font-bold mb-6">
                        Create spatial feature
                    </h2>
                    <form>
                        <div className="my-6">
                            <ControllableInput
                                name={'name'}
                                control={control}
                                type="text"
                                labelText="Name"
                                errorMessage={errors.name?.message}
                                required={true}
                            />
                        </div>
                        <div className="my-6">
                            <ControllableSelect
                                name={'type'}
                                control={control}
                                labelText="Type"
                                required={false}
                                options={spatialFeatureTypeOptions}
                                showOption={false}
                            />
                        </div>
                        <div className='mt-12'>
                            <Button
                                text="Create"
                                type="submit"
                                onClick={handleSubmit(onSubmit)}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ExploreHybridSFModal