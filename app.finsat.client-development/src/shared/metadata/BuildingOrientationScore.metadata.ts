import { BuildingOrientationScore } from '@enums/BuildingOrientationScore';

export const buildingOrientationScoreMetadata: Record<
    BuildingOrientationScore,
    string
> = {
    [BuildingOrientationScore.VERYUNFAVORABLE]: 'Very unfavorable',
    [BuildingOrientationScore.UNFAVORABLE]: 'Unfavorable',
    [BuildingOrientationScore.NEUTRAL]: 'Neutral',
    [BuildingOrientationScore.FAVORABLE]: 'Favorable',
    [BuildingOrientationScore.VERYFAVORABLE]: 'Very favorable'
};
