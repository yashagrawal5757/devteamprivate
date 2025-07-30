import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const schema = yup
    .object({
        currentPassword: yup
            .string()
            .required('Password is required')
            .matches(
                passwordRules,
                'Password must have at least 8 characters, including uppercase, lowercase, number and special characters'
            ),
        newPassword: yup
            .string()
            .required('Password is required')
            .matches(
                passwordRules,
                'Password must have at least 8 characters, including uppercase, lowercase, number and special characters'
            ),
        confirmPassword: yup
            .string()
            .required('Password is required')
            .matches(
                passwordRules,
                'Password must have at least 8 characters, including uppercase, lowercase, number and special characters'
            )
            .oneOf([yup.ref('newPassword')], 'Passwords must match')
    })
    .required();

export default schema;
