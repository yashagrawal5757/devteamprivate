import * as yup from 'yup';

const schema = yup
    .object({
        name: yup
            .string()
            .min(3, 'Name must be at least 3 characters')
            .required('Name is required'),
        type: yup
            .number()
            .required('Type is required'),
    })
    .required();

export default schema;
