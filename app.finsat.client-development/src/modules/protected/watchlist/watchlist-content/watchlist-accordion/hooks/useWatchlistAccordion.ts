import { BuildingType } from '@enums/BuildingType';
import { SpatialFeatureType } from '@enums/SpatialFeatureType';
import React, { useState } from 'react';

type SearchQueriesType = Record<string, string>;

const useWatchlistAccordion = () => {
    const [searchPropertyQuery, setSearchPropertyQuery] =
        useState<SearchQueriesType>({});

    const getNavigationPropertyId = (id: string) => {
        if (id.split('-').length > 1) {
            return `SFP-${id}`;
        }

        return `BP-${id}`;
    }

    return {
        searchPropertyQuery,
        setSearchPropertyQuery,
        getNavigationPropertyId
    };
};

export default useWatchlistAccordion;
