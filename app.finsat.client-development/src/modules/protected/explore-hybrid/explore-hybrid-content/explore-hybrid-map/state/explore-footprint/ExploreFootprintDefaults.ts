export type ExploreFootprintItem = {
    id: string;
    data: Array<[number, number]>;
};

export type ExploreFootprint = {
    footprint: ExploreFootprintItem;
};

const ExploreFootprintDefaults: ExploreFootprint = {
    footprint: {
        id: '',
        data: []
    }
};

export default ExploreFootprintDefaults;
