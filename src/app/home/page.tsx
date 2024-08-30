import Home from "@/components/homePage";
import { fetchBooks } from "@/lib/action";
import { IBook } from "@/models/book.model";

export default async function HomePage() {
  const books: IBook[] | undefined = await fetchBooks();
  return (
    <>
      <Home books={books} />
    </>
  );
}
