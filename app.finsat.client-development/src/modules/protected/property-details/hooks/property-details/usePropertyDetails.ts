import React from 'react';
import useToggle from '@hooks/useToggle';

const usePropertyDetails = () => {
    const {
        isActive: isAddVariationActive,
        toggle: addVariationToggle,
        setToggle: setAddVariationToggle
    } = useToggle();

    return {
        isAddVariationActive,
        addVariationToggle,
        setAddVariationToggle
    };
};

export default usePropertyDetails;
