/*
 (c) 2017, Vladimir Agafonkin
 Simplify.js, a high-performance JS polyline simplification library
 mourner.github.io/simplify-js
*/

export function getSquareDistance(p1: { x: number, y: number }, p2: { x: number, y: number }): number {
    return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
}

export function getSquareSegmentationDistance(p: { x: number, y: number }, p1: { x: number, y: number }, p2: { x: number, y: number }): number {
    let x = p1.x,
        y = p1.y,
        dx = p2.x - x,
        dy = p2.y - y;

    if (dx !== 0 || dy !== 0) {
        let t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);

        if (t > 1) {
            x = p2.x;
            y = p2.y;
        }
        else if (t > 0) {
            x += dx * t;
            y += dy * t;
        }
    }

    dx = p.x - x;
    dy = p.y - y;

    return dx * dx + dy * dy;
}

export function simplifyRadialDistance(points: { x: number, y: number }[], sqTolerance: number): { x: number, y: number }[] {
    let prevPoint = points[0],
        newPoints = [prevPoint],
        point;

    for (let i = 1, len = points.length; i < len; i++) {
        point = points[i];

        if (getSquareDistance(point, prevPoint) > sqTolerance) {
            newPoints.push(point);
            prevPoint = point;
        }
    }

    if (prevPoint !== point && point !== undefined) {
        newPoints.push(point)
    };

    return newPoints;
}

export function simplifyDPStep(points: { x: number, y: number }[], first: number, last: number, sqTolerance: number, simplified: { x: number, y: number }[]): void {
    let maxSquareDistance = sqTolerance,
        index: any;

    for (let i = first + 1; i < last; i++) {
        let squareDistance = getSquareSegmentationDistance(points[i], points[first], points[last]);

        if (squareDistance > maxSquareDistance) {
            index = i;
            maxSquareDistance = squareDistance;
        }
    }

    if (maxSquareDistance > sqTolerance) {
        if (index - first > 1) {
            simplifyDPStep(points, first, index, sqTolerance, simplified);
        }

        simplified.push(points[index]);

        if (last - index > 1) {
            simplifyDPStep(points, index, last, sqTolerance, simplified);
        }
    }
}

export function simplifyDouglasPeucker(points: { x: number, y: number }[], sqTolerance: number): { x: number, y: number }[] {
    let last = points.length - 1;

    let simplified = [points[0]];
    simplifyDPStep(points, 0, last, sqTolerance, simplified);
    simplified.push(points[last]);

    return simplified;
}

export function simplify(points: { x: number, y: number }[], tolerance: number, highestQuality: boolean): { x: number, y: number }[] {
    if (points.length <= 2) {
        return points;
    }

    let squareTolerance = tolerance !== undefined ? tolerance * tolerance : 1;

    points = highestQuality ? points : simplifyRadialDistance(points, squareTolerance);
    points = simplifyDouglasPeucker(points, squareTolerance);

    return points;
}

