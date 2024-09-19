"use client";

import { IBook } from "@/models/book.model";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, ArrowUpDown, BookCopy, Edit } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteBook from "./deleteBook";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SortState } from "@/lib/definition";
import { useState } from "react";

export default function BookTable({ books }: { books: IBook[] }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const [sortState, setSortState] = useState<SortState>({
    sortValue: "",
    sortAs: null,
  });

  const handleTableSelect = (term: string) => {
    let sortAs: "asc" | "desc" | null = "asc"; // Default to 'asc'

    if (sortState.sortValue === term) {
      // Cycle through 'asc' -> 'desc' -> null
      if (sortState.sortAs === "asc") sortAs = "desc";
      else if (sortState.sortAs === "desc") sortAs = null;
      else sortAs = "asc";
    }

    setSortState({ sortValue: term, sortAs });
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("sort", term);
      if (sortAs !== null) {
        params.set("sortAs", sortAs);
      } else {
        params.delete("sort");
        params.delete("sortAs");
      }
    } else {
      params.delete("sort");
      params.delete("sortAs");
    }
    replace(`${pathName}?${params.toString()}`);
  };

  const getSortIcon = (term: string) => {
    if (sortState.sortValue === term) {
      if (sortState.sortAs === "asc")
        return <ArrowUp className="ml-2 h-4 w-4" />;
      if (sortState.sortAs === "desc")
        return <ArrowDown className="ml-2 h-4 w-4" />;
    }
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  return (
    <Table>
      <TableHeader className="bg-orange-50">
        <TableRow>
          <TableHead
            className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors"
            onClick={() => handleTableSelect("title")}
          >
            <div className="flex items-center justify-center">
              Title
              {getSortIcon("title")}
            </div>
          </TableHead>
          <TableHead
            className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors"
            onClick={() => handleTableSelect("author")}
          >
            <div className="flex items-center justify-center">
              Author
              {getSortIcon("author")}
            </div>
          </TableHead>
          <TableHead
            className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors"
            onClick={() => handleTableSelect("genre")}
          >
            <div className="flex items-center justify-center">
              Genre
              {getSortIcon("genre")}
            </div>
          </TableHead>
          <TableHead
            className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors"
            onClick={() => handleTableSelect("pages")}
          >
            <div className="flex items-center justify-center">
              Pages
              {getSortIcon("pages")}
            </div>
          </TableHead>
          <TableHead
            className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors"
            onClick={() => handleTableSelect("publisher")}
          >
            <div className="flex items-center justify-center">
              Publisher
              {getSortIcon("publisher")}
            </div>
          </TableHead>
          <TableHead
            className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors"
            onClick={() => handleTableSelect("price")}
          >
            <div className="flex items-center justify-center">
              Price
              {getSortIcon("price")}
            </div>
          </TableHead>
          <TableHead
            className="font-semibold text-orange-700 cursor-pointer hover:bg-orange-100 transition-colors"
            onClick={() => handleTableSelect("availableCopies")}
          >
            <div className="flex items-center justify-center">
              Copies
              {getSortIcon("availableCopies")}
            </div>
          </TableHead>
          <TableHead className="font-semibold text-orange-700 text-center">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books?.map((book) => (
          <TableRow key={book.id} className="bg-white transition-colors">
            <TableCell className="font-medium">{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-800 font-medium"
              >
                {book.genre}
              </Badge>
            </TableCell>
            <TableCell className="text-center">{book.pages}</TableCell>
            <TableCell>{book.publisher}</TableCell>
            <TableCell className="text-right">${book.price}</TableCell>
            <TableCell>
              <div className="flex items-center justify-center">
                <BookCopy className="h-4 w-4 mr-1 text-orange-600" />
                <span>
                  {book.availableCopies}/{book.totalCopies}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-center space-x-2">
                <Link href={`/home/books/${book.id}/update`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-600 transition-colors"
                  >
                    <Edit className="h-3 w-3 mr-1" /> Edit
                  </Button>
                </Link>
                <DeleteBook book={book} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
