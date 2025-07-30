import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const schema = yup
    .object({
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
            )
    })
    .required();

export default schema;
