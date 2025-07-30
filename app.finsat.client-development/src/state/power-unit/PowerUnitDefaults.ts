import { PowerUnit } from '@enums/PowerUnit';

export type PowerUnitType = {
    powerUnit: PowerUnit;
};

const PowerUnitDefaults: PowerUnitType = {
    powerUnit: PowerUnit.KW
};

export default PowerUnitDefaults;
