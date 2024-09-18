import { integer, bigint, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const UserTable = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 100 }).unique().notNull(),
});

export const BookTable = pgTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  author: varchar("author", { length: 150 }).notNull(),
  publisher: varchar("publisher", { length: 50 }).notNull(),
  genre: varchar("genre", { length: 31 }).notNull(),
  isbnNo: varchar("isbnNo", { length: 31 }).unique().notNull(),
  pages: integer("pages").notNull(),
  totalCopies: integer("totalCopies").notNull(),
  availableCopies: integer("availableCopies").notNull(),
  price: integer("price"),
  imageURL: varchar("imageURL", { length: 255 }),
});

export const MemberTable = pgTable("members", {
  id: serial("id").primaryKey(),
  firstName: varchar("firstName", { length: 50 }).notNull(),
  lastName: varchar("lastName", { length: 50 }).notNull(),
  phone: bigint("phone", { mode: "number" }).unique(),
  address: varchar("address", { length: 100 }).notNull(),
  role: varchar("role", { length: 100 }).notNull(),
  password: varchar("password", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).unique().notNull(),
  refreshToken: varchar("refreshToken", { length: 100 }).unique(),
});

export const TransactionTable = pgTable("transactions", {
  id: serial("id").primaryKey(),
  bookId: integer("bookId")
    .notNull()
    .references(() => BookTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  memberId: integer("memberId")
    .notNull()
    .references(() => MemberTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  borrowDate: varchar("borrowDate", { length: 100 }),
  dueDate: varchar("dueDate", { length: 100 }),
  status: varchar("status", { length: 15 }).notNull(),
  returnDate: varchar("returnDate", { length: 10 }),
});

export const RequestTransactionTable = pgTable("TransactionRequests", {
  id: serial("id").primaryKey(),
  memberId: integer("memberId").notNull(),
  bookId: integer("bookId").notNull(),
  requestDate: varchar("requestDate", { length: 10 }).notNull(),
  status: varchar("status", { length: 15 }).notNull(),
});
