import { SolarPanelType } from "@enums/SolarPanelType";

export const getPanelSpecsByType = (type: SolarPanelType): { height: number, width: number, efficiency: number } => {
    switch (type) {
        case SolarPanelType.MONOCRYSTALLINE:
            return {
                height: 1.65,
                width: 0.99,
                efficiency: 20
            }
        case SolarPanelType.POLYCRYSTALLINE:
            return {
                height: 1.96,
                width: 0.99,
                efficiency: 16
            }
        case SolarPanelType.THIN_FILM_AMOR_PHOUSSILICON:
            return {
                height: 1.2,
                width: 0.6,
                efficiency: 7
            }
        case SolarPanelType.THIN_FILM_CADMIUM_TELLURIDE:
            return {
                height: 2.01,
                width: 1.23,
                efficiency: 18
            }
        case SolarPanelType.THIN_FILM_COPPER_INDIUM:
            return {
                height: 1.26,
                width: 0.98,
                efficiency: 13
            }
        case SolarPanelType.BIFACIAL:
            return {
                height: 1.96,
                width: 0.99,
                efficiency: 20
            }
        case SolarPanelType.BUILDING_INTEGRATED_PHOTOVOLTAICS:
            return {
                height: 1.18,
                width: 0.54,
                efficiency: 12
            }
        case SolarPanelType.CONCENTRATED_PHOTOVOLTAIC:
            return {
                height: 1.18,
                width: 0.54,
                efficiency: 30
            }
        case SolarPanelType.ORGANIC_PHOTOVOLTAICS:
            return {
                height: 1.18,
                width: 0.54,
                efficiency: 10
            }
        case SolarPanelType.CONCENTRATED_PHOTOVOLTAIC:
            return {
                height: 0.28,
                width: 0.28,
                efficiency: 39
            }
        case SolarPanelType.ORGANIC_PHOTOVOLTAICS:
            return {
                height: 0.14,
                width: 0.14,
                efficiency: 15
            }
        default:
            return {
                height: 1.65,
                width: 0.99,
                efficiency: 20
            }
    }
}