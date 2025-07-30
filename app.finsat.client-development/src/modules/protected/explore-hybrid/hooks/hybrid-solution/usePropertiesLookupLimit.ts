import React from 'react';
import usePropertiesLookupLimitContext from '../../contexts/properties-lookup-limit/usePropertiesLookupLimitContext';
import { PropertiesLookupLimitActions } from '../../state/properties-lookup-limit/PropertiesLookupLimitActions';

const usePropertiesLookupLimit = () => {
    const propertiesLookupLimit = usePropertiesLookupLimitContext();

    const setLookupLimit = (value: boolean = false) => {
        propertiesLookupLimit.dispatch({
            type: PropertiesLookupLimitActions.SET_LOAD_MORE,
            payload: value
        });
    };

    return {
        lookupLimit: propertiesLookupLimit.state,
        setLookupLimit
    };
};

export default usePropertiesLookupLimit;
