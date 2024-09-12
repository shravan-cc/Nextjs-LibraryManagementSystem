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
import { ArrowLeftCircle, RotateCcw } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { returnBook } from "@/lib/action";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/toottip";

export default function ReturnBook({
  bookId,
  memberId,
  status,
}: {
  bookId: number;
  memberId: number;
  status: string;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleReturn = async () => {
    await returnBook(bookId, memberId);
    toast({
      title: "Success",
      description: `Book ${bookId} returned successfully to the library.`,
      duration: 1500,
      className: "bg-green-100 border-green-500 text-green-800 shadow-lg",
    });
    router.refresh();
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-blue-50 border-blue-200 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 ease-in-out transform hover:scale-105"
                onClick={() => setIsOpen(true)}
                disabled={status === "Returned"}
              >
                <RotateCcw className="h-4 w-4 text-blue-500" />
                <span className="sr-only">Return</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Return</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Return</DialogTitle>
          <DialogDescription>
            Are you sure you want to return{" "}
            {`"${bookId}
            "`}
            ? This action cannot be undone.
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
