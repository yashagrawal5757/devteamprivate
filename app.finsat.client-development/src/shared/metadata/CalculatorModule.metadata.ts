import { CalculatorModule } from '../enums/CalculatorModule';

export const calculatorModuleMetadata: Record<CalculatorModule, string> = {
    // [CalculatorModule.UNKNOWN]: 'Unknown',
    [CalculatorModule.SOLAR_PANEL]: 'Solar Panel',
    [CalculatorModule.PANE_WINDOW]: 'Pane Window',
    [CalculatorModule.UNDERFLOOR_HEATING]: 'Underfloor Heating',
    [CalculatorModule.WALL_INSULATION]: 'Wall Insulation'
};
