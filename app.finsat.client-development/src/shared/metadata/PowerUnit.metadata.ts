import { PowerUnit } from '@enums/PowerUnit';

export const powerUnitMetadata: Record<PowerUnit, string> = {
    [PowerUnit.KW]: 'kWh',
    [PowerUnit.MW]: 'MWh'
};
