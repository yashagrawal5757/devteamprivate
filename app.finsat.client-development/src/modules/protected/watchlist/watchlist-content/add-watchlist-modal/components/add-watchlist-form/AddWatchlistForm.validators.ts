import * as yup from 'yup';

const schema = yup
    .object({
        name: yup.string().required('Name is required')
    })
    .required();

export default schema;
