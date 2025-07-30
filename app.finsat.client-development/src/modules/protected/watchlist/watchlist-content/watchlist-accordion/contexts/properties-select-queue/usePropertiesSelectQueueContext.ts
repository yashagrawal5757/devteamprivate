import React from 'react';
import createDataContext from '@contexts/createDataContext';
import PropertiesSelectQueueReducer from '../../state/properties-select-queue/PropertiesSelectQueueReducer';
import PropertiesSelectQueueDefaults from '../../state/properties-select-queue/PropertiesSelectQueueDefaults';
import PropertiesSelectQueueContext from './PropertiesSelectQueueContext';

export const PropertiesSelectQueueContextProvider = createDataContext(
    PropertiesSelectQueueReducer,
    PropertiesSelectQueueDefaults,
    PropertiesSelectQueueContext
);

export default function usePropertiesSelectQueueContext() {
    return React.useContext(PropertiesSelectQueueContext);
}
