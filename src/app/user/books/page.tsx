import Pagination from "@/components/home/pagination";
import SearchBar from "@/components/home/search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { fetchBooks, fetchUserDetails, getGenres } from "@/lib/action";
import { IBook } from "@/models/book.model";

import { ArrowLeftCircle, BookCopy, Users } from "lucide-react";

import FilterGenre from "@/components/admin/books/filterGenre";
import SortBooks from "@/components/admin/books/sortBooks";
import IssueBook from "@/components/user/issueBook";
import { db } from "@/lib/db";
import { BookRepository } from "@/repositories/book.repository";
import ReturnBook from "@/components/user/returnBook";

const bookRepo = new BookRepository(db);

export default async function HomePage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    genre?: string;
    sort?: string;
  };
}) {
  const query: string = searchParams?.query || "";
  const currentPage = searchParams!.page || 1;
  const genre: string = searchParams!.genre || "";
  const sortBooksBy: string = searchParams!.sort || "";
  const limit = 8;
  const offset = (Number(currentPage) - 1) * limit;
  const fetchedBooks = await fetchBooks(
    query,
    limit,
    offset,
    genre,
    sortBooksBy
  );
  const books: IBook[] | undefined = fetchedBooks?.items;
  const totalBooks = fetchedBooks!.pagination.total;
  const genres = await getGenres();
  const totalPages = Math.ceil(totalBooks / limit);
  const user = await fetchUserDetails();
  const member = user!.userDetails;

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <div className="flex-grow sm:flex-grow-0">
            <SearchBar type="Books" />
          </div>
          <SortBooks />
          <FilterGenre genres={genres} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books?.map((book) => (
            <Card
              key={book.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <div className="bg-CustomOrange h-1 w-full"></div>
              <CardHeader className="p-4 pb-2">
                <h3 className="font-bold text-sm line-clamp-1">{book.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {book.author}
                </p>
              </CardHeader>
              <CardContent className="p-4 pt-2 pb-0">
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className="text-xs truncate mr-2 max-w-[70%]"
                  >
                    {book.genre}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs whitespace-nowrap"
                  >
                    {book.pages} pages
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mb-1 line-clamp-1">
                  <span className="font-semibold">Publisher:</span>{" "}
                  {book.publisher}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <BookCopy className="h-3 w-3 mr-1" />
                    <span>
                      {book.availableCopies}/{book.totalCopies}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    <span>
                      {book.totalCopies - book.availableCopies} borrowed
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-2 bg-orange-50 flex justify-between">
                <IssueBook book={book} member={member} />
                <ReturnBook book={book} member={member} />
              </CardFooter>
            </Card>
          ))}
        </div>
        <Pagination totalPages={totalPages} currentPage={Number(currentPage)} />
      </div>
    </>
  );
}
