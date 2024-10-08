import { z } from "zod";

// export interface IBookBase {
//   title: string;
//   author: string;
//   publisher: string;
//   genre: string;
//   isbnNo: string;
//   numOfPages: number;
//   totalNumOfCopies: number;
// }

// export interface IBook extends IBookBase {
//   id: number;
//   availableNumOfCopies: number;
// }

export const bookBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Title must be at least 2 characters long" }),
  author: z
    .string()
    .trim()
    .min(2, { message: "Author name must be at least 2 characters long" }),
  publisher: z
    .string()
    .trim()
    .min(2, { message: "Publisher name must be at least 2 characters long" }),
  genre: z
    .string()
    .trim()
    .min(2, { message: "Genre must be at least 2 characters long" }),
  isbnNo: z
    .string()
    .length(13, { message: "ISBN Number must be exactly 13 characters long" }),
  pages: z
    .number()
    .positive({ message: "Number of pages must be a positive integer" })
    .min(1, { message: "Number of pages must be at least 1" }),
  totalCopies: z
    .number()
    .min(1, { message: "Number of pages must be at least 1" })
    .positive({ message: "Total number of copies must be a positive integer" }),
  price: z
    .number()
    .positive({ message: "Price must be a positive number" })
    .min(0, { message: "Price cannot be negative" })
    .nullable(),
  imageURL: z.string().optional().nullable(), // Adjust the minimum value as per your needs
});

export const bookSchema = bookBaseSchema.extend({
  id: z
    .number()
    .int({ message: "ID must be an integer" })
    .positive({ message: "ID must be a positive integer" }),
  availableCopies: z
    .number()
    .int({ message: "Available number of copies must be an integer" })
    .nonnegative({
      message: "Available number of copies must be a non-negative integer",
    }),
});

export type IBookBase = z.infer<typeof bookBaseSchema>;
export type IBook = z.infer<typeof bookSchema>;

export const bookBaseSchemaArray = z.array(bookBaseSchema);
export const bookSchemaArray = z.array(bookSchema);
