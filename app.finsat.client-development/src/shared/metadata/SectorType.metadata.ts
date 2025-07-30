import { SectorType } from '@enums/SectorType';

export const sectorTypeMetadata: Record<SectorType, string> = {
    [SectorType.NONE]: '-- Select Sector --',
    [SectorType.AGRICULTURE]: 'Agriculture',
    [SectorType.BANKING]: 'Banking',
    [SectorType.REAL_ESTATE]: 'Real Estate',
    [SectorType.INSURANCE]: 'Insurance',
    [SectorType.ENERGY]: 'Energy',
    [SectorType.WATER]: 'Water',
    [SectorType.OTHER]: 'Other'
};
