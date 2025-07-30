import * as yup from 'yup';

const schema = yup
    .object({
        firstName: yup
            .string()
            .min(3, 'First Name must be at least 3 characters')
            .required('First Name is required'),
        lastName: yup
            .string()
            .min(3, 'Last Name must be at least 3 characters')
            .required('Last Name is required'),
        email: yup
            .string()
            .email('Email must be a valid email')
            .required('Email is required')
    })
    .required();

export default schema;
