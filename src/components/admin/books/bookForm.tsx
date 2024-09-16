"use client";

import { useToast } from "@/components/hooks/use-toast";
import { addBook, State } from "@/lib/action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import axios from "axios";

export default function BookForm() {
  const initialState: State = { message: "", errors: {} };
  const [state, formAction] = useActionState(addBook, initialState);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    console.log(state.message);
    if (state.message === "Success") {
      toast({
        title: "Success",
        description: "Book added successfully to the library.",
        duration: 2000,
        className: "bg-green-100 border-green-500 text-green-800 shadow-lg",
      });
      router.push("/home/books");
    } else if (state.message && state.message !== "Success") {
      toast({
        title: "Failure",
        description: `${state.message}`,
        duration: 5000,
        className: "bg-red-100 border-red-500 text-red-800 shadow-lg",
      });
    }
  }, [state.message, toast, router]);

  // const uploadImageToCloudinary = async () => {
  //   if (!imageFile) return null;
  //   const formData = new FormData();
  //   formData.append("file", imageFile);
  //   formData.append("upload_preset", "book_images");
  //   try {
  //     const response = await axios.post(
  //       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
  //       formData
  //     );
  //     console.log(
  //       `Response:${response} data:${response.data} url:${response.data.secure_url}`
  //     );
  //     return response.data.secure_url;
  //   } catch (error) {
  //     console.error("Image Upload Failed", error);
  //     return null;
  //   }
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const imageURL = await uploadImageToCloudinary();
  //   if (!imageURL) {
  //     formData.append("image", imageURL);
  //   }
  //   formAction(formData);
  // };

  return (
    <>
      <form
        // onSubmit={handleSubmit}
        action={formAction}
        method="post"
        encType="multipart/form-data"
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
          <div>
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
              className="mt-1 bg-gray-50 border border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
        {/* {state.message && state.message !== "Success" ? (
          <p className="text-red-500 text-sm mt-2">{state.message}</p>
        ) : (
          <div className="min-h-6"></div>
        )} */}
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
