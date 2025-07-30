import { SolarPanelPotential } from '@enums/SolarPanelPotential';

export const solarPanelPotentialMetadata: Record<SolarPanelPotential, string> =
    {
        [SolarPanelPotential.INSUFFICIENT]: 'Low',
        [SolarPanelPotential.MODERATE]: 'Medium',
        [SolarPanelPotential.SUFFICIENT]: 'High'
    };

export const solarPanelPotentialColorMetadata: Record<
    SolarPanelPotential,
    string
> = {
    [SolarPanelPotential.INSUFFICIENT]: '#F7DC6F',
    [SolarPanelPotential.MODERATE]: '#F5B041',
    [SolarPanelPotential.SUFFICIENT]: '#E67E22'
};

export const solarPanelPotentialPinMetadata: Record<
    SolarPanelPotential,
    string
> = {
    [SolarPanelPotential.INSUFFICIENT]: './insufficient-pin.png',
    [SolarPanelPotential.MODERATE]: './moderate-pin.png',
    [SolarPanelPotential.SUFFICIENT]: './sufficient-pin.png'
};
