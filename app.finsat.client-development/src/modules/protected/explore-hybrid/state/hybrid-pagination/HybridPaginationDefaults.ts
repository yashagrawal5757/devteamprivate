export type HybridPaginationType = {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    useInternalApi: boolean;
};

const HybridPaginationDefaults: HybridPaginationType = {
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
    useInternalApi: true
};

export default HybridPaginationDefaults;
