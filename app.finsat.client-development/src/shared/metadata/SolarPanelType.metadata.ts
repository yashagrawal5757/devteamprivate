import { SolarPanelType } from '@enums/SolarPanelType';

export const solarPanelTypeMetadata: Record<SolarPanelType, string> = {
    [SolarPanelType.MONOCRYSTALLINE]: 'Monocrystalline',
    [SolarPanelType.POLYCRYSTALLINE]: 'Polycrystalline',
    [SolarPanelType.THIN_FILM_AMOR_PHOUSSILICON]: 'Thin Film Amorphous Silicon',
    [SolarPanelType.THIN_FILM_CADMIUM_TELLURIDE]: 'Thin Film Cadmium Telluride',
    [SolarPanelType.THIN_FILM_COPPER_INDIUM]: 'Thin Film Copper Indium',
    [SolarPanelType.BIFACIAL]: 'Bifacial',
    [SolarPanelType.BUILDING_INTEGRATED_PHOTOVOLTAICS]:
        'Building Integrated Photovoltaics',
    [SolarPanelType.CONCENTRATED_PHOTOVOLTAIC]: 'Concentrated Photovoltaic',
    [SolarPanelType.ORGANIC_PHOTOVOLTAICS]: 'Organic Photovoltaics',
    [SolarPanelType.CUSTOM]: 'Custom'
};

export const solarPanelSizeMetadata: Record<
    SolarPanelType,
    { min: number; max: number }
> = {
    [SolarPanelType.MONOCRYSTALLINE]: { min: 1.6, max: 1.6 },
    [SolarPanelType.POLYCRYSTALLINE]: { min: 1.6, max: 1.6 },
    [SolarPanelType.THIN_FILM_AMOR_PHOUSSILICON]: { min: 1.2, max: 1.5 },
    [SolarPanelType.THIN_FILM_CADMIUM_TELLURIDE]: { min: 1.2, max: 1.5 },
    [SolarPanelType.THIN_FILM_COPPER_INDIUM]: { min: 1.2, max: 1.5 },
    [SolarPanelType.BIFACIAL]: { min: 1.6, max: 2 },
    [SolarPanelType.BUILDING_INTEGRATED_PHOTOVOLTAICS]: { min: 0.5, max: 1.5 },
    [SolarPanelType.CONCENTRATED_PHOTOVOLTAIC]: { min: 0.5, max: 1 },
    [SolarPanelType.ORGANIC_PHOTOVOLTAICS]: { min: 1, max: 1 },
    [SolarPanelType.CUSTOM]: { min: 0.5, max: 2 }
};
export const solarPanelEfficiencyMetadata: Record<
    SolarPanelType,
    { min: number; max: number }
> = {
    [SolarPanelType.MONOCRYSTALLINE]: { min: 15, max: 22 },
    [SolarPanelType.POLYCRYSTALLINE]: { min: 13, max: 17 },
    [SolarPanelType.THIN_FILM_AMOR_PHOUSSILICON]: { min: 10, max: 12 },
    [SolarPanelType.THIN_FILM_CADMIUM_TELLURIDE]: { min: 11, max: 12 },
    [SolarPanelType.THIN_FILM_COPPER_INDIUM]: { min: 13, max: 15 },
    [SolarPanelType.BIFACIAL]: { min: 15, max: 22 },
    [SolarPanelType.BUILDING_INTEGRATED_PHOTOVOLTAICS]: { min: 10, max: 15 },
    [SolarPanelType.CONCENTRATED_PHOTOVOLTAIC]: { min: 20, max: 40 },
    [SolarPanelType.ORGANIC_PHOTOVOLTAICS]: { min: 7, max: 12 },
    [SolarPanelType.CUSTOM]: { min: 7, max: 40 }
};
