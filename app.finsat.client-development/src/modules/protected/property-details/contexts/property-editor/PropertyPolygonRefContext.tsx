import React, { createContext, useContext } from 'react';
import usePropertyPolygonRef from '../../hooks/property-editor/usePropertyPolygonRef';

const PropertyPolygonRefContext = createContext<ReturnType<
    typeof usePropertyPolygonRef
> | null>(null);

export const PropertyPolygonRefProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const polygonRef = usePropertyPolygonRef();
    return (
        <PropertyPolygonRefContext.Provider value={polygonRef}>
            {children}
        </PropertyPolygonRefContext.Provider>
    );
};

export const usePropertyPolygonContext = () => {
    const context = useContext(PropertyPolygonRefContext);

    if (!context) {
        throw new Error(
            'usePropertyPolygonRef must be used within a PropertyPolygonRefProvider'
        );
    }

    return context;
};
