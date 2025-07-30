import { createContext, Dispatch } from 'react';
import { PropertyFrame } from '../../state/property-frame/PropertyFrameDefaults';
import { IReducerAction } from '@models/IReducerAction';

interface PropertyFrameContextType {
    state: PropertyFrame | undefined;
    dispatch: Dispatch<IReducerAction>;
}

const PropertyFrameContext = createContext<PropertyFrameContextType>(
    {} as PropertyFrameContextType
);

export default PropertyFrameContext;