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

export default async function MyBooks() {
  const borrowBooks = await fetchBooksByMember();
  if (!borrowBooks) {
    throw new Error("Books not found");
  }
  const borrowedBooks = borrowBooks.filter(
    (book) => book.status === "approved"
  );

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };
  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-orange-800">My Books</h2>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader className="bg-orange-50">
              <TableRow>
                <TableHead className="font-semibold text-orange-700">
                  Title
                </TableHead>
                <TableHead className="font-semibold text-orange-700">
                  Author
                </TableHead>
                <TableHead className="font-semibold text-orange-700">
                  Borrowed Date
                </TableHead>
                <TableHead className="font-semibold text-orange-700">
                  Due Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrowedBooks.map((book) => (
                <TableRow
                  key={book.id}
                  className={` bg-white transition-colors ${
                    isOverdue(book.dueDate!) ? "bg-red-50" : ""
                  }`}
                >
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.borrowDate}</TableCell>
                  <TableCell>
                    <span
                      className={
                        isOverdue(book.dueDate!)
                          ? "text-red-600 font-semibold"
                          : ""
                      }
                    >
                      {book.dueDate}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {borrowedBooks!.length === 0 && (
          <p className="text-center text-CustomDarkOrange mt-4">
            No books found.
          </p>
        )}
      </div>
    </>
  );
}
