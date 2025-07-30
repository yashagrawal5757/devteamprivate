import useExplorePolygonRef from '@explore/explore-hybrid-content/explore-hybrid-map/hooks/explore-editor/useExplorePolygonRef';
import React, { createContext, useContext } from 'react';

const ExplorePolygonRefContext = createContext<ReturnType<
    typeof useExplorePolygonRef
> | null>(null);

export const ExplorePolygonRefProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const polygonRef = useExplorePolygonRef();
    return (
        <ExplorePolygonRefContext.Provider value={polygonRef}>
            {children}
        </ExplorePolygonRefContext.Provider>
    );
};

export const usePropertyPolygonContext = () => {
    const context = useContext(ExplorePolygonRefContext);

    if (!context) {
        throw new Error(
            'usePropertyPolygonRef must be used within a PropertyPolygonRefProvider'
        );
    }

    return context;
};
