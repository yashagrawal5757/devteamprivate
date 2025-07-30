import usePropertyFootprintContext from '../../contexts/property-footprint/usePropertyFootprintContext';
import { PropertyFootprintActions } from '../../state/property-footprint/PropertyFootprintActions';

const usePropertyFootprint = () => {
    const propertyFootprintContext = usePropertyFootprintContext();

    const setFootprint = (footprint: Array<[number, number]>): void => {
        propertyFootprintContext.dispatch({
            type: PropertyFootprintActions.SET_INITIAL_PROPERTY_FOOTPRINT,
            payload: { data: footprint }
        });
    };

    const setFootprints = (type: 'shape' | 'obsticle', footprints: Array<Array<[number, number]>>): void => {
        const action =
            type === 'shape'
                ? PropertyFootprintActions.SET_SHAPE_FOOTPRINTS
                : PropertyFootprintActions.SET_OBSTRUCTION_FOOTPRINTS;

        propertyFootprintContext.dispatch({
            type: action,
            payload: footprints.map(footprint => ({ data: footprint }))
        });
    };

    const addFootprint = (
        type: 'shape' | 'obsticle',
        footprint: Array<[number, number]>,
        id: string | undefined = undefined
    ): void => {
        const action =
            type === 'shape'
                ? PropertyFootprintActions.INSERT_SHAPE_FOOTPRINT
                : PropertyFootprintActions.INSERT_OBSTICLE_FOOTPRINT;

        let payload: any = { data: footprint };

        if (id !== undefined) {
            payload.id = id;
        }

        propertyFootprintContext.dispatch({
            type: action,
            payload: payload
        });
    };

    const updateFootprintById = (
        type: 'shape' | 'obsticle',
        id: string,
        footprint: Array<[number, number]>
    ) => {
        const action =
            type === 'shape'
                ? PropertyFootprintActions.UPDATE_SHAPE_FOOTPRINT_BY_ID
                : PropertyFootprintActions.UPDATE_OBSTICLE_FOOTPRINT_BY_ID;

        propertyFootprintContext.dispatch({
            type: action,
            payload: { id, data: footprint }
        });
    }

    const removeFootprintById = (
        type: 'shape' | 'obsticle',
        id: string
    ): void => {
        const action =
            type === 'shape'
                ? PropertyFootprintActions.REMOVE_SHAPE_FOOTPRINT_BY_ID
                : PropertyFootprintActions.REMOVE_OBSTICLE_FOOTPRINT_BY_ID;

        propertyFootprintContext.dispatch({
            type: action,
            payload: id
        });
    }

    const clearFootprint = (type: 'shape' | 'obsticle'): void => {
        const action =
            type === 'shape'
                ? PropertyFootprintActions.CLEAR_SHAPE_FOOTPRINT
                : PropertyFootprintActions.CLEAR_OBSTICLES_FOOTPRINT;

        propertyFootprintContext.dispatch({
            type: action
        });
    };

    const removeFootprintByIndex = (
        type: 'shape' | 'obsticle',
        index: number
    ): void => {
        const action =
            type === 'shape'
                ? PropertyFootprintActions.REMOVE_AT_INDEX_SHAPE_FOOTPRINT
                : PropertyFootprintActions.REMOVE_AT_INDEX_OBSTICLE_FOOTPRINT;

        propertyFootprintContext.dispatch({
            type: action,
            payload: index
        });
    };

    const updateFootprintByIndex = (index: number, footprint: Array<[number, number]>): void => {
        propertyFootprintContext.dispatch({
            type: PropertyFootprintActions.UPDATE_SHAPE_AT_INDEX,
            payload: { index, shape: { data: footprint } }
        })
    };

    const updateObsticleByIndex = (index: number, footprint: Array<[number, number]>): void => {
        propertyFootprintContext.dispatch({
            type: PropertyFootprintActions.UPDATE_OBSTICLE_AT_INDEX,
            payload: { index, obsticle: { data: footprint } }
        })
    };

    return {
        footprint: propertyFootprintContext.state,
        setFootprint,
        setFootprints,
        addFootprint,
        updateFootprintById,
        removeFootprintById,
        clearFootprint,
        removeFootprintByIndex,
        updateFootprintByIndex,
        updateObsticleByIndex
    };
};

export default usePropertyFootprint;
