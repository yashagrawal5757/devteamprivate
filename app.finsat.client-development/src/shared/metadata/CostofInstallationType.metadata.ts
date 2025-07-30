import { CostOfInstallationType } from '@enums/CostOfInstallationType';

export const costOfInstallationTypeMetadata: Record<
    CostOfInstallationType,
    string
> = {
    [CostOfInstallationType.NONE]: 'None',
    [CostOfInstallationType.LOW]: 'Low',
    [CostOfInstallationType.MEDIUM]: 'Medium',
    [CostOfInstallationType.HIGH]: 'High'
};
