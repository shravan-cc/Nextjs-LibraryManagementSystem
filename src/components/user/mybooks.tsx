"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MyBooksProps } from "@/lib/definition";
import { Card } from "../ui/card";
import { BookOpen, Calendar } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";

export default function MyBooksList({ borrowedBooks }: MyBooksProps) {
  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 py-8"
    >
      <motion.h2
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="text-3xl font-bold text-orange-800 text-center mb-8"
      >
        My Library
      </motion.h2>

      {/* <AnimatePresence> */}
      {borrowedBooks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-CustomDarkOrange text-lg mb-4">
            Your library is empty. Start borrowing books to see them here!
          </p>
          <BookOpen size={100} className="mx-auto text-orange-300" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {borrowedBooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
                <div className="relative aspect-[4/5] w-full">
                  {book.imageURL ? (
                    <Image
                      src={book.imageURL}
                      alt={`Cover of ${book.title}`}
                      layout="fill"
                      objectFit="cover contain"
                      className="transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-orange-100">
                      <BookOpen size={100} className="text-orange-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 group-hover:opacity-100 opacity-80" />
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
                      <div className="flex items-center space-x-2">
                        <Calendar size={14} className="text-orange-300" />
                        <span>Borrowed: {book.borrowDate}</span>
                      </div>
                      <Badge
                        variant={
                          isOverdue(book.dueDate!) ? "destructive" : "secondary"
                        }
                        className="animate-pulse"
                      >
                        Due: {book.dueDate}
                      </Badge>
                    </motion.div>
                  </div>
                  <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 animate-wave" />
                    <div className="absolute inset-0 animate-wave animation-delay-1000" />
                    <div className="absolute inset-0 animate-wave animation-delay-2000" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
      {/* </AnimatePresence> */}
    </motion.div>
  );
}
