import React from 'react';
import useVariations from 'modules/protected/property-details/hooks/variations/useVariations';
import useProperty from 'modules/protected/property-details/hooks/property/useProperty';

const Variations = ({ changeTab }: any) => {
    const { variations, fetchVariationById } = useVariations();
    const { property } = useProperty();

    if (property === undefined) {
        return;
    }

    if (variations === undefined) {
        return;
    }

    if (variations.length === 0) {
        return (
            <div className="flex flex-col justify-center text-center mt-[50px]">
                <p className="font-semibold text-md">No variations exist.</p>
                <p className="text-accent text-xs">
                    Use calculator to create and save variations.
                </p>
            </div>
        );
    }

    return (
        <>
            {variations.map((variation) => (
                <button
                    key={variation.id}
                    type="button"
                    className="relative mb-3 flex items-center justify-between w-full px-4 py-2 text-[#1c2833] rounded-md font-medium rtl:text-right font-semibold text-xs border border-gray-300 hover:bg-gray-100 gap-3"
                    onClick={() => {
                        fetchVariationById(property.osmId, variation.id);
                        changeTab(1);
                    }}
                >
                    <p>{variation.id.split('-')[0]}</p>
                    <div className="text-right font-normal">
                        <p>{`${String(new Date(variation.createdAt).getHours()).padStart(2, '0')}:${String(new Date(variation.createdAt).getMinutes()).padStart(2, '0')}`}</p>
                        <p>{`${String(new Date(variation.createdAt).getDate()).padStart(2, '0')}.${String(new Date(variation.createdAt).getMonth() + 1).padStart(2, '0')}.${new Date(variation.createdAt).getFullYear()}`}</p>
                    </div>
                </button>
            ))}
        </>
    );
};

export default Variations;
