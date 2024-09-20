"use server";

import {
  BookTable,
  RequestTransactionTable,
  TransactionTable,
} from "@/drizzle/schema";
import { bookBaseSchema } from "@/models/book.model";
import {
  editMemberSchema,
  IMemberBase,
  memberBaseSchema,
} from "@/models/member.model";
import { BookRepository } from "@/repositories/book.repository";
import { MemberRepository } from "@/repositories/member.repository";
import { TransactionRepository } from "@/repositories/transaction.repository";
import bcrypt from "bcryptjs";
import { and, eq, ne } from "drizzle-orm";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { auth, signIn } from "../auth";
import { db } from "../drizzle/db";
import cloudinary from "./cloudinary";

const memberRepo = new MemberRepository(db);
const bookRepo = new BookRepository(db);
const transactionRepo = new TransactionRepository(db);

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface State {
  errors?: { [key: string]: string[] };
  message?: string;
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log("Success");

    const result = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });
    const email = formData.get("email");
    const userDetails = await memberRepo.getByEmail(email as string);
    const userRole = userDetails!.role;
    console.log(userRole);
    if (userRole === "admin") {
      redirect("/home");
    }
    redirect("/user");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function uploadImage(file: File) {
  if (!file) return { imageURL: "" };

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "book_covers" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      const reader = file.stream().getReader();
      const pump = async () => {
        const { done, value } = await reader.read();
        if (done) {
          uploadStream.end();
        } else {
          uploadStream.write(value);
          pump();
        }
      };
      pump();
    });

    if (result && typeof result === "object" && "secure_url" in result) {
      return { imageURL: result.secure_url as string };
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return { error: "Failed to upload image. Please try again." };
  }

  return { imageURL: "" };
}

export async function addBook(prevState: State, formData: FormData) {
  console.log("In add Book function");
  const validateFields = bookBaseSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    publisher: formData.get("publisher"),
    genre: formData.get("genre"),
    isbnNo: formData.get("isbn"),
    pages: Number(formData.get("pages")),
    totalCopies: Number(formData.get("totalCopies")),
    price: Number(formData.get("price")),
  });

  const imageURL = formData.get("imageURL") as string;
  console.log("URL", imageURL);

  if (!validateFields.success) {
    console.log("Failure");
    console.log(validateFields.error.flatten().fieldErrors);
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const { title, author, publisher, isbnNo, pages, totalCopies, genre, price } =
    validateFields.data;

  if (
    !title ||
    !author ||
    !publisher ||
    !isbnNo ||
    !pages ||
    !totalCopies ||
    !price
  ) {
    console.log("All fields are required");
    return { message: "All Fields are required" };
  }

  try {
    const existingBook = await bookRepo.getByIsBnNo(isbnNo);
    if (existingBook) {
      console.log("Book already exists.");
      return { message: "Book already exists." };
    }

    const createdBook = await bookRepo.create({
      title,
      author,
      publisher,
      genre,
      isbnNo,
      pages,
      totalCopies,
      price,
      imageURL,
    });
    console.log(`Book ${createdBook.title} created successfully!`);
    return { message: "Success" };
  } catch (error) {
    console.log("Error during registration:", error);
    return { message: "Error during registration:" };
  }
}

export async function editBook(
  id: number,
  prevState: State,
  formData: FormData
) {
  console.log("In add Book function");
  const validateFields = bookBaseSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    publisher: formData.get("publisher"),
    genre: formData.get("genre"),
    isbnNo: formData.get("isbn"),
    pages: Number(formData.get("pages")),
    totalCopies: Number(formData.get("totalCopies")),
    price: Number(formData.get("price")),
  });

  const imageURL = formData.get("imageURL") as string;
  console.log("URL", imageURL);

  if (!validateFields.success) {
    console.log("Failure");
    console.log(validateFields.error.flatten().fieldErrors);
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const { title, author, publisher, isbnNo, pages, totalCopies, genre, price } =
    validateFields.data;

  if (
    !title ||
    !author ||
    !publisher ||
    !isbnNo ||
    !pages ||
    !totalCopies ||
    !genre ||
    !price
  ) {
    console.log("All fields are required");
    return { message: "All Fields are required" };
  }

  try {
    const editedBook = await bookRepo.update(id, {
      title,
      author,
      publisher,
      genre,
      isbnNo,
      pages,
      totalCopies,
      price,
      imageURL,
    });
    console.log(`Book ${editedBook!.title} edited successfully!`);
    return { message: "Success" };
  } catch (error) {
    console.log("Error during registration:", error);
    return { message: "Error during registration:", error };
  }
}

