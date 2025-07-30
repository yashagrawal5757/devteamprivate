import * as yup from 'yup';

const schema = yup
    .object({
        type: yup.object({
            value: yup.number().required('Type is required')
        }),
        panelHorizontalLength: yup.object({
            value: yup
                .number()
                .transform((value, originalValue) => {
                    return originalValue === '' ? undefined : value;
                })
                .min(0.01, 'Panel width value must be greater than 0')
                .required('Panel width is required'),
            isDefaultValue: yup.boolean().required()
        }),
        panelVerticalLength: yup.object({
            value: yup
                .number()
                .transform((value, originalValue) => {
                    return originalValue === '' ? undefined : value;
                })
                .min(0.01, 'Panel height value must be greater than 0')
                .required('Panel height is required'),
            isDefaultValue: yup.boolean().required()
        }),
        panelEfficiency: yup.object({
            value: yup
                .number()
                .transform((value, originalValue) => {
                    return originalValue === '' ? undefined : value;
                })
                .required('Efficiency is required'),
            isDefaultValue: yup.boolean().required()
        }),
        areaConfigurationType: yup.object({
            value: yup.number().required('Area Configuration Type is required')
        }),
        areaConfigurationValue: yup.object({
            value: yup
                .number()
                .transform((value, originalValue) => {
                    return originalValue === '' ? undefined : value;
                })
                .min(1, 'Area configuration value must be greater than 0')
                .required('Area configuration value is required'),
            isNull: yup.boolean().nullable().required()
        }),
        slope: yup.object({
            value: yup
                .number()
                .transform((value, originalValue) => {
                    return originalValue === '' ? undefined : value;
                })
                .integer('Slope must be a whole number')
                .min(0, 'Slope must be equal or greater than 0')
                .max(360, 'Slope must be equal or less than 360')
                .required('Slope is required'),
            isDefaultValue: yup.boolean().required()
        }),
        revenuePerKWh: yup.object({
            value: yup
                .number()
                .transform((value, originalValue) => {
                    return originalValue === '' ? undefined : value;
                })
                .min(0, 'Revenue must be equal or greater than 0')
                .required('Revenue is required'),
            isDefaultValue: yup.boolean().required()
        }),
        electricityPrice: yup.object({
            value: yup
                .number()
                .transform((value, originalValue) => {
                    return originalValue === '' ? undefined : value;
                })
                .min(0, 'Electricity Price must be equal or greater than 0')
                .required('Electricity Price is required'),
            isDefaultValue: yup.boolean().required()
        }),
        maintenanceCost: yup.object({
            value: yup
                .number()
                .transform((value, originalValue) => {
                    return originalValue === '' ? undefined : value;
                })
                .min(0, 'Maintenance Cost must be equal or greater than 0')
                .required('Maintenance Cost is required'),
            isDefaultValue: yup.boolean().required()
        })
    })
    .required();

export default schema;
