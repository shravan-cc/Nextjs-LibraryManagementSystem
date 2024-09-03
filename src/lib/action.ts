"use server";

import { IMemberBase, memberBaseSchema } from "@/models/member.model";
import { BookRepository } from "@/repositories/book.repository";
import { MemberRepository } from "@/repositories/member.repository";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";
import { signIn } from "../auth";
import { db } from "./db";

const memberRepo = new MemberRepository(db);
const bookRepo = new BookRepository(db);

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
    await signIn("credentials", formData);
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
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
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

  // try {
  //   const response = await fetch("/api/signup", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       firstName,
  //       lastName,
  //       phone,
  //       address,
  //       email,
  //       password,
  //     }),
  //   });
  //   if (response.ok) {
  //     alert("Success");
  //     return { message: "Success" };
  //   } else {
  //     alert("Failure");
  //     return { message: "Failure" };
  //   }
  // } catch (error) {
  //   console.error("Error during registration:", error);
  //   alert("An error occurred during registration. Please try again.");
  //   return {
  //     message: "An error occurred during registration. Please try again.",
  //   };
  // }
}

export async function fetchBooks(
  search: string,
  limit: number,
  offset: number
) {
  try {
    const books = await bookRepo.list({
      search: search,
      limit: limit,
      offset: offset,
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
