export type MultiPaginationType = {
    id: string;
    pagination: PaginationType;
};

type PaginationType = {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
};

export const PaginationDefaults: PaginationType = {
    totalCount: 0,
    pageSize: 300,
    currentPage: 1,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false
};

const MultiPaginationDefaults: Array<MultiPaginationType> = [];

export default MultiPaginationDefaults;
