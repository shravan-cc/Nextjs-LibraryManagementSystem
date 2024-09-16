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

export default function IssueBook({
  book,
  member,
}: {
  book: IBook;
  member: IMember;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const data = {
    memberId: member.id,
    bookId: book.id,
  };

  const handleIssue = async () => {
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
          variant="ghost"
          size="sm"
          className="text-xs hover:bg-orange-100"
        >
          <BookOpen className="h-3 w-3 mr-1" /> Borrow
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Borrow</DialogTitle>
          <DialogDescription>
            Are you sure you want to borrow {`"${book.title}"`}? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs hover:bg-orange-100"
            onClick={handleIssue}
          >
            <BookOpen className="h-3 w-3 mr-1" /> Borrow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
