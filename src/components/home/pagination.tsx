"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  // const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (pageNumber: number | string) => {
    const url = createPageURL(pageNumber);
    router.push(url);
  };

  const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage < 3) {
      return [1, 2, 3, "...", totalPages - 1, totalPages];
    }

    if (currentPage > totalPages - 2) {
      return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex justify-center mt-8 space-x-2">
      <Button
        variant="outline"
        size="sm"
        className="bg-white hover:bg-orange-100"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {allPages.map((page, index) => (
        <PaginationButton
          key={index}
          page={page}
          isCurrent={page === currentPage}
          handlePageChange={handlePageChange}
        />
      ))}
      <Button
        variant="outline"
        size="sm"
        className="bg-white hover:bg-orange-100"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface PaginationButtonProps {
  page: number | string;
  isCurrent: boolean;
  handlePageChange: (pageNumber: number | string) => void;
}

function PaginationButton({
  page,
  isCurrent,
  handlePageChange,
}: PaginationButtonProps) {
  return typeof page === "number" ? (
    <Button
      variant={isCurrent ? "default" : "outline"}
      size="sm"
      onClick={() => handlePageChange(page)}
      className={`w-8 ${
        isCurrent
          ? "bg-orange-500 hover:bg-orange-600"
          : "bg-white hover:bg-orange-100"
      }`}
    >
      {page}
    </Button>
  ) : (
    <span key={`ellipsis${page}`} className="px-2">
      {page}
    </span>
  );
}
