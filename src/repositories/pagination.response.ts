export interface IPagedResponse<T> {
  items: T[];
  pagination: {
    offset: number;
    limit: number;
    total: number;
  };
}

export interface IPageRequest {
  genre?: string;
  search?: string;
  sort?: {
    sortValue: string;
    sortAs: "asc" | "desc";
  };
  status?: string;
  offset: number;
  limit: number;
}
