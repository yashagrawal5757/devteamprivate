import React from 'react';
import { IReducerAction } from '@models/IReducerAction';
import { PropertiesSelectQueueType } from '../../state/properties-select-queue/PropertiesSelectQueueDefaults';

interface PropertiesSelectQueueContextType {
    state: Array<PropertiesSelectQueueType>;
    dispatch: React.Dispatch<IReducerAction>;
}

const PropertiesSelectQueueContext =
    React.createContext<PropertiesSelectQueueContextType>(
        {} as PropertiesSelectQueueContextType
    );

export default PropertiesSelectQueueContext;
