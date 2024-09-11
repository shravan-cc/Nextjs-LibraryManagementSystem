"use client";

import { IBook } from "@/models/book.model";
import { IMember } from "@/models/member.model";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ArrowLeftCircle } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { returnBook } from "@/lib/action";

export default function ReturnBook({
  book,
  member,
}: {
  book: IBook;
  member: IMember;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleReturn = async () => {
    await returnBook(book.id, member.id);
    toast({
      title: "Success",
      description: `Book ${book.title} returned successfully to the library.`,
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
          <ArrowLeftCircle className="h-3 w-3 mr-1" /> Return
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Return</DialogTitle>
          <DialogDescription>
            Are you sure you want to return {`"${book.title}"`}? This action
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
            onClick={handleReturn}
          >
            <ArrowLeftCircle className="h-3 w-3 mr-1" /> Return
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
