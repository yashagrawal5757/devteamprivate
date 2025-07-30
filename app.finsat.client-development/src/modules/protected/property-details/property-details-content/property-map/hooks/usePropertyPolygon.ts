import { useState } from 'react';
import usePropertyEditorApi from 'modules/protected/property-details/hooks/property-editor/usePropertyEditorApi';
import useLoading from '@hooks/useLoading';
import useSolarEstimateInputContext from 'modules/protected/property-details/contexts/solar-estimate-input/useSolarEstimateInputContext';
import { SolarEstimateInputActions } from 'modules/protected/property-details/state/solar-estimate-input/SolarEstimateInputActions';
import { AreaConfigurationType } from '@enums/AreaConfigurationType';
import useError from '@hooks/useError';
import { AxiosResponse } from 'axios';
import usePropertyFootprint from 'modules/protected/property-details/hooks/property-footprint/usePropertyFootprint';
import useWarning from '@hooks/useWarning';
import useSuccess from '@hooks/useSuccess';
import usePropertyMap from './usePropertyMap';
import useGeometry, { CartesianCoordinate } from '@hooks/useGeometry';
import { generateUuid } from '@services/cryptoUtils';
import { PropertyEditorStackAction } from 'modules/protected/property-details/state/property-editor-actions-stack/PropertyEditorActionsStackDefaults';
import usePropertyEditorActionsStack from 'modules/protected/property-details/hooks/property-editor/usePropertyEditorActionsStack';
import useEstimatedArea from '../../../hooks/estimated-area/useEstimatedArea';

const usePropertyPolygon = () => {
    const [isAILoading, setIsAILoading] = useState<boolean>(false);
    const loading = useLoading();
    const error = useError();
    const warning = useWarning();
    const success = useSuccess();
    const geometry = useGeometry();
    const propertyEditorApi = usePropertyEditorApi();
    const { footprint, addFootprint, clearFootprint } = usePropertyFootprint();
    const { moveCameraToLocationByFootprint } = usePropertyMap();
    const { pushActionToStack, emptyStack } = usePropertyEditorActionsStack();
    const { setEstimatedArea } = useEstimatedArea();

    const solarEstimateInputContext = useSolarEstimateInputContext();
    const solarEstimateInput = solarEstimateInputContext.state;

    const calculateAvailableSpace = (): void => {
        loading.load();

        const {shapes, obsticles} = footprint;

        propertyEditorApi
            .calculateAvailableSpace({ shapes, obsticles })
            .then((response) => {
                const { data } = response;
                const { availableSpace } = data;

                setEstimatedArea(availableSpace);

                solarEstimateInputContext.dispatch({
                    type: SolarEstimateInputActions.SET_SOLAR_PANEL_INPUTS,
                    payload: {
                        ...solarEstimateInput.solarPanelMetrics,
                        areaConfigurationType: AreaConfigurationType.BY_AREA,
                        areaConfigurationValue: parseFloat(availableSpace.toFixed(2)),
                        totalAvailableSpace: parseFloat(availableSpace.toFixed(2))
                    }
                });

                success.setSuccessMessage(
                    'Changes applied to Solar Panel Performance Calculator'
                );
            })
            .catch((e) => {
                console.error('ERROR ON CALCULATING', e);
            })
            .finally(() => {
                loading.loaded();
            });
    };

    const detectObsticles = async (
        viewerRef: any,
        footprint: Array<Array<[number, number]>>
    ) => {
        const { scene } = viewerRef.current.cesiumElement;

        const [_, base64Data] = await getMapSnapshotAsBase64(viewerRef, true, true);

        const coordinates = geometry.ellipsoidToCartesianCoordinates(
            scene.camera,
            scene.globe.ellipsoid
        );

        if (!coordinates) {
            return;
        }

        const [northwest, northeast, southwest, southeast, height] =
            coordinates;

        // const position = scene.camera.positionCartographic;
        setIsAILoading(true);

        propertyEditorApi
            .detectObsticles(base64Data, footprint, {
                northeast,
                northwest,
                southeast,
                southwest
            })
            .then(
                (
                    response: AxiosResponse<
                        Record<string, Array<Array<[number, number]>>>
                    >
                ) => {
                    const { data } = response;
                    const { obstructions } = data;

                    clearFootprint('obsticle');

                    if (obstructions.length === 0) {
                        warning.setWarningMessage('No obstructions found');
                        return;
                    }

                    for (const obstruction of obstructions) {
                        const obstructionId = generateUuid();

                        addFootprint('obsticle', obstruction, obstructionId);
                        pushActionToStack({ id: obstructionId, data: obstruction }, PropertyEditorStackAction.ADD_OBSTRUCTION);
                    }
                }
            )
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                setIsAILoading(false);
            });
    };

    const detectObstructionByImage = async (base64Image: string, boundingBox: { northeast: CartesianCoordinate, northwest: CartesianCoordinate, southeast: CartesianCoordinate, southwest: CartesianCoordinate }) => {
        setIsAILoading(true);

        propertyEditorApi
            .detectObsticles(base64Image, footprint.shapes.map(shape => shape.data), boundingBox)
            .then(
                (
                    response: AxiosResponse<
                        Record<string, Array<Array<[number, number]>>>
                    >
                ) => {
                    const { data } = response;
                    const { obstructions } = data;

                    clearFootprint('obsticle');

                    if (obstructions.length === 0) {
                        warning.setWarningMessage('No obstructions found');
                        return;
                    }

                    for (const obstruction of obstructions) {
                        const obstructionId = generateUuid();

                        addFootprint('obsticle', obstruction, obstructionId);
                        pushActionToStack({ id: obstructionId, data: obstruction }, PropertyEditorStackAction.ADD_OBSTRUCTION);
                    }
                }
            )
            .catch((e) => {
                error.parseAndSetErrorMessage(e);
            })
            .finally(() => {
                setIsAILoading(false);
            });
    }

    const getMapSnapshotAsBase64 = async (
        viewerRef: any,
        isMLSnapshot: boolean = false,
        zoomToFootprint: boolean = true
    ): Promise<[string, string]> => {
        const { scene, entities } = viewerRef.current.cesiumElement;

        if (zoomToFootprint && footprint.shapes.length > 0) {
            moveCameraToLocationByFootprint(viewerRef, footprint.shapes.map(shape => shape.data));
        }

        if (isMLSnapshot) {
            entities.show = false;

            scene.requestRender();

            await new Promise((resolve) => setTimeout(resolve, 100));
        }

        scene.render();
        const [meta, base64Data] = scene.canvas.toDataURL().split(',');

        entities.show = true;

        const mimeMatch = meta.match(
            /^data:(image\/(png|jpeg|jpg|tiff));base64$/
        );
        if (!mimeMatch) {
            throw new Error('Unsupported or invalid image type');
        }

        return [meta, base64Data];
    };

    return {
        isAILoading,
        detectObsticles,
        detectObstructionByImage,
        calculateAvailableSpace,
        getMapSnapshotAsBase64
    };
};

export default usePropertyPolygon;
