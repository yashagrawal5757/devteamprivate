import { ExplorePropertiesSortOption } from '@enums/ExplorePropertiesSortOption';

export const explorePropertiesSortOptionMetadata: Record<
    ExplorePropertiesSortOption,
    string
> = {
    [ExplorePropertiesSortOption.DEFAULT]: 'Sort by default',
    [ExplorePropertiesSortOption.NAME_ASC]: 'Name Ascending',
    [ExplorePropertiesSortOption.NAME_DESC]: 'Name Descending',
    [ExplorePropertiesSortOption.HIGHEST_SOLAR_HOURS]:
        'Sun Hours (Highest to Lowest)',
    [ExplorePropertiesSortOption.LOWEST_SOLAR_HOURS]:
        'Sun Hours (Lowest to Highest)'
};
