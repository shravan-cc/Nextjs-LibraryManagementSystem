import { fetchBooks, fetchUserDetails, getGenres } from "@/lib/action";
import { IBook } from "@/models/book.model";

import BookCard from "@/components/user/bookCard";
import { BookRepository } from "@/repositories/book.repository";
import { db } from "../../../drizzle/db";

const bookRepo = new BookRepository(db);

export default async function HomePage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    genre?: string;
    sort?: string;
    price?: string;
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
  const price = searchParams?.price || "";
  const limit = 8;
  const offset = (Number(currentPage) - 1) * limit;
  const fetchedBooks = await fetchBooks(
    query,
    limit,
    offset,
    genre,
    sort,
    price
  );
  const books: IBook[] | undefined = fetchedBooks?.items;
  const totalBooks = fetchedBooks!.pagination.total;
  const genres = await getGenres();
  const totalPages = Math.ceil(totalBooks / limit);
  const user = await fetchUserDetails();
  const member = user!.userDetails;

  return (
    <>
      <BookCard
        genres={genres}
        books={books}
        member={member}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </>
  );
}
