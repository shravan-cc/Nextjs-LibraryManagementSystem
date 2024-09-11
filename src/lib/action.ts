"use server";

import { IMemberBase, memberBaseSchema } from "@/models/member.model";
import { BookRepository } from "@/repositories/book.repository";
import { MemberRepository } from "@/repositories/member.repository";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { auth, signIn } from "../auth";
import { db } from "./db";
import { redirect } from "next/navigation";
import { string } from "zod";
import { TransactionRepository } from "@/repositories/transaction.repository";
import { bookBaseSchema, bookSchema } from "@/models/book.model";
import { TransactionRequestRepository } from "@/repositories/transactionRequest.repository";
import {
  BooksTable,
  BookTable,
  RequestTransactionTable,
  TransactionTable,
} from "@/drizzle/schema";
import { eq, and, ne } from "drizzle-orm";

const memberRepo = new MemberRepository(db);
const bookRepo = new BookRepository(db);
const transactionRepo = new TransactionRepository(db);
const requestTransactionRepo = new TransactionRequestRepository(db);

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
    if (result) {
      redirect("/home");
    }
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
  });

  if (!validateFields.success) {
    console.log("Failure");
    console.log(validateFields.error.flatten().fieldErrors);
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const { title, author, publisher, isbnNo, pages, totalCopies } =
    validateFields.data;

  if (!title || !author || !publisher || !isbnNo || !pages || !totalCopies) {
    console.log("All fields are required");
    return { message: "All Fields are required" };
  }

  try {
    const existingBook = await bookRepo.getByIsBnNo(isbnNo);
    if (existingBook) {
      console.log("Book already exists.");
      return { message: "Book already exists." };
    }

    const createdBook = await bookRepo.create(validateFields.data);
    console.log(`Book ${createdBook.title} created successfully!`);
    return { message: "Success" };
  } catch (error) {
    console.log("Error during registration:", error);
    return { message: "Error during registration:", error };
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
  });

  if (!validateFields.success) {
    console.log("Failure");
    console.log(validateFields.error.flatten().fieldErrors);
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const { title, author, publisher, isbnNo, pages, totalCopies } =
    validateFields.data;

  if (!title || !author || !publisher || !isbnNo || !pages || !totalCopies) {
    console.log("All fields are required");
    return { message: "All Fields are required" };
  }

  try {
    const editedBook = await bookRepo.update(id, validateFields.data);
    console.log(`Book ${editedBook!.title} created successfully!`);
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

  const { firstName, lastName, phone, address, email, password, role } =
    validateFields.data;

  if (!firstName || !lastName || !phone || !address || !email || !password) {
    console.log("All fields are required");
    return { message: "All Fields are required" };
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
    return { message: "Error during registration:", error };
  }
}

export async function fetchBooks(
  search: string,
  limit: number,
  offset: number,
  genre?: string,
  sort?: string
) {
  try {
    const books = await bookRepo.list({
      search: search,
      limit: limit,
      offset: offset,
      genre: genre,
      sort: sort,
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
  offset: number
) {
  try {
    const transactions = await transactionRepo.list({
      search: search,
      limit: limit,
      offset: offset,
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
  const genre = await db.select().from(BooksTable);
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
      ["All"]
    );
}

export async function fetchUserDetails() {
  const session = await auth();
  const user = session!.user;
  const email = user!.email;
  try {
    const userDetails = await memberRepo.getByEmail(email as string);
    if (!userDetails) {
      throw new Error("Details could not be found");
    }
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
