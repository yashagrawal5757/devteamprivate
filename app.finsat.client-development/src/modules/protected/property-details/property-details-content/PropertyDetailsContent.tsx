import React, { useEffect, useMemo, useRef } from 'react';
import PropertyCalculator from './property-calculator/PropertyCalculator';
import PropertyInfo from './property-info/PropertyInfo';
import PropertyMap from './property-map/PropertyMap';
import { useLocation, useParams } from 'react-router-dom';
import useProperty, { PropertyTypePrefix } from '../hooks/property/useProperty';
import useVariations from '../hooks/variations/useVariations';
import AddPropertyToWatchlistModal from './add-property-to-watchlist-modal/AddPropertyToWatchlistModal';
import Button from '@ui/buttons/button/Button';
import usePropertyDetailsWatchlist from '../hooks/watchlist/usePropertyDetailsWatchlist';
import AddVariationModal from './add-variation-modal/AddVariationModal';
import usePropertyDetails from '../hooks/property-details/usePropertyDetails';
import { ExistingWatchlistsContextProvider } from '../contexts/existing-watchlists/useExistingWatchlistsContext';
import useSolarCalculationEstimate from '../hooks/solar-calculation-estimate/useSolarCalculationEstimate';
import useCalculatorReport from '../hooks/calculator-report/useCalculatorReport';
import { CesiumComponentRef } from 'resium';
import { Viewer as CesiumViewer } from 'cesium';
import usePropertyPolygon from './property-map/hooks/usePropertyPolygon';
import usePropertyEditor from '../hooks/property-editor/usePropertyEditor';
import SamModelMap from './sam-model-map/SAMModelMap';
import { SegmentationContextProvider } from './sam-model-map/contexts/segmentation/useSegmentationContext';
import usePropertyEditorManager from '../hooks/property-editor-manager/usePropertyEditorManager';
import { PropertyEditorDetectionMode, PropertyEditorModelMode } from '../state/property-editor/PropertyEditorDefaults';
import useWindowDimensions from '../hooks/window-dimensions/useWindowDimensions';
import useToggle from '@hooks/useToggle';
import { set } from 'lodash';
import AddToWatchlistNodge from './components/add-to-watchlist-nodge/AddToWatchlistNodge';

