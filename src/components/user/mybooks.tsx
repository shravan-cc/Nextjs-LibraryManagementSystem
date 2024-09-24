"use client";

import { motion } from "framer-motion";
import { MyBooksProps } from "@/lib/definition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function MyBooksList({ borrowedBooks }: MyBooksProps) {
  const t = useTranslations("MyBooks");
  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-orange-800 mb-2">
          {t("MyBooks")}
        </h1>
        <p className="text-lg text-orange-600">{t("Manage")}</p>
      </motion.div>

      {borrowedBooks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-CustomDarkOrange text-lg mb-4">
            {t("EmptyLibrary")}
          </p>
          <BookOpen size={100} className="mx-auto text-orange-300" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {borrowedBooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-[3/3] w-full">
                  {book.imageURL ? (
                    <Image
                      src={book.imageURL}
                      alt={`Cover of ${book.title}`}
                      layout="fill"
                      objectFit="cover contain"
                      className="transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-orange-100">
                      <BookOpen size={100} className="text-orange-300" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <CardTitle className="text-xl font-semibold mb-2 text-orange-800 line-clamp-2">
                    {book.title}
                  </CardTitle>
                  <p className="text-sm text-orange-600 mb-4">{book.author}</p>
                  <div className="flex justify-between items-center text-xs text-orange-700">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} className="text-orange-500" />
                      <span>
                        {t("Borrowed")} {book.borrowDate}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={14} className="text-orange-500" />
                      <Badge
                        variant={
                          isOverdue(book.dueDate!) ? "destructive" : "secondary"
                        }
                        className={
                          isOverdue(book.dueDate!) ? "animate-pulse" : ""
                        }
                      >
                        {t("Due")} {book.dueDate}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
