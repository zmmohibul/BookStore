export interface PaginatedList<T> {
  count: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  items: T[];
}
