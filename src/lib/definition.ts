import { IBook } from "@/models/book.model";
import { IMember } from "@/models/member.model";
import { User } from "next-auth";
import React from "react";

export interface GoogleAuthProps {
  buttonLabel: string;
}

export type BookTableColumns =
  | "id"
  | "title"
  | "author"
  | "availableCopies"
  | "pages"
  | "publisher"
  | "price"
  | "isbnNo"
  | "genre"; // Adjust based on actual column names

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export interface PaginationButtonProps {
  page: number | string;
  isCurrent: boolean;
  handlePageChange: (pageNumber: number | string) => void;
}

export type PageOption = {
  offset?: number;
  limit?: number;
};

export interface filterGenreProps {
  genres: string[];
}

export interface RequestProps {
  id: number;
  title: string;
  author: string;
  dueDate: string | null;
  status: string;
}

export interface ProfileHandlerProps {
  profilePath: string;
  // editProfilePath: string;
  userDetails: IMember | undefined;
  userImage: string;
  children: React.ReactNode;
}

export interface ViewProfileProps {
  userDetails: IMember | undefined;
  userImage: string;
  user: User | undefined;
}

export interface ProfileSectionProps {
  title: string;
  icon: any;
  children: React.ReactNode;
}

export interface InfoItemProps {
  icon: any;
  text: string | number | null;
}

export interface StatCardProps {
  title: string;
  value: number;
  icon: any;
}

export interface SortState {
  sortValue: string;
  sortAs: "asc" | "desc" | null;
}

export interface MyBooksProps {
  borrowedBooks: {
    id: number;
    title: string;
    author: string;
    dueDate: string | null;
    status: string;
    borrowDate: string | null;
    imageURL: string | null;
  }[];
}

export interface BookCardProps {
  genres: string[];
  books: IBook[] | undefined;
  member: IMember;
  totalPages: number;
  currentPage: string | 1;
}
