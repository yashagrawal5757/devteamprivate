import { IReducerAction } from '@models/IReducerAction';
import ReducerType from '../../../../../shared/types/ReducerType';
import { PropertyFootprint } from './PropertyFootprintDefaults';
import { PropertyFootprintActions } from './PropertyFootprintActions';
import { generateUuid } from '@services/cryptoUtils';
import _ from 'lodash';

const PropertyFootprintReducer: ReducerType<
    PropertyFootprint,
    IReducerAction
> = (state: PropertyFootprint, action: IReducerAction) => {
    switch (action.type) {
        case PropertyFootprintActions.SET_SHAPE_FOOTPRINTS:
            return {
                ...state,
                shapes: action.payload.map(
                    (shape: any) => ({ id: generateUuid(), ...shape })
                )
            }
        case PropertyFootprintActions.SET_OBSTRUCTION_FOOTPRINTS:
            return {
                ...state, obsticles: action.payload.map(
                    (obsticle: any) => ({ id: generateUuid(), ...obsticle })
                )
            }
        case PropertyFootprintActions.SET_SHAPE_FOOTPRINT:
            return {
                ...state,
                shapes: [
                    { id: generateUuid(), ...action.payload }
                ]
            };
        case PropertyFootprintActions.INSERT_SHAPE_FOOTPRINT:
            return {
                ...state,
                shapes: [
                    ...state.shapes,
                    { id: generateUuid(), ...action.payload }
                ]
            };
        case PropertyFootprintActions.REMOVE_AT_INDEX_SHAPE_FOOTPRINT:
            return {
                ...state,
                shapes: state.shapes.filter(
                    (_, index) => index !== action.payload
                )
            };
        case PropertyFootprintActions.CLEAR_SHAPE_FOOTPRINT:
            return {
                ...state,
                shapes: []
            };
        case PropertyFootprintActions.SET_OBSTICLES_FOOTPRINT:
            return {
                ...state,
                obsticles: [
                    { id: generateUuid(), ...action.payload }
                ]
            };
        case PropertyFootprintActions.INSERT_OBSTICLE_FOOTPRINT:
            return {
                ...state,
                obsticles: [
                    ...state.obsticles,
                    { id: generateUuid(), ...action.payload }
                ]
            };
        case PropertyFootprintActions.REMOVE_AT_INDEX_OBSTICLE_FOOTPRINT:
            return {
                ...state,
                obsticles: state.obsticles.filter(
                    (_, index) => index !== action.payload
                )
            };
        case PropertyFootprintActions.CLEAR_OBSTICLES_FOOTPRINT:
            return {
                ...state,
                obsticles: []
            };
        case PropertyFootprintActions.SET_INITIAL_PROPERTY_FOOTPRINT:
            return {
                shapes: [
                    { id: generateUuid(), ...action.payload }
                ],
                obsticles: []
            };
        case PropertyFootprintActions.UPDATE_SHAPE_AT_INDEX:
            return {
                ...state,
                shapes: state.shapes.map((shape, index) => {
                    if (index === action.payload.index) {
                        return { ...shape, ...action.payload.shape };
                    }

                    return shape;
                })
            }
        case PropertyFootprintActions.UPDATE_SHAPE_FOOTPRINT_BY_ID:
            return {
                ...state,
                shapes: state.shapes.map((shape) => {
                    if (shape.id === action.payload.id) {
                        return action.payload;
                    }

                    return shape;
                })
            }
        case PropertyFootprintActions.REMOVE_SHAPE_FOOTPRINT_BY_ID:
            return {
                ...state,
                shapes: _.cloneDeep(state.shapes).filter((shape) => shape.id !== action.payload)
            }
        case PropertyFootprintActions.UPDATE_OBSTICLE_AT_INDEX:
            return {
                ...state,
                obsticles: state.obsticles.map((obsticle, index) => {
                    if (index === action.payload.index) {
                        return { ...obsticle, ...action.payload.obsticle };
                    }

                    return obsticle;
                })
            }
        case PropertyFootprintActions.UPDATE_OBSTICLE_FOOTPRINT_BY_ID:
            return {
                ...state,
                obsticles: state.obsticles.map((obsticle) => {
                    if (obsticle.id === action.payload.id) {
                        return action.payload;
                    }

                    return obsticle;
                })
            }
        case PropertyFootprintActions.REMOVE_OBSTICLE_FOOTPRINT_BY_ID:
            return {
                ...state,
                obsticles: _.cloneDeep(state.obsticles).filter((obsticle) => obsticle.id !== action.payload)
            }
        default:
            return state;
    }
};

export default PropertyFootprintReducer;
