export interface PaginatedResult<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
    totalRecords: number;
}
