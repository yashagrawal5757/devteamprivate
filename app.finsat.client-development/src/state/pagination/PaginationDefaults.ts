export type PaginationType = {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
};

const PaginationDefaults: PaginationType = {
    totalCount: 0,
    pageSize: 15,
    currentPage: 1,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false
};

const Pagination: PaginationType = PaginationDefaults;

export default Pagination;
