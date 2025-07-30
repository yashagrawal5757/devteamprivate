import { BuildingRoofShape } from '@enums/BuildingRoofShape';

export const buildingRoofShapeMetadata: Record<BuildingRoofShape, string> = {
    [BuildingRoofShape.FLAT]: 'Flat',
    [BuildingRoofShape.PITCHED]: 'Pitched',
    [BuildingRoofShape.GABLE]: 'Gable',
    [BuildingRoofShape.RIDGED]: 'Ridged',
    [BuildingRoofShape.GAMBREL]: 'Gambrel',
    [BuildingRoofShape.HIPP]: 'Hipp',
    [BuildingRoofShape.ARCH]: 'Arch',
    [BuildingRoofShape.DOME]: 'Dome',
    [BuildingRoofShape.MANSARD]: 'Mansard',
    [BuildingRoofShape.CONICAL]: 'Conical'
};
