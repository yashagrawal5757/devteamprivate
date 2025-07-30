import { surveyQuestionMetadata } from '@metadata/SurveyQuestion.metadata';
import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const schema = yup
    .object({
        name: yup
            .string()
            .min(3, 'Name must be at least 3 characters')
            .required('Name is required'),
        email: yup
            .string()
            .email('Email must be a valid email')
            .required('Email is required'),
        password: yup
            .string()
            .required('Password is required')
            .matches(
                passwordRules,
                'Password must have at least 8 characters, including uppercase, lowercase, number and special characters'
            ),
        companyOrganization: yup.string(),
        sector: yup.number().required(),
        interest: yup.number().required(),
        surveys: yup.array().of(
            yup.object({
                question: yup.number().required(),
                answer: yup.string()
            })
        )
    })
    .required();

export default schema;
