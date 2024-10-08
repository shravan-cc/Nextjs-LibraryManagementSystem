import UpdateBookForm from "@/components/admin/books/updateBookForm";
import { db } from "../../../../../drizzle/db";
import { IBook } from "@/models/book.model";
import { BookRepository } from "@/repositories/book.repository";

const bookRepo = new BookRepository(db);

export default async function UpdateBook({
  params,
}: {
  params: { id: number };
}) {
  const bookId: number = Number(params.id);
  const books: IBook | null = await bookRepo.getById(bookId);
  return (
    <>
      <div className="space-y-4 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-800">Edit Book</h2>
        <UpdateBookForm books={books} />
      </div>
    </>
  );
}
