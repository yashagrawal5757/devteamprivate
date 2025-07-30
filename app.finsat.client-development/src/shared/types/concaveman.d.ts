declare module 'concaveman' {
    export default function concaveman(
        points: Array<[number, number]>,
        concavity?: number,
        lengthThreshold?: number
    ): Array<[number, number]>;
}
