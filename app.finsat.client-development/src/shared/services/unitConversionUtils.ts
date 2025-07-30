import { PowerUnit } from '@enums/PowerUnit';

class UnitConversionUtils {
    static convertDegreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    static convertRadiansToDegrees(radians: number): number {
        return radians * (180 / Math.PI);
    }

    static convertKiloToMega(value: number): number {
        return value / 1000;
    }

    static convertMegaToKilo(value: number): number {
        return value * 1000;
    }
}

const ANGLE_DEFAULT_CONFIG: 'radians' | 'degrees' = 'degrees';

export const getDisplayAngle = (value: number): number => {
    if (ANGLE_DEFAULT_CONFIG === 'degrees') {
        return UnitConversionUtils.convertRadiansToDegrees(value);
    }

    return value;
};

export const getRadianAngle = (value: number): number => {
    if (ANGLE_DEFAULT_CONFIG === 'degrees') {
        return UnitConversionUtils.convertDegreesToRadians(value);
    }

    return value;
};

export const getDisplayPowerUnit = (
    value: number,
    powerUnit: PowerUnit
): number => {
    if (powerUnit === PowerUnit.MW) {
        return UnitConversionUtils.convertKiloToMega(value);
    }

    return value;
};

export const getPowerUnit = (value: number, powerUnit: PowerUnit): number => {
    if (powerUnit === PowerUnit.MW) {
        return UnitConversionUtils.convertMegaToKilo(value);
    }

    return value;
};
