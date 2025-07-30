// src/context/SolarContext.tsx
import { createContext, useContext, useState } from 'react';
import { SolarApiResponse } from '../../hooks/useGoogleSolarApi';

interface SolarContextProps {
    solarData: SolarApiResponse | null;
    setSolarData: (data: SolarApiResponse | null) => void;
}

const SolarContext = createContext<SolarContextProps | undefined>(undefined);

export const SolarProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [solarData, setSolarData] = useState<SolarApiResponse | null>(null);

    return (
        <SolarContext.Provider value={{ solarData, setSolarData }}>
            {children}
        </SolarContext.Provider>
    );
};

export const useSolarContext = (): SolarContextProps => {
    const context = useContext(SolarContext);
    if (!context)
        throw new Error('useSolarContext must be used within SolarProvider');
    return context;
};
