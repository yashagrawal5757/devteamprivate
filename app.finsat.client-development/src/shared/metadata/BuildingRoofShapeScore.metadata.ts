import { BuildingRoofShapeScore } from '@enums/BuildingRoofShapeScore';

export const buildingRoofShapeScoreMetadata: Record<
    BuildingRoofShapeScore,
    string
> = {
    [BuildingRoofShapeScore.IDEAL]: 'Ideal',
    [BuildingRoofShapeScore.GREAT]: 'Great',
    [BuildingRoofShapeScore.MODERATE]: 'Moderate',
    [BuildingRoofShapeScore.POOR]: 'Poor',
    [BuildingRoofShapeScore.UNFAVORABLE]: 'Unfavorable',
    [BuildingRoofShapeScore.UNSUPPORTED]: 'Unsupported'
};
