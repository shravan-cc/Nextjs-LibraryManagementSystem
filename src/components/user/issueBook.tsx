"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { borrowBook } from "@/lib/action";
import { IBook } from "@/models/book.model";
import { IMember } from "@/models/member.model";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

export default function IssueBook({
  book,
  member,
}: {
  book: IBook;
  member: IMember;
}) {
  const t = useTranslations("UserBooks");
  const { toast } = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const data = {
    memberId: member.id,
    bookId: book.id,
  };

  const handleIssue = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await borrowBook(data);
    toast({
      title: "Success",
      description: `Request to borrow Book ${book.title} successfully sent`,
      duration: 1500,
      className: "bg-green-100 border-green-500 text-green-800 shadow-lg",
    });
    router.refresh();
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={(e) => e.stopPropagation()}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          {book.availableCopies > 0 ? t("Borrow Now") : t("Join Waitlist")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("Confirm Borrow")}</DialogTitle>
          <DialogDescription>
            {t("Question")} {`"${book.title}"`}
            {t("Action")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            onClick={(e) => {
              setIsOpen(false);
            }}
          >
            {t("Cancel")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs hover:bg-orange-100"
            onClick={(e) => handleIssue(e)}
          >
            <BookOpen className="h-3 w-3 mr-1" /> {t("Borrow")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
