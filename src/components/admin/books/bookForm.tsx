"use client";

import { useToast } from "@/components/hooks/use-toast";
import { addBook, State } from "@/lib/action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

export default function BookForm() {
  const initialState: State = { message: "", errors: {} };
  const [state, formAction] = useActionState(addBook, initialState);
  const [showSuccessMessage, setSuccessMessage] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  useEffect(() => {
    if (state.message === "Success") {
      toast({
        title: "Success",
        description: "Book added successfully to the library.",
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
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
            />
            {state.errors?.title ? (
              <p className="text-red-500 text-sm">{state.errors.title}</p>
            ) : (
              <div className="min-h-6"></div>
            )}
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
            />
            {state.errors?.author ? (
              <p className="text-red-500 text-sm">{state.errors.author}</p>
            ) : (
              <div className="min-h-6"></div>
            )}
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
            />
            {state.errors?.publisher ? (
              <p className="text-red-500 text-sm">{state.errors.publisher}</p>
            ) : (
              <div className="min-h-6"></div>
            )}
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
            />
            {state.errors?.genre ? (
              <p className="text-red-500 text-sm">{state.errors.genre}</p>
            ) : (
              <div className="min-h-6"></div>
            )}
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
            />
            {state.errors?.isbn ? (
              <p className="text-red-500 text-sm">{state.errors.isbn}</p>
            ) : (
              <div className="min-h-6"></div>
            )}
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
            />
            {state.errors?.pages ? (
              <p className="text-red-500 text-sm">{state.errors.pages}</p>
            ) : (
              <div className="min-h-6"></div>
            )}
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
            />
            {state.errors?.totalCopies ? (
              <p className="text-red-500 text-sm">{state.errors.totalCopies}</p>
            ) : (
              <div className="min-h-6"></div>
            )}
          </div>
        </div>
        {state.message && state.message !== "Success" ? (
          <p className="text-red-500 text-sm mt-2">{state.message}</p>
        ) : (
          <div className="min-h-6"></div>
        )}
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
            Add Book
          </Button>
        </div>
        {/* {showSuccessMessage && <SuccessMessage />} */}
      </form>
    </>
  );
}

// const SuccessMessage = () => (
//   <Alert className="fixed bottom-4 right-4 w-96 bg-green-100 border-green-500 text-green-800 shadow-lg animate-in slide-in-from-right">
//     <CheckCircle2 className="h-4 w-4" />
//     <AlertTitle>Success</AlertTitle>
//     <AlertDescription>Book added successfully to the library.</AlertDescription>
//   </Alert>
// );
