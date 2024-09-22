"use client";
import Pagination from "@/components/home/pagination";
import SearchBar from "@/components/home/search";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { fetchBooks, fetchUserDetails, getGenres } from "@/lib/action";
import { IBook } from "@/models/book.model";
import { motion, AnimatePresence } from "framer-motion";

import { BookCopy, BookOpen, Building, Hash, Users } from "lucide-react";

import FilterGenre from "@/components/admin/books/filterGenre";
import SortBooks from "@/components/admin/books/sortBooks";
import IssueBook from "@/components/user/issueBook";

import { BookRepository } from "@/repositories/book.repository";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Separator } from "@/components/ui/separator";
import FilterBookByPrice from "@/components/admin/books/fiterPrice";
import { BookCardProps } from "@/lib/definition";

export default function BookCard({
  genres,
  books,
  member,
  totalPages,
  currentPage,
}: BookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-4"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold text-orange-800 text-center mb-8"
      >
        Welcome to Our Library
      </motion.h1>

      <div className="bg-orange-50 rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex-grow sm:flex-grow-0 w-full sm:w-auto">
            <SearchBar type="Books" />
          </div>
          <div className="flex flex-wrap gap-4">
            <SortBooks />
            <FilterGenre genres={genres} />
            <FilterBookByPrice />
          </div>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {books!.map((book, index) => (
            <Dialog key={book.id}>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 group relative">
                    <div className="relative aspect-[4/5] w-full">
                      {book.imageURL ? (
                        <Image
                          src={book.imageURL}
                          alt={`Cover of ${book.title}`}
                          layout="fill"
                          objectFit="cover contain"
                          className="transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-orange-100">
                          <BookOpen size={100} className="text-orange-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="text-xl font-semibold mb-2 line-clamp-2"
                        >
                          {book.title}
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="text-sm mb-4 line-clamp-1"
                        >
                          {book.author}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex justify-between items-center text-xs"
                        >
                          <Badge variant="secondary">
                            <div className="flex items-center space-x-1">
                              <BookCopy className="h-4 w-4 text-gray-600" />
                              <span className="text-xs font-medium">
                                {book.availableCopies}/{book.totalCopies}
                              </span>
                            </div>
                          </Badge>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="mt-4 flex justify-between items-center"
                        >
                          <Badge
                            variant="outline"
                            className="text-xs font-medium text-white/80 border-orange-500/50 bg-orange-500/50"
                          >
                            ₹{book.price}
                          </Badge>
                          <div className="text-white/80 hover:text-white transition-colors duration-200">
                            <IssueBook book={book} member={member} />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
                <div className="flex h-[500px]">
                  <div className="w-1/2 relative">
                    {book.imageURL ? (
                      <Image
                        src={book.imageURL}
                        alt={`Cover of ${book.title}`}
                        layout="fill"
                        objectFit="cover contain"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 p-4 text-center">
                        <BookOpen className="h-24 w-24 text-orange-500 mb-4" />
                        <h3 className="font-bold text-xl">{book.title}</h3>
                        <p className="text-sm text-gray-600 mt-2">
                          {book.author}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="w-1/2 p-6 overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-orange-600 mb-2">
                        {book.title}
                      </DialogTitle>
                      <p className="text-sm text-gray-600 italic">
                        by {book.author}
                      </p>
                    </DialogHeader>
                    <Separator className="my-4" />
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {book.genre}
                        </Badge>
                        <span className="text-sm text-gray-600">•</span>
                        <span className="text-sm text-gray-600">
                          {book.pages} pages
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium">
                          {book.publisher}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Hash className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium">
                          ISBN: {book.isbnNo}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <BookCopy className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">
                            {book.availableCopies} of {book.totalCopies}{" "}
                            available
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">
                            {book.totalCopies - book.availableCopies} borrowed
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-lg font-bold text-orange-600">
                          ₹{book.price}
                        </span>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <DialogFooter className="mt-6">
                      <IssueBook book={book} member={member} />
                    </DialogFooter>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <Pagination currentPage={Number(currentPage)} totalPages={totalPages} />
      )}
    </motion.div>
  );
}
