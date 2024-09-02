import Home from "@/components/homePage";
import { fetchBooks } from "@/lib/action";
import { IBook } from "@/models/book.model";
import SignOut from "../../components/auth/signout";

export default async function HomePage() {
  const books: IBook[] | undefined = await fetchBooks();
  return (
    <>
      <Home books={books}>
        <SignOut></SignOut>
      </Home>
    </>
  );
}
