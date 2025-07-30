import { CartesianCoordinate } from '@hooks/useGeometry';
import _ from 'lodash';
import React, { useMemo } from 'react'

const useThrottledMouseDown = <T extends HTMLElement>(
    handler: (e: React.MouseEvent<T>, boundingBox: { northeast: CartesianCoordinate, northwest: CartesianCoordinate, southeast: CartesianCoordinate, southwest: CartesianCoordinate } | undefined, dimensions: { width: number, height: number }) => void,
    boundingBox: { northeast: CartesianCoordinate, northwest: CartesianCoordinate, southeast: CartesianCoordinate, southwest: CartesianCoordinate } | undefined,
    dimensions: { width: number, height: number },
    delay = 15
) => {
    const throttledHandler = useMemo(() => {
        return _.throttle(
            (e: React.MouseEvent<T>) => {
                handler(e, boundingBox, dimensions);
            },
            delay,
            { trailing: true, leading: true }
        );
    }, [handler, boundingBox, dimensions, delay]);

    return throttledHandler;
}

export default useThrottledMouseDown