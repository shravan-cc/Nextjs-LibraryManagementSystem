export interface GoogleAuthProps {
  buttonLabel: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export interface PaginationButtonProps {
  page: number | string;
  isCurrent: boolean;
  handlePageChange: (pageNumber: number | string) => void;
}
