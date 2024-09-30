"use server";

import {
  BookTable,
  ProfessorsTable,
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
import { IAppointmentBase } from "@/models/appointment.model";
import { AppointmentRepository } from "@/repositories/appointment.repository";
import { error } from "console";
import {
  ProfessorAddSchema,
  ProfessorBaseSchema,
} from "@/models/professor.model";
import { ProfessorRepository } from "@/repositories/professor.repository";
import Razorpay from "razorpay";

const memberRepo = new MemberRepository(db);
const bookRepo = new BookRepository(db);
const transactionRepo = new TransactionRepository(db);
const appointmentRepo = new AppointmentRepository(db);
const professorRepo = new ProfessorRepository(db);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CALENDLY_API_TOKEN = process.env.NEXT_PUBLIC_CALENDLY_ACCESS_TOKEN;

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

export async function addProfessor(prevState: State, formData: FormData) {
  console.log("In add professor");
  const validateFields = ProfessorAddSchema.safeParse({
    name: formData.get("name"),
    bio: formData.get("bio"),
    email: formData.get("email"),
    department: formData.get("department"),
  });

  if (!validateFields.success) {
    console.log("Failure");
    console.log(validateFields.error.flatten().fieldErrors);
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Add professor.",
    };
  }
  const { name, bio, email, department } = validateFields.data;

  if (!name || !bio || !email || !department) {
    console.log("All fields are required");
    return { message: "All Fields are required" };
  }

  try {
    const existingProfessor = await professorRepo.getProfessorByEmail(email);
    if (existingProfessor) {
      console.log("Professor already exists.");
      return { message: "Professor already exists." };
    }

    const status = await inviteProfessor(email);
    console.log(status);

    const createdProfessor = await professorRepo.create({
      name,
      email,
      bio,
      department,
      calendlylink: "",
      status: status,
    });
    console.log(`Professor ${createdProfessor.name} created successfully!`);
    return { message: "Success" };
  } catch (error) {
    console.log("Error during registration:", error);
    return { message: "Error during registration:" };
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
  const userDetails = await fetchUserDetails();
  const role = userDetails?.userDetails.role;
  const { firstName, lastName, phone, address, email } = validateFields.data;

  if (!firstName || !lastName || !phone || !address || !email) {
    console.log("All fields are required");
    return { message: "All Fields are required" };
  }
  try {
    const existingUser = await memberRepo.getByEmail(email);
    const editedMember = await memberRepo.update(existingUser!.id, {
      email,
      firstName,
      lastName,
      phone,
      address,
      role,
      imageURL,
    });
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
  // console.log("User", user);
  // console.log("User session", user?.image);
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
        imageURL: BookTable.imageURL,
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

export async function getProfessors() {
  try {
    const professors = await db.select().from(ProfessorsTable);
    return professors;
  } catch (error) {
    console.error("Failed to fetch professors", error);
  }
}

export async function getProfessorById(id: number) {
  try {
    const [professors] = await db
      .select()
      .from(ProfessorsTable)
      .where(eq(ProfessorsTable.id, id));
    return professors;
  } catch (error) {
    console.error("Failed to fetch professor by id", error);
  }
}

export async function createAppointment(data: IAppointmentBase) {
  try {
    const createdAppointment = await appointmentRepo.create(data);
    return createdAppointment;
  } catch (error) {
    console.error("Failed to create an appointment", error);
  }
}

export async function getUserUri() {
  try {
    const response = await fetch("https://api.calendly.com/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Organizations", response);
    if (!response.ok) {
      throw new Error(`Error fetching user info: ${response.statusText}`);
    }

    const data = await response.json();
    return data.resource.current_organization; // This is the user's URI
  } catch (error) {
    console.error("Error fetching user URI", error);
    throw error;
  }
}

export async function inviteProfessor(emailValue: string) {
  const organizationUrl = await getUserUri();
  const uuid = organizationUrl.split("/").pop();
  try {
    const response = await fetch(
      `https://api.calendly.com/organizations/${uuid}/invitations`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailValue }),
      }
    );
    console.log("Organizations", response);
    if (!response.ok) {
      throw new Error(`Error fetching user info: ${response.statusText}`);
    }
    const data = await response.json();
    return data.resource.status;
  } catch (error) {
    console.error("Error inviting professor", error);
  }
}
// Fetch scheduled events for the user
export async function getScheduledEvents() {
  const userUri = await getUserUri(); // Get the logged-in user's URI
  const currentDate = new Date().toISOString(); // Today's date
  const nextWeekDate = new Date();
  nextWeekDate.setDate(nextWeekDate.getDate() + 15); // One week from today
  const nextWeek = nextWeekDate.toISOString();
  try {
    const response = await fetch(
      `https://api.calendly.com/scheduled_events?organization=${encodeURIComponent(
        userUri
      )}&min_start_time=${currentDate}&max_start_time=${nextWeek}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error fetching scheduled events:", errorText);
      throw new Error(`Error fetching Calendly events: ${response.statusText}`);
    }

    const data = await response.json();
    // console.log("Scheduled events:", data);
    // console.log("Members", data.collection);
    return data.collection; // Return an array of scheduled events
  } catch (error) {
    console.error("Error fetching scheduled events", error);
    throw error;
  }
}

export async function getEventUuid() {
  const events = await getScheduledEvents();
  // console.log("Events in getEventuuid", events);

  if (events.length > 0) {
    const eventDetails = events.map((event: any) => {
      const eventUuid = event.uri.split("/").pop(); // Extract the UUID from the URI
      const startTime = event.start_time;
      const endTime = event.end_time;
      const gmeetLink = event.location.join_url; // Extract Google Meet link

      const membership = event.event_memberships[0]; // Get the first membership
      const profEmail = membership ? membership.user_email : null;
      return {
        uuid: eventUuid,
        startTime,
        endTime,
        gmeetLink,
        profEmail,
      };
    });

    console.log("Event Details:", eventDetails);
    return eventDetails;
  } else {
    console.log("No events found");
    return null;
  }
}

export async function getInviteeDetails() {
  const eventDetails = await getEventUuid();

  // Use Promise.all to wait for all fetch calls to complete
  const inviteeDetails = await Promise.all(
    eventDetails.map(async (event: any) => {
      const startTime = event.startTime;
      const endTime = event.endTime;
      const gmeetLink = event.gmeetLink;
      const professorEmail = event.profEmail;
      const event_uuid = event.uuid;

      const response = await fetch(
        `https://api.calendly.com/scheduled_events/${event_uuid}/invitees`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error fetching scheduled events:", errorText);
        throw new Error(
          `Error fetching Calendly events: ${response.statusText}`
        );
      }

      const data = await response.json();
      // console.log("Scheduled event invitees:", data);

      const convertToIST = (utcTime: string) => {
        const date = new Date(utcTime);

        // Options for time formatting in IST
        const options: Intl.DateTimeFormatOptions = {
          timeZone: "Asia/Kolkata", // IST timezone
          weekday: "long",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // 12-hour format
        };

        // Convert UTC time to IST using toLocaleString
        const istDateTime = date.toLocaleString("en-IN", options);

        return istDateTime; // Format: "Day, MM/DD/YYYY, HH:MM AM/PM"
      };
      // Map the invitees to the desired output format
      const invitees = data.collection.map((invitee: any) => ({
        startTime: convertToIST(startTime),
        endTime: convertToIST(endTime),
        gmeetLink,
        professorEmail,
        event_uuid,
        name: invitee.name,
        email: invitee.email,
        cancel_url: invitee.cancel_url,
        reschedule_url: invitee.reschedule_url,
        status: invitee.status,
      }));

      return invitees; // Return the array of invitee details for this event
    })
  );

  // Flatten the array of arrays into a single array
  return inviteeDetails.flat();
}

