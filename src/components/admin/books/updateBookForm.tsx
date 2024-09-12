"use client";

import { useToast } from "@/components/hooks/use-toast";
import { editBook, State } from "@/lib/action";
import { IBook } from "@/models/book.model";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useActionState,
  useEffect
} from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

export default function UpdateBookForm({ books }: { books: IBook | null }) {
  const updateBook = editBook.bind(null, books!.id);

  const initialState: State = { message: "", errors: {} };
  const [state, formAction] = useActionState(updateBook, initialState);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state.message === "Success") {
      toast({
        title: "Success",
        description: "Book edited successfully from the library.",
        duration: 1500,
        className: "bg-green-100 border-green-500 text-green-800 shadow-lg",
      });
      router.push("/home/books");
    }
  }, [state.message, toast, router]);
  return (
    <>
      <form
        action={formAction}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter book title"
              className="mt-1 bg-gray-50 border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              defaultValue={books!.title}
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <div>
            <Label
              htmlFor="author"
              className="text-sm font-medium text-gray-700"
            >
              Author
            </Label>
            <Input
              id="author"
              name="author"
              placeholder="Enter author name"
              className="mt-1 bg-gray-50 border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              defaultValue={books!.author}
            />
          </div>
          <div>
            <Label
              htmlFor="publisher"
              className="text-sm font-medium text-gray-700"
            >
              Publisher
            </Label>
            <Input
              id="publisher"
              name="publisher"
              placeholder="Enter publisher name"
              className="mt-1 bg-gray-50 border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              defaultValue={books!.publisher}
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <div>
            <Label
              htmlFor="genre"
              className="text-sm font-medium text-gray-700"
            >
              Genre
            </Label>
            <Input
              id="genre"
              name="genre"
              placeholder="Enter genre"
              className="mt-1 bg-gray-50 border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              defaultValue={books!.genre}
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <div>
            <Label htmlFor="isbn" className="text-sm font-medium text-gray-700">
              ISBN Number
            </Label>
            <Input
              id="isbn"
              name="isbn"
              placeholder="Enter ISBN number"
              className="mt-1 bg-gray-50 border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              defaultValue={books!.isbnNo}
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <div>
            <Label
              htmlFor="pages"
              className="text-sm font-medium text-gray-700"
            >
              Number of Pages
            </Label>
            <Input
              id="pages"
              name="pages"
              type="number"
              placeholder="Enter number of pages"
              className="mt-1 bg-gray-50 border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              defaultValue={books!.pages}
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <div>
            <Label
              htmlFor="totalCopies"
              className="text-sm font-medium text-gray-700"
            >
              Total Copies
            </Label>
            <Input
              id="totalCopies"
              name="totalCopies"
              type="number"
              placeholder="Enter total copies"
              className="mt-1 bg-gray-50 border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              defaultValue={books!.totalCopies}
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Link href="/home/books">
            <Button
              type="button"
              variant="outline"
              className="bg-white hover:bg-gray-100 text-gray-800"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Edit Book
          </Button>
        </div>
      </form>
    </>
  );
}
