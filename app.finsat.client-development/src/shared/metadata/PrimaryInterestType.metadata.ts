import { PrimaryInterestType } from '@enums/PrimaryInterestType';

export const primaryInterestTypeMetadata: Record<PrimaryInterestType, string> =
    {
        [PrimaryInterestType.NONE]: '-- Select Interest --',
        [PrimaryInterestType.SITE_FEASIBILITY_STUDY]: 'Site Feasibility Study',
        [PrimaryInterestType.WEATHER_RISK_INDICES]: 'Weather Risk Indices',
        [PrimaryInterestType.FINANCIAL_MODELING]: 'Financial Modeling',
        [PrimaryInterestType.CLIMATE_RISK_RATINGS]: 'Climate Risk Ratings'
    };
