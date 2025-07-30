import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import adaptationMeasuresFormSchema from './AdaptationMeasuresForm.validators';
import { yupResolver } from '@hookform/resolvers/yup';
import ControllableToggle from '@ui/inputs/controllable-toggle/ControllableToggle';

type AdaptationMeasuresFormProps = {
    onSubmit: SubmitHandler<AdaptationMeasuresForm>;
};

type AdaptationMeasuresForm = {
    regional: {
        upgradedDrainageInfrastructure: boolean;
        coastalDefences: boolean;
        erosionControl: boolean;
        prescribedBurningAndVegetationMgmt: boolean;
        riverFloodControlInfrastructure: boolean;
        upgradedGroundwaterMgmt: boolean;
        urbanGreeningAndCoolingCenters: boolean;
        waterConservationAndEfficientSystems: boolean;
    };
    building: {
        retainingWalls: boolean;
        emberResistantDefensibleSpace: boolean;
        foundationUnderpinnings: boolean;
        airConditioningAndCoolingInsulation: boolean;
        roofAndWallBracing: boolean;
    };
};

const AdaptationMeasuresForm = ({ onSubmit }: AdaptationMeasuresFormProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<AdaptationMeasuresForm>({
        resolver: yupResolver(adaptationMeasuresFormSchema),
        defaultValues: {
            regional: {
                upgradedDrainageInfrastructure: false,
                coastalDefences: false,
                erosionControl: false,
                prescribedBurningAndVegetationMgmt: false,
                riverFloodControlInfrastructure: false,
                upgradedGroundwaterMgmt: false,
                urbanGreeningAndCoolingCenters: false,
                waterConservationAndEfficientSystems: false
            },
            building: {
                retainingWalls: false,
                emberResistantDefensibleSpace: false,
                foundationUnderpinnings: false,
                airConditioningAndCoolingInsulation: false,
                roofAndWallBracing: false
            }
        },
        mode: 'onChange',
        reValidateMode: 'onChange'
    });

    return (
        <form>
            <h1 className="font-semibold text-xl mb-4">Adaption Measures</h1>
            <div className="border border-gray-300 rounded-lg p-6 bg-white">
                <h2 className="font-semibold text-lg mb-2">
                    Regional - Indirect Adaption Measures:
                </h2>
                <div className="flex flex-row justify-between align-center items-center py-2">
                    <div className="w-4/5">
                        <p>Upgraded Drainage Infrastructure</p>
                    </div>
                    <div className="w-max">
                        <ControllableToggle
                            name={'regional.upgradedDrainageInfrastructure'}
                            control={control}
                            labelText=""
                            errorMessage={
                                errors.regional?.upgradedDrainageInfrastructure
                                    ?.message
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between align-center items-center py-2">
                    <div className="w-4/5">
                        <p>Coastal Defences</p>
                    </div>
                    <div className="w-max">
                        <ControllableToggle
                            name={'regional.coastalDefences'}
                            control={control}
                            labelText=""
                            errorMessage={
                                errors.regional?.coastalDefences?.message
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between align-center items-center py-2">
                    <div className="w-4/5">
                        <p>Erosion Control</p>
                    </div>
                    <div className="w-max">
                        <ControllableToggle
                            name={'regional.erosionControl'}
                            control={control}
                            labelText=""
                            errorMessage={
                                errors.regional?.erosionControl?.message
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between align-center items-center py-2">
                    <div className="w-4/5">
                        <p>Prescribed Burning and Vegetation Mgmt</p>
                    </div>
                    <div className="w-max">
                        <ControllableToggle
                            name={'regional.prescribedBurningAndVegetationMgmt'}
                            control={control}
                            labelText=""
                            errorMessage={
                                errors.regional
                                    ?.prescribedBurningAndVegetationMgmt
                                    ?.message
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between align-center items-center py-2">
                    <div className="w-4/5">
                        <p>River Flood Control Infrastructure</p>
                    </div>
                    <div className="w-max">
                        <ControllableToggle
                            name={'regional.riverFloodControlInfrastructure'}
                            control={control}
                            labelText=""
                            errorMessage={
                                errors.regional?.riverFloodControlInfrastructure
                                    ?.message
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between align-center items-center py-2">
                    <div className="w-4/5">
                        <p>Upgraded Groundwater Mgmt</p>
                    </div>
                    <div className="w-max">
                        <ControllableToggle
                            name={'regional.upgradedGroundwaterMgmt'}
                            control={control}
                            labelText=""
                            errorMessage={
                                errors.regional?.upgradedGroundwaterMgmt
                                    ?.message
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between align-center items-center py-2">
                    <div className="w-4/5">
                        <p>Urban Greening and Cooling Centers</p>
                    </div>
                    <div className="w-max">
                        <ControllableToggle
                            name={'regional.urbanGreeningAndCoolingCenters'}
                            control={control}
                            labelText=""
                            errorMessage={
                                errors.regional?.urbanGreeningAndCoolingCenters
                                    ?.message
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between align-center items-center py-2">
                    <div className="w-4/5">
                        <p>Water Conservation and Efficient Systems</p>
                    </div>
                    <div className="w-max">
                        <ControllableToggle
                            name={
                                'regional.waterConservationAndEfficientSystems'
                            }
                            control={control}
                            labelText=""
                            errorMessage={
                                errors.regional
                                    ?.waterConservationAndEfficientSystems
                                    ?.message
                            }
                        />
                    </div>
                </div>
                <div className="h-0.5 bg-gray-300 my-4"></div>
                <h2 className="font-semibold text-lg mb-2 mt-6">
                    Building - Dire ct Adaption Measures:
                </h2>
                <div className="flex flex-row justify-between align-center items-center py-2">
                    <div className="w-4/5">
                        <p>Retaining Walls</p>
                    </div>
                    <div className="w-max">
                        <ControllableToggle
                            name={'building.retainingWalls'}
                            control={control}
                            labelText=""
                            errorMessage={
                                errors.building?.retainingWalls?.message
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between align-center items-center py-2">
                    <div className="w-4/5">
                        <p>Ember - Resistant Defensible Space</p>
                    </div>
                    <div className="w-max">
                        <ControllableToggle
                            name={'building.emberResistantDefensibleSpace'}
                            control={control}
                            labelText=""
                            errorMessage={
                                errors.building?.emberResistantDefensibleSpace
                                    ?.message
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between align-center items-center py-2">
                    <div className="w-4/5">
                        <p>Foundation Underpinnings</p>
                    </div>
                    <div className="w-max">
                        <ControllableToggle
                            name={'building.foundationUnderpinnings'}
                            control={control}
                            labelText=""
                            errorMessage={
                                errors.building?.foundationUnderpinnings
                                    ?.message
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between align-center items-center py-2">
                    <div className="w-4/5">
                        <p>Air-Conditioning and Cooling Insulation</p>
                    </div>
                    <div className="w-max">
                        <ControllableToggle
                            name={
                                'building.airConditioningAndCoolingInsulation'
                            }
                            control={control}
                            labelText=""
                            errorMessage={
                                errors.building
                                    ?.airConditioningAndCoolingInsulation
                                    ?.message
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between align-center items-center py-2">
                    <div className="w-4/5">
                        <p>Roof and Wall Bracing</p>
                    </div>
                    <div className="w-max">
                        <ControllableToggle
                            name={'building.roofAndWallBracing'}
                            control={control}
                            labelText=""
                            errorMessage={
                                errors.building?.roofAndWallBracing?.message
                            }
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AdaptationMeasuresForm;
