import { AreaConfigurationType } from '@enums/AreaConfigurationType';

export const areaConfigurationTypeMetadata: Record<
    AreaConfigurationType,
    string
> = {
    [AreaConfigurationType.BY_PANELS]: 'By Panels',
    [AreaConfigurationType.BY_AREA]: 'By Area'
    // [AreaConfigurationType.AUTOMATIC]: 'Automatic'
};
