export interface OSMNode {
    id: number;
    lat: number;
    lon: number;
}

export interface BuildingInput {
    id: number;
    nodeIds: number[];
}

export interface BuildingAreaResult {
    id: number;
    area: number;
}

type TagData = {
    [key: string]: string;
};

export interface OSMBuilding {
    center: {
        lat: number;
        lon: number;
    };
    id: number;
    nodes: number[];
    tags: TagData;
    type: string;
}

export const chunkArray = <T>(arr: T[], size: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};
