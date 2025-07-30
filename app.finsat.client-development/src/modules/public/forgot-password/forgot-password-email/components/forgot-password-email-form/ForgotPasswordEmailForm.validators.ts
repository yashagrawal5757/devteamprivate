import * as yup from 'yup';

const schema = yup
    .object({
        email: yup
            .string()
            .email('Email must be a valid email')
            .required('Email is required')
    })
    .required();

export default schema;
