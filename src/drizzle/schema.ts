import {
  bigint,
  int,
  mysqlTable,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";

export const UserTable = mysqlTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 100 }).unique().notNull(),
});

export const BookTable = mysqlTable("books", {
  id: serial("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 100 }).notNull(),
  author: varchar("author", { length: 150 }).notNull(),
  publisher: varchar("publisher", { length: 50 }),
  genre: varchar("genre", { length: 31 }).notNull(),
  isbnNo: varchar("isbnNo", { length: 31 }).unique().notNull(),
  pages: int("pages").notNull(),
  totalCopies: int("totalCopies").notNull(),
  availableCopies: int("availableCopies").notNull(),
});

export const BooksTable = mysqlTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  author: varchar("author", { length: 150 }).notNull(),
  publisher: varchar("publisher", { length: 100 }).notNull(),
  genre: varchar("genre", { length: 31 }).notNull(),
  isbnNo: varchar("isbnNo", { length: 13 }).notNull(),
  pages: int("pages").notNull(),
  totalCopies: int("totalCopies").notNull(),
  availableCopies: int("availableCopies").notNull(),
});

export const MemberTable = mysqlTable("members", {
  id: serial("id").primaryKey().autoincrement(),
  firstName: varchar("firstName", { length: 50 }).notNull(),
  lastName: varchar("lastName", { length: 50 }).notNull(),
  phone: bigint("phone", { mode: "number" }).unique().notNull(),
  address: varchar("address", { length: 100 }).notNull(),
  role: varchar("role", { length: 100 }).notNull(),
  password: varchar("password", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).unique().notNull(),
  refreshToken: varchar("refreshToken", { length: 100 }).unique(),
});

export const TransactionTable = mysqlTable("transactions", {
  id: serial("id").primaryKey().autoincrement(),
  bookId: int("bookId")
    .notNull()
    .references(() => BooksTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  memberId: int("memberId")
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

export const RequestTransactionTable = mysqlTable("TransactionRequests", {
  id: serial("id").primaryKey().autoincrement(),
  memberId: int("memberId").notNull(),
  bookId: int("bookId").notNull(),
  requestDate: varchar("requestDate", { length: 10 }).notNull(),
  status: varchar("status", { length: 15 }).notNull(),
});
