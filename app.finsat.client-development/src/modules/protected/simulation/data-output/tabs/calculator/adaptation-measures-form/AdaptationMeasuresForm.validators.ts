import * as yup from 'yup';

const schema = yup
    .object({
        regional: yup.object({
            upgradedDrainageInfrastructure: yup.bool().required(),
            coastalDefences: yup.bool().required(),
            erosionControl: yup.bool().required(),
            prescribedBurningAndVegetationMgmt: yup.bool().required(),
            riverFloodControlInfrastructure: yup.bool().required(),
            upgradedGroundwaterMgmt: yup.bool().required(),
            urbanGreeningAndCoolingCenters: yup.bool().required(),
            waterConservationAndEfficientSystems: yup.bool().required()
        }),
        building: yup.object({
            retainingWalls: yup.bool().required(),
            emberResistantDefensibleSpace: yup.bool().required(),
            foundationUnderpinnings: yup.bool().required(),
            airConditioningAndCoolingInsulation: yup.bool().required(),
            roofAndWallBracing: yup.bool().required()
        })
    })
    .required();

export default schema;
