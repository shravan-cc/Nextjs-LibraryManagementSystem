import Pagination from "@/components/home/pagination";
import SearchBar from "@/components/home/search";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { fetchBooks, fetchUserDetails, getGenres } from "@/lib/action";
import { IBook } from "@/models/book.model";

import {
  BookCopy,
  BookOpen,
  Building,
  Hash,
  InfoIcon,
  Users,
} from "lucide-react";

import FilterGenre from "@/components/admin/books/filterGenre";
import SortBooks from "@/components/admin/books/sortBooks";
import IssueBook from "@/components/user/issueBook";
import { db } from "@/lib/db";
import { BookRepository } from "@/repositories/book.repository";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Separator } from "@/components/ui/separator";

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
  const sortAs =
    sortBooksBy === "availableCopies"
      ? ("desc" as "asc" | "desc")
      : ("asc" as "asc" | "desc");
  const sort = {
    sortValue: sortBooksBy,
    sortAs: sortAs,
  };
  const limit = 8;
  const offset = (Number(currentPage) - 1) * limit;
  const fetchedBooks = await fetchBooks(query, limit, offset, genre, sort);
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
            <Dialog key={book.id}>
              <DialogTrigger asChild>
                <Card
                  key={book.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white flex h-[250px] hover:cursor-pointer"
                >
                  <div className="w-2/5 relative">
                    {book.imageURL ? (
                      <Image
                        src={book.imageURL}
                        alt={`Cover of ${book.title}`}
                        layout="fill"
                        objectFit="contain cover"
                        className="h-full w-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
                        <BookOpen className="h-16 w-16 text-orange-500" />
                      </div>
                    )}
                  </div>
                  <CardContent className="w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold line-clamp-3 mb-3">
                        {book.title}
                      </h3>
                      <p className="text-base text-muted-foreground mb-4 line-clamp-2">
                        {book.author}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-orange-600">
                        ${book.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
                <div className="flex h-[500px]">
                  <div className="w-1/2 relative">
                    {book.imageURL ? (
                      <Image
                        src={book.imageURL}
                        alt={`Cover of ${book.title}`}
                        layout="fill"
                        objectFit="cover contain"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 p-4 text-center">
                        <BookOpen className="h-24 w-24 text-orange-500 mb-4" />
                        <h3 className="font-bold text-xl">{book.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {book.author}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="w-1/2 p-6 overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-orange-600 mb-2">
                        {book.title}
                      </DialogTitle>
                      <p className="text-sm text-gray-600 italic">
                        by {book.author}
                      </p>
                    </DialogHeader>
                    <Separator className="my-4" />
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {book.genre}
                        </Badge>
                        <span className="text-sm text-gray-600">•</span>
                        <span className="text-sm text-gray-600">
                          {book.pages} pages
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium">
                          {book.publisher}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Hash className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium">
                          ISBN: {book.isbnNo}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <BookCopy className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">
                            {book.availableCopies} of {book.totalCopies}{" "}
                            available
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">
                            {book.totalCopies - book.availableCopies} borrowed
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">
                          ${book.price}
                        </span>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <DialogFooter>
                      <IssueBook book={book} member={member} />
                    </DialogFooter>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        <Pagination totalPages={totalPages} currentPage={Number(currentPage)} />
      </div>
    </>
  );
}
