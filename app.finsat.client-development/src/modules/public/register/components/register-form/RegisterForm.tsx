import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import registerFormSchema from './RegisterForm.validators';
import ControllableInput from '@ui/inputs/controllable-input/ControllableInput';
import Button from '@ui/buttons/button/Button';
import ControllableSelect from '@ui/inputs/controllable-select/ControllableSelect';
import { SectorType } from '@enums/SectorType';
import { PrimaryInterestType } from '@enums/PrimaryInterestType';
import { sectorTypeMetadata } from '@metadata/SectorType.metadata';
import { primaryInterestTypeMetadata } from '@metadata/PrimaryInterestType.metadata';
import ControllableTextarea from '@ui/inputs/controllable-textarea/ControllableTextarea';
import { SurveyQuestion } from '@enums/SurveyQuestion';
import { surveyQuestionMetadata } from '@metadata/SurveyQuestion.metadata';

type RegisterFormProps = {
    onSubmit: SubmitHandler<RegisterForm>;
};

export type RegisterSurvey = {
    question: SurveyQuestion;
    answer?: string;
};

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    company?: string;
    sector: SectorType;
    interest: PrimaryInterestType;
    surveys?: Array<RegisterSurvey>;
};

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm<RegisterForm>({
        resolver: yupResolver(registerFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            company: '',
            sector: SectorType.NONE,
            interest: PrimaryInterestType.NONE,
            surveys: [
                {
                    question:
                        SurveyQuestion.IMPACT_OF_EXTREME_WEATHER_ON_OPERATIONS,
                    answer: ''
                }
            ]
        },
        mode: 'onChange',
        reValidateMode: 'onChange'
    });

    const sectorTypeOptions = Object.keys(SectorType)
        .filter((key) => isNaN(Number(key)))
        .map((key) => ({
            value: SectorType[key as keyof typeof SectorType],
            label: sectorTypeMetadata[
                SectorType[key as keyof typeof SectorType]
            ]
        }));

    const primaryInterestTypeOptions = Object.keys(PrimaryInterestType)
        .filter((key) => isNaN(Number(key)))
        .map((key) => ({
            value: PrimaryInterestType[key as keyof typeof PrimaryInterestType],
            label: primaryInterestTypeMetadata[
                PrimaryInterestType[key as keyof typeof PrimaryInterestType]
            ]
        }));

    return (
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
                <ControllableInput
                    name={'email'}
                    control={control}
                    type="text"
                    labelText="Email"
                    errorMessage={errors.email?.message}
                    required={true}
                />
            </div>
            <div className="my-6">
                <ControllableInput
                    name={'password'}
                    control={control}
                    type="password"
                    labelText="Password"
                    errorMessage={errors.password?.message}
                    required={true}
                />
            </div>
            <div className="my-6">
                <ControllableInput
                    name={'company'}
                    control={control}
                    type="text"
                    labelText="Company/Organization"
                    errorMessage={errors.company?.message}
                    required={false}
                />
            </div>
            <div className="my-6">
                <ControllableSelect
                    name={'sector'}
                    control={control}
                    labelText="Sector"
                    errorMessage={errors.sector?.message}
                    required={false}
                    options={sectorTypeOptions}
                    showOption={false}
                />
            </div>
            <div className="my-6">
                <ControllableSelect
                    name={'interest'}
                    control={control}
                    labelText="Primary Interest"
                    errorMessage={errors.interest?.message}
                    required={false}
                    options={primaryInterestTypeOptions}
                    showOption={false}
                />
            </div>
            <div className="my-6 mb-14">
                {getValues('surveys')?.map((item, index) => (
                    <div className="mt-6" key={index}>
                        <ControllableTextarea
                            control={control}
                            name={`surveys[${index}].answer`}
                            labelText={
                                surveyQuestionMetadata[
                                    item.question as SurveyQuestion
                                ]
                            }
                            errorMessage={
                                errors.surveys?.[index]?.answer?.message
                            }
                            required={false}
                            rows={5}
                            maxLength={500}
                        />
                    </div>
                ))}
            </div>
            <Button
                text="REGISTER"
                type="submit"
                onClick={handleSubmit(onSubmit)}
            />
        </form>
    );
};

export default RegisterForm;
