import { Button } from "@/components/ui/button";
import { fetchBooksByMember } from "@/lib/action";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import MyBooksList from "@/components/user/mybooks";

export default async function MyBooks() {
  const borrowBooks = await fetchBooksByMember();
  if (!borrowBooks) {
    throw new Error("Books not found");
  }
  const borrowedBooks = borrowBooks.filter(
    (book) => book.status === "approved"
  );

  return (
    <>
      <MyBooksList borrowedBooks={borrowedBooks} />
    </>
  );
}