export async function registerUser(prevState: State, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const validateFields = memberBaseSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: Number(formData.get("phone")),
    address: formData.get("address"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role") || "user",
  });
  if (!validateFields.success) {
    console.log("Failure");
    console.log(validateFields.error.flatten().fieldErrors);
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const { firstName, lastName, phone, address, email, password, role } =
    validateFields.data;

  const confirmPassword = formData.get("confirmPassword");

  if (!firstName || !lastName || !phone || !address || !email || !password) {
    console.log("All fields are required");
    return { message: "All Fields are required" };
  }

  if (password !== confirmPassword) {
    console.log("Passwords do not match");
    return { message: "Passwords do not match." };
  }
  try {
    const existingUser = await memberRepo.getByEmail(email);
    if (existingUser) {
      console.log("User already exists.");
      return { message: "User already exists." };
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser: IMemberBase = {
      firstName,
      lastName,
      phone,
      address,
      role,
      email,
      password: hashedPwd,
    };

    const createdUser = await memberRepo.create(newUser);

    console.log(`User ${createdUser.email} created successfully!`);
    return { message: "Success" };
  } catch (error) {
    console.log("Error during registration:", error);
    return { message: "Error during registration:" };
  }
}

export async function editMember(prevState: State, formData: FormData) {
  console.log("In edit Member");
  const validateFields = editMemberSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: Number(formData.get("phone")),
    address: formData.get("address"),
    email: formData.get("email"),
    role: "user",
  });

  if (!validateFields.success) {
    console.log("Failure");
    console.log(validateFields.error.flatten().fieldErrors);
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const { firstName, lastName, phone, address, email, role } =
    validateFields.data;

  if (!firstName || !lastName || !phone || !address || !email) {
    console.log("All fields are required");
    return { message: "All Fields are required" };
  }
  try {
    const existingUser = await memberRepo.getByEmail(email);
    const editedMember = await memberRepo.update(
      existingUser!.id,
      validateFields.data
    );
    console.log(`Member ${editedMember!.firstName} edited successfully!`);
    return { message: "Success" };
  } catch (error) {
    console.log("Error during editing profile:", error);
    return { message: "Error during editing profile:", error };
  }
}

export async function fetchBooks(
  search: string,
  limit: number,
  offset: number,
  genre?: string,
  sort?: {
    sortValue: string;
    sortAs: "asc" | "desc";
  },
  price?: string
) {
  try {
    const books = await bookRepo.list({
      search: search,
      limit: limit,
      offset: offset,
      genre: genre,
      sort: sort,
      price: price,
    });
    if (books) {
      console.log("Received books");
      return books;
    } else {
      console.log("Books not received");
    }
  } catch (error) {
    console.error("Error handling book request:", error);
  }
}

export async function fetchAllBooks() {
  const result = await db.select().from(BookTable);
  return result;
}

export async function fetchMembers(
  search: string,
  limit: number,
  offset: number
) {
  try {
    const members = await memberRepo.list({
      search: search,
      limit: limit,
      offset: offset,
    });
    if (members) {
      console.log("Received members");
      return members;
    } else {
      console.log("Members not received");
    }
  } catch (error) {
    console.error("Error handling book request:", error);
  }
}

export async function fetchTransactionDetails(
  search: string,
  limit: number,
  offset: number,
  status: string,
  duetoday?: string
) {
  try {
    const transactions = await transactionRepo.list({
      search: search,
      limit: limit,
      offset: offset,
      status: status,
      duetoday: duetoday,
    });
    if (transactions) {
      console.log("Received Transaction");
      return transactions;
    } else {
      console.log("Transactions not received");
    }
  } catch (error) {
    console.error("Error handling book request:", error);
  }
}

export async function getGenres() {
  const genre = await db.select().from(BookTable);
  const genres = genre.map((genr) => genr.genre);
  return genre
    .map((gen) => gen.genre)
    .reduce<string[]>(
      (acc, curr) => {
        if (!acc.includes(curr)) {
          acc.push(curr);
        }
        return acc;
      },
      ["All Genres"]
    );
}

export async function fetchUserDetails() {
  const session = await auth();
  // console.log("In fetch User Details session", session);
  const user = session!.user;
  const email = user!.email;
  try {
    const userDetails = await memberRepo.getByEmail(email as string);
    if (!userDetails) {
      throw new Error("Details could not be found");
    }
    // console.log(`UserDetails:${userDetails}, user:${user}`);
    return { userDetails, user };
  } catch (error) {
    console.error("Error finding details of user", error);
  }
}