export async function cancelAppointments(event_uuid: string) {
  try {
    const response = await fetch(
      `https://api.calendly.com/scheduled_events/${event_uuid}/cancellation`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason: "User canceled the event",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error fetching scheduled events:", errorText);
      throw new Error(`Error fetching Calendly events: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Canceled Data", data);
    return data;
  } catch (error) {
    console.error("Failed to cancel appointment");
  }
}

export async function getProfessorByEmail(email: string) {
  try {
    const [professors] = await db
      .select()
      .from(ProfessorsTable)
      .where(eq(ProfessorsTable.email, email));
    if (!professors) {
      console.log("No professors");
    }
    return professors;
  } catch (error) {
    console.error("Failed to fetch professor by email", error);
  }
}

export async function getUserAppointments() {
  try {
    const userDetails = await fetchUserDetails();
    const userEmail = userDetails?.user?.email
      ? userDetails.user.email
      : userDetails!.userDetails.email;
    console.log("Email", userEmail);

    const scheduledDetails = await getInviteeDetails();
    const userAppointments = scheduledDetails.filter(
      (details) => details.email === userEmail
    );
    console.log("User appoints", userAppointments);

    const enrichedAppointments = await Promise.all(
      userAppointments.map(async (appointment) => {
        // Assuming getProfessorDetailsByEmail returns an object like { profname, profdept }
        const profDetails = await getProfessorByEmail(
          appointment.professorEmail
        );
        console.log(profDetails);
        // Add the professor details to the appointment
        return {
          ...appointment,
          profname: profDetails!.name,
          profdept: profDetails!.department,
        };
      })
    );
    console.log("Enriched", enrichedAppointments);

    const now = new Date();

    // Helper function to parse the custom end time format
    const parseEndTime = (endTime: string) => {
      // Example: "Friday, 27/09/2024, 01:30 pm"
      const regex = /^([^,]+), (.+), (.+)$/; // Match day, date, time parts
      const match = endTime.match(regex);

      if (!match) {
        console.error(`Invalid end time format: ${endTime}`);
        return null; // Handle invalid formats gracefully
      }

      const [, , dateString, timeString] = match;
      const [day, month, year] = dateString.split("/");

      // Reformat to MM/DD/YYYY hh:mm AM/PM (US style)
      const formattedDate = `${month}/${day}/${year} ${timeString}`;
      console.log(`Formatted Date: ${formattedDate}`);
      return new Date(formattedDate);
    };

    return enrichedAppointments.filter((appointment) => {
      console.log("endTime", appointment.endTime);
      const appointmentEndTime = parseEndTime(appointment.endTime);
      console.log("Appointments", appointment);
      console.log(`AppointmentEnd ${appointmentEndTime} now ${now}`);
      return appointmentEndTime! > now && appointment.status === "active";
    });
  } catch (error) {
    console.error("Failed to get appointments", error);
  }
}

export async function getAllAppointments() {
  try {
    const userDetails = await fetchUserDetails();
    const userEmail = userDetails?.userDetails.email;
    const scheduledDetails = await getInviteeDetails();
    console.log("User appoints", scheduledDetails);
    const enrichedAppointments = await Promise.all(
      scheduledDetails.map(async (appointment) => {
        // Assuming getProfessorDetailsByEmail returns an object like { profname, profdept }
        const profDetails = await getProfessorByEmail(
          appointment.professorEmail
        );
        console.log(profDetails);
        // Add the professor details to the appointment
        return {
          ...appointment,
          profname: profDetails!.name,
          profdept: profDetails!.department,
        };
      })
    );
    const now = new Date();

    // Helper function to parse the custom end time format
    const parseEndTime = (endTime: string) => {
      // Example: "Friday, 27/09/2024, 01:30 pm"
      const regex = /^([^,]+), (.+), (.+)$/; // Match day, date, time parts
      const match = endTime.match(regex);

      if (!match) {
        console.error(`Invalid end time format: ${endTime}`);
        return null; // Handle invalid formats gracefully
      }

      const [, , dateString, timeString] = match;
      const [day, month, year] = dateString.split("/");

      // Reformat to MM/DD/YYYY hh:mm AM/PM (US style)
      const formattedDate = `${month}/${day}/${year} ${timeString}`;
      console.log(`Formatted Date: ${formattedDate}`);
      return new Date(formattedDate);
    };
    console.log("Enriched All", enrichedAppointments);
    return enrichedAppointments.filter((appointment) => {
      console.log("endTime", appointment.endTime);
      const appointmentEndTime = parseEndTime(appointment.endTime);
      console.log(`AppointmentEnd ${appointmentEndTime} now ${now}`);
      return appointmentEndTime! > now && appointment.status === "active";
    });
  } catch (error) {
    console.error("Failed to get appointments", error);
  }
}

export async function updateStatus(emailValue: string) {
  const organizationUrl = await getUserUri();
  const uuid = organizationUrl.split("/").pop();
  console.log("UUID", uuid);
  try {
    const response = await fetch(
      `https://api.calendly.com/organizations/${uuid}/invitations?email=${emailValue}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Organizations", response);
    if (!response.ok) {
      console.error(`Error fetching user info: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("DAta", data);
    if (data.collection[0].status === "accepted") {
      console.log("Accepted the invitation");
      try {
        const response = await fetch(`${data.collection[0].user}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${CALENDLY_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        console.log("User Response", response);
        if (!response.ok) {
          console.error(`Error fetching user info: ${response.statusText}`);
          throw new Error(`Error fetching user info: ${response.statusText}`);
        }
        const result = await response.json();
        await db
          .update(ProfessorsTable)
          .set({
            status: data.collection[0].status,
            calendlylink: result.resource.scheduling_url,
          })
          .where(eq(ProfessorsTable.email, emailValue));
      } catch (error) {
        console.error("Error while updating status", error);
      }
    }
  } catch (error) {
    console.error("Error inviting professor", error);
  }
}

export async function performPayment(amount: number) {
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_order_74394",
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log("Orders", order);
    return { orderId: order.id };
  } catch (error) {
    console.error("Failed to perform payments", error);
  }
}
