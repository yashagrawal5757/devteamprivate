import Button from '@ui/buttons/button/Button';
import usePropertyEditor from 'modules/protected/property-details/hooks/property-editor/usePropertyEditor';
import useSolarCalculationEstimate from 'modules/protected/property-details/hooks/solar-calculation-estimate/useSolarCalculationEstimate';
import { PropertyMapMode } from 'modules/protected/property-details/state/property-editor/PropertyEditorDefaults';
import React, { useEffect, useMemo } from 'react'
import usePropertyFootprint from '../../hooks/property-footprint/usePropertyFootprint';
import usePropertyPolygon from '../property-map/hooks/usePropertyPolygon';

type PropertyMapActionsProps = {
    children: React.ReactNode | JSX.Element;
    style?: React.CSSProperties;
}

const PropertyMapActions = ({ children, style = {'zIndex': 50}}: PropertyMapActionsProps) => {
    const { solarGenerationOutput, solarFinancialOutput } =
        useSolarCalculationEstimate();

    const { calculateAvailableSpace } = usePropertyPolygon();

    const { footprint } = usePropertyFootprint();

    const { propertyEditor, setMapMode } = usePropertyEditor();

    const isEditorMode = useMemo(
        () => propertyEditor.propertyMapMode === PropertyMapMode.EDITOR,
        [propertyEditor]
    );

    const calculationExists = useMemo(
        () => solarGenerationOutput !== undefined || solarFinancialOutput !== undefined,
        [solarGenerationOutput, solarFinancialOutput]
    );

    const hasFootprint = useMemo(
        () => footprint.shapes.length > 0,
        [footprint]
    );

    return (
        <>
            {
                isEditorMode && calculationExists && (
                    <div className="absolute top-6 right-4 z-50" style={style}>
                        <div className="flex flex-row w-[220px] text-center bg-white py-2 px-4 rounded text-sm justify-between select-none">
                            <div
                                className={`flex flex-row w-full items-center justify-center cursor-pointer text-center ${!isEditorMode ? 'text-primary' : ''}`}
                                onClick={() =>
                                    isEditorMode && setMapMode(PropertyMapMode.DETAILS)
                                }
                            >
                                <p className="text-xs">Back to Calculation Results</p>
                            </div>
                        </div>
                        {
                            children
                        }
                        {
                            hasFootprint && (
                                <div className="mt-2 text-xs">
                                    <Button
                                        text="Calculate Available Space"
                                        type="button"
                                        onClick={calculateAvailableSpace}
                                    />
                                </div>
                            )
                        }
                    </div>
                )
            }
            {
                isEditorMode && !calculationExists && (
                    <div className="absolute top-6 right-4 w-[220px]" style={style}>
                        {
                            children
                        }
                        {
                            hasFootprint && (
                                <div className="mt-2 text-xs">
                                    <Button
                                        text="Calculate Available Space"
                                        type="button"
                                        onClick={calculateAvailableSpace}
                                    />
                                </div>
                            )
                        }
                    </div>
                )
            }
            {
                !isEditorMode && (
                    <div className="absolute top-6 right-4 z-50">
                        <div className="flex flex-row w-[220px] text-center bg-white py-2 px-4 rounded text-sm justify-between select-none">
                            <div
                                className={`flex flex-row w-full items-center justify-center cursor-pointer text-center ${isEditorMode ? 'text-primary' : ''}`}
                                onClick={() =>
                                    !isEditorMode && setMapMode(PropertyMapMode.EDITOR)
                                }
                            >
                                <p className="text-xs text-center flex">Select Property Area</p>
                            </div>
                        </div>
                        {
                            children
                        }
                        {
                            hasFootprint && (
                                <div className="mt-2 text-xs">
                                    <Button
                                        text="Calculate Available Space"
                                        type="button"
                                        onClick={calculateAvailableSpace}
                                    />
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

export default PropertyMapActions