export async function fetchTransactionRequests() {
  try {
    const transactionRequests = await db.select().from(RequestTransactionTable);
    return transactionRequests;
  } catch (error) {
    throw new Error("Failed to fetch transaction requests");
  }
}

export async function approveTransaction(id: number) {
  try {
    const today = new Date();
    const borrowDate = today.toISOString().slice(0, 10);
    const dueDate = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000);
    await db
      .update(TransactionTable)
      .set({
        status: "approved",
        borrowDate: borrowDate,
        dueDate: dueDate.toISOString().slice(0, 10),
      })
      .where(eq(TransactionTable.id, id));

    const issueBook = await transactionRepo.issueBook(id);
    console.log(`Book ${issueBook} issued successfully`);
    return issueBook;
  } catch (error: any) {
    throw new Error("Failed to approve Transaction", error);
  }
}

export async function rejectTransaction(id: number) {
  try {
    await db
      .update(TransactionTable)
      .set({ status: "rejected" })
      .where(eq(TransactionTable.id, id));
  } catch (error: any) {
    throw new Error("Failed to reject Transaction", error);
  }
}

export async function deleteBook(id: number) {
  const deletedBook = await bookRepo.delete(id);
  if (deletedBook) {
    return true;
  } else {
    return false;
  }
}

export async function borrowBook(data: { memberId: number; bookId: number }) {
  try {
    const createdTransaction = await transactionRepo.create(data);
    return createdTransaction;
  } catch (error) {
    console.error("Failed to create Transaction", error);
  }
}

export async function fetchBooksByMember() {
  try {
    const currentMember = await fetchUserDetails();

    if (!currentMember) {
      throw new Error("User details not found");
    }

    const transactions = await db
      .select({
        id: TransactionTable.id,
        title: BookTable.title,
        author: BookTable.author,
        dueDate: TransactionTable.dueDate,
        status: TransactionTable.status,
        borrowDate: TransactionTable.borrowDate,
      })
      .from(TransactionTable)
      .innerJoin(BookTable, eq(TransactionTable.bookId, BookTable.id))
      .where(
        and(
          eq(TransactionTable.memberId, currentMember.userDetails.id),
          ne(TransactionTable.status, "Returned")
        )
      );

    return transactions;
  } catch (error) {
    console.error("Failed to get the book details");
  }
}

export async function fetchTotalBooksOfMember() {
  try {
    const currentMember = await fetchUserDetails();

    if (!currentMember) {
      throw new Error("User details not found");
    }

    const transactions = await db
      .select({
        id: TransactionTable.id,
        title: BookTable.title,
        author: BookTable.author,
        dueDate: TransactionTable.dueDate,
        status: TransactionTable.status,
      })
      .from(TransactionTable)
      .innerJoin(BookTable, eq(TransactionTable.bookId, BookTable.id))
      .where(eq(TransactionTable.memberId, currentMember.userDetails.id));

    return transactions;
  } catch (error) {
    console.error("Failed to get the book details");
  }
}

export async function deleteMemberById(id: number) {
  try {
    const deletedMember = await memberRepo.delete(id);
    return deletedMember;
  } catch (error) {
    console.error("Failed to delete member", error);
  }
}

export async function deleteTransaction(id: number) {
  try {
    const deletedTransaction = await transactionRepo.delete(id);
    return deleteTransaction;
  } catch (error) {
    console.error("Failed to delete transaction", error);
  }
}

export async function getUserByEmail(email: string) {
  try {
    const member = await memberRepo.getByEmail(email);
    return member;
  } catch (error) {
    console.error("Failed to fetch email", error);
  }
}

export async function createUser(memberData: IMemberBase) {
  try {
    const createdUser = await memberRepo.create(memberData);
    return createdUser;
  } catch (error) {
    console.error("Failed to create user for google login", error);
  }
}

export async function returnBook(bookId: number, memberId: number) {
  try {
    const [transaction] = await db
      .select({ transactionId: TransactionTable.id })
      .from(TransactionTable)
      .where(
        and(
          eq(TransactionTable.bookId, bookId),
          eq(TransactionTable.memberId, memberId)
        )
      );
    const today = new Date();
    const returnedDate = today.toISOString().slice(0, 10);
    await transactionRepo.update(transaction.transactionId, returnedDate);
  } catch (error) {
    console.error("Failed to return the book", error);
  }
}
