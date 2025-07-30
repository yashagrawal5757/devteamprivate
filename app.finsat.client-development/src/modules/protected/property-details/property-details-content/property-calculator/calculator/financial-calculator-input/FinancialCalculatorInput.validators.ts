import * as yup from 'yup';

const schema = yup
    .object({
        systemCost: yup.object({
            value: yup
                .number()
                .transform((value, originalValue) => {
                    return originalValue === '' ? undefined : value;
                })
                .min(0, 'System Cost must be equal or greater than 0')
                .required('System Cost is required'),
            isDefaultValue: yup.boolean().required()
        }),
        discountRate: yup.object({
            value: yup
                .number()
                .transform((value, originalValue) => {
                    return originalValue === '' ? undefined : value;
                })
                .min(0, 'Discount Rate must be equal or greater than 0')
                .required('Discount Rate is required'),
            isDefaultValue: yup.boolean().required()
        }),
        projectLifetime: yup.object({
            value: yup
                .number()
                .transform((value, originalValue) => {
                    return originalValue === '' ? undefined : value;
                })
                .min(0, 'Project Lifetime must be equal or greater than 0')
                .required('Project Lifetime is required'),
            isDefaultValue: yup.boolean().required()
        }),
        cashFlows: yup
            .array()
            .of(
                yup.object({
                    value: yup
                        .number()
                        .transform((value, originalValue) => {
                            return originalValue === '' ? undefined : value;
                        })
                        .min(0, 'Cash Flow must be equal or greater than 0')
                        .required('Cash Flow is required')
                })
            )
            .required()
    })
    .required();

export default schema;
