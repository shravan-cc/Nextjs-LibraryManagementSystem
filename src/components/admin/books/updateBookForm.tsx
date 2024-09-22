"use client";

import { useToast } from "@/components/hooks/use-toast";
import { editBook, State, uploadImage } from "@/lib/action";
import { IBook } from "@/models/book.model";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import Image from "next/image";

export default function UpdateBookForm({ books }: { books: IBook | null }) {
  const updateBook = editBook.bind(null, books!.id);

  const initialState: State = { message: "", errors: {} };
  const [state, formAction] = useActionState(updateBook, initialState);
  const { toast } = useToast();
  const router = useRouter();
  const imageurl: string = books?.imageURL ? books.imageURL : "";
  const [imageURL, setImageURL] = useState<string>(imageurl);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const result = await uploadImage(file);
      setIsUploading(false);
      if (result.imageURL) {
        setImageURL(result.imageURL);
      } else if (result.error) {
        // Handle error
        console.error(result.error);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    formAction(formData);
  };

  useEffect(() => {
    if (state.message === "Success") {
      toast({
        title: "Success",
        description: "Book edited successfully from the library.",
        duration: 1500,
        className: "bg-green-100 border-green-500 text-green-800 shadow-lg",
      });
      router.push("/home/books");
    } else if (state.message && state.message !== "Success") {
      toast({
        title: "Failure",
        description: `${state.message}`,
        duration: 2000,
        className: "bg-red-100 border-red-500 text-red-800 shadow-lg",
      });
    }
  }, [state.message, toast, router]);
  return (
    <>
      <form
        onSubmit={handleSubmit}
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
              defaultValue={books!.title}
              autoCapitalize="none"
              autoCorrect="off"
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
              defaultValue={books!.author}
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
              defaultValue={books!.publisher}
              autoCapitalize="none"
              autoCorrect="off"
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
              defaultValue={books!.genre}
              autoCapitalize="none"
              autoCorrect="off"
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
              defaultValue={books!.isbnNo}
              autoCapitalize="none"
              autoCorrect="off"
            />
            {state.errors?.isbnNo ? (
              <p className="text-red-500 text-sm">{state.errors.isbnNo}</p>
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
              defaultValue={books!.pages}
              autoCapitalize="none"
              autoCorrect="off"
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
              defaultValue={books!.totalCopies}
              autoCapitalize="none"
              autoCorrect="off"
            />
            {state.errors?.totalCopies ? (
              <p className="text-red-500 text-sm">{state.errors.totalCopies}</p>
            ) : (
              <div className="min-h-6"></div>
            )}
          </div>
          <div className="row-span-2">
            <Label
              htmlFor="image"
              className="text-sm font-medium text-gray-700"
            >
              Book Cover Image
            </Label>

            <Input
              id="image"
              type="file" 
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 bg-gray-50 border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            />
            {imageURL && (
              <div className="mt-2 mb-2">
                <Image
                  src={imageURL}
                  alt="Book cover preview"
                  width={60}
                  height={60}
                  className="object-cover rounded"
                />
              </div>
            )}
            {isUploading && <p>Uploading image...</p>}
            <input type="hidden" name="imageURL" value={imageURL} />
          </div>
          <div>
            <Label
              htmlFor="price"
              className="text-sm font-medium text-gray-700"
            >
              Price
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Enter the price"
              defaultValue={books!.price!}
              className="mt-1 bg-gray-50 border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            />
            {state.errors?.price ? (
              <p className="text-red-500 text-sm">{state.errors.price}</p>
            ) : (
              <div className="min-h-6"></div>
            )}
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
