"use client";

import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { DeleteProfessorProps } from "@/lib/definition";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteProfessor } from "@/lib/action";

export default function DeleteProfessor({ professor }: DeleteProfessorProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteProfessor = async (e: React.MouseEvent) => {
    const deletedProfessor = await deleteProfessor(professor.id);
    if (deletedProfessor.success) {
      toast({
        title: "Success",
        description: "Professor deleted successfully from the library.",
        duration: 1500,
        className: "bg-green-100 border-green-500 text-green-800 shadow-lg",
      });
      router.refresh();
    } else {
      toast({
        title: "Failure",
        description: deletedProfessor.message,
        duration: 1500,
        className: "bg-red-100 border-red-500 text-red-800 shadow-lg",
      });
      router.refresh();
    }
    router.refresh();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex-1 bg-red-500 hover:bg-red-600 text-white w-full"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {`"${professor.name}"`}? This action
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
            type="submit"
            variant="destructive"
            onClick={handleDeleteProfessor}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
