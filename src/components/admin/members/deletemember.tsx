"use client";

import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { deleteMemberById } from "@/lib/action";
import { IMember } from "@/models/member.model";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DeleteMember({ member }: { member: IMember }) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteMember = async () => {
    const deletedMember = await deleteMemberById(member.id);
    if (deletedMember) {
      toast({
        title: "Success",
        description: "Book deleted successfully from the library.",
        duration: 1500,
        className: "bg-green-100 border-green-500 text-green-800 shadow-lg",
      });
    }
    setIsOpen(false);
    router.refresh();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            Are you sure you want to delete{" "}
            {`"${member.firstName} ${member.lastName}"`}? This action cannot be
            undone.
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
            className="text-xs hover:bg-red-100 text-red-600"
            onClick={handleDeleteMember}
          >
            <Trash2 className="h-3 w-3 mr-1" /> Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
