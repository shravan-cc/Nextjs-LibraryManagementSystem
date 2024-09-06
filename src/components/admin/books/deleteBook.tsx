import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { BookRepository } from "@/repositories/book.repository";
import { db } from "@/lib/db";
import { IBook } from "@/models/book.model";
import Link from "next/link";

const bookRepo = new BookRepository(db);

export default async function DeleteBook({ book }: { book: IBook }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs hover:bg-orange-100"
        >
          <Trash2 className="h-3 w-3 mr-1" /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {`"${book.title}"`}? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Link href="/home/books">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </Link>
          <form
            action={async () => {
              "use server";
              const result = await bookRepo.delete(book.id);
              if (result) {
                redirect("/home/books");
              }
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