const PropertyDetailsContent = () => {
    const viewerRef = useRef<CesiumComponentRef<CesiumViewer> | null>(null);

    const { id } = useParams();
    const { property, fetchProperty, getPropertyPropsFromId, fetchSpatialFeatureProperty } = useProperty();

    const { fetchVariations, fetchVariationById } = useVariations();
    const { isAddVariationActive, addVariationToggle, setAddVariationToggle } =
        usePropertyDetails();

    const { addToWatchlistQueue, toggleWatchlistModal } =
        usePropertyDetailsWatchlist();

    const { solarGenerationOutput, solarFinancialOutput } =
        useSolarCalculationEstimate();

    const { onGenerateReport } = useCalculatorReport();

    const { getMapSnapshotAsBase64 } = usePropertyPolygon();
    const { base64Image, setBase64Image, setBoundingBox } = usePropertyEditorManager();
    const { dimensions: screenDimensions, handleResize } = useWindowDimensions();
    const { setInitialValue, setDetectionMode } = usePropertyEditor();

    const { isActive: displayAddToWatchlistNodge, setToggle: setDisplayAddToWatchlistNodge } = useToggle();

    const { propertyEditor } = usePropertyEditor();

    const location = useLocation();

    useEffect(() => {
        if (id === undefined) {
            return;
        }

        const [propertyTypePrefix, propertyId] = getPropertyPropsFromId(`${id}`);

        if (propertyTypePrefix === PropertyTypePrefix.INVALID) {
            return;
        }

        if (propertyTypePrefix === PropertyTypePrefix.BUILDING) {
            fetchProperty(propertyId);
        }
        else {
            fetchSpatialFeatureProperty(propertyId);
        }

        // fetchVariations(propertyId);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        const observer = new MutationObserver((mutationsList, observer) => {
            const mapElement = document.getElementById('map-section');

            if (mapElement) {
                handleResize() // Element found, log or perform any actions
                observer.disconnect(); // Stop observing once the element is found
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const { variationId } = location.state || {};

        if (variationId === undefined) {
            return;
        }

        if (id === undefined) {
            return;
        }

        fetchVariationById(id, variationId);
    }, [location.state]);


    useEffect(() => {
        if (viewerRef === null) {
            return;
        }

        if (viewerRef.current === null) {
            return;
        }

        if (viewerRef.current.cesiumElement === undefined) {
            return;
        }

        viewerRef.current.cesiumElement.scene.globe.tileLoadProgressEvent.addEventListener((progress) => {
            if (progress !== 0) {
                return;
            }

            if (viewerRef === null) {
                return;
            }

            if (viewerRef.current === null) {
                return;
            }

            if (viewerRef.current.cesiumElement === undefined) {
                return;
            }

            const scene = viewerRef.current.cesiumElement.scene;
            const camera = scene.camera;
            const ellipsoid = scene.globe.ellipsoid;

            const rectangle = camera.computeViewRectangle(ellipsoid);

            if (rectangle) {
                const westLongitude = rectangle.west * (180 / Math.PI);
                const southLatitude = rectangle.south * (180 / Math.PI);
                const eastLongitude = rectangle.east * (180 / Math.PI);
                const northLatitude = rectangle.north * (180 / Math.PI);

                setBoundingBox({
                    northeast: { latitude: northLatitude, longitude: eastLongitude },
                    northwest: { latitude: northLatitude, longitude: westLongitude },
                    southeast: { latitude: southLatitude, longitude: eastLongitude },
                    southwest: { latitude: southLatitude, longitude: westLongitude },
                });
            }

            getMapSnapshotAsBase64(viewerRef, true, false)
                .then(([meta, base64]) => setBase64Image(`${meta},${base64}`))
                .catch((error) => console.error(error));

            const { variationId } = location.state || {};

            if (variationId !== undefined) {
                setInitialValue(false);
                return;
            }

            setTimeout(() => {
                setInitialValue(false);
                setDetectionMode(PropertyEditorDetectionMode.HOVER);
            }, 1200)
        });
    }, [viewerRef.current?.cesiumElement, screenDimensions]);

    useEffect(() => {
        if (!solarGenerationOutput || !solarFinancialOutput) {
            return;
        }

        setDisplayAddToWatchlistNodge(true);
    }, [solarGenerationOutput, solarFinancialOutput]);

    if (property === undefined) {
        return;
    }

    return (
        <div className="p-4 h-full">
            <div className="h-[50px] flex flex-row justify-between items-center">
                <div>
                    {/* <p className="font-semibold mb-1">{property.name}</p> */}
                    <p className="font-semibold">
                        {property.location.streetNumber &&
                            `${property.location.streetNumber} `}
                        {[
                            property.location.streetName,
                            property.location.zipCode,
                            property.location.city,
                            property.location.country
                        ]
                            .filter(
                                (addressPart) =>
                                    addressPart !== undefined &&
                                    addressPart !== null &&
                                    addressPart !== ''
                            )
                            .join(', ')}
                    </p>
                </div>
                <div className="flex flex-row">
                    {solarGenerationOutput && solarFinancialOutput && (
                        <>
                            {/* <div className="w-max text-xs mr-4">
                                <Button
                                    type="button"
                                    onClick={async () => {
                                        setMapMode(PropertyMapMode.DETAILS);
                                        const [meta, base64] =
                                            await getMapSnapshotAsBase64(
                                                viewerRef
                                            );
                                        onGenerateReport(
                                            property.osmId,
                                            `${meta},${base64}`
                                        );
                                    }}
                                    text="Generate Report"
                                />
                            </div> */}
                            <div className="w-max text-xs relative">
                                <Button
                                    type="button"
                                    onClick={addVariationToggle}
                                    text="+ Add to Watchlist"
                                />
                                {
                                    !location?.state?.variationId && (
                                        <div className='absolute w-48 p-2 transform transition-transform duration-300 ease-in-out hover:translate-x-2 bg-blue-400 text-white rounded' style={{ left: '-205px', top: '-7px' }}>
                                            <AddToWatchlistNodge />
                                        </div>
                                    )
                                }
                            </div>
                        </>
                    )}
                    {!(solarGenerationOutput && solarFinancialOutput) && (
                        <div className="w-max text-xs">
                            <Button
                                type="button"
                                onClick={() => {
                                    addToWatchlistQueue(id!);
                                    toggleWatchlistModal();
                                }}
                                text="+ Add to Watchlist"
                            />

                        </div>
                    )}
                </div>
            </div>
            <div className="proeprty-details-container flex flex-row pt-4">
                <div className="w-13/20 mr-4">
                    <div className="flex flex-col h-full">
                        <PropertyInfo />
                        <SegmentationContextProvider>
                            {
                                propertyEditor.propertyEditorModelMode === PropertyEditorModelMode.MANUAL && (
                                    <PropertyMap viewerRef={viewerRef} />
                                )
                            }
                            {
                                propertyEditor.propertyEditorModelMode === PropertyEditorModelMode.SAM && (
                                    <SamModelMap dimensions={screenDimensions} />
                                )
                            }
                        </SegmentationContextProvider>
                    </div>
                </div>
                <div className="w-7/20 h-full">
                    <PropertyCalculator />
                </div>
            </div>
            <ExistingWatchlistsContextProvider>
                <AddPropertyToWatchlistModal />
                <AddVariationModal
                    id={property.osmId === '' ? `${property.id}` : property.osmId}
                    isOpen={isAddVariationActive}
                    onClose={() => setAddVariationToggle(false)}
                    base64Image={base64Image}
                />
            </ExistingWatchlistsContextProvider>
        </div>
    );
};

export default PropertyDetailsContent;
