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
import { deleteTransaction } from "@/lib/action";
import { RequestProps } from "@/lib/definition";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { Button } from "../ui/button";

export default function CancelTransaction({
  request,
}: {
  request: RequestProps;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    const deletedMember = await deleteTransaction(request.id);
    if (deletedMember) {
      toast({
        title: "Success",
        description: "Request deleted successfully from the library.",
        duration: 1500,
        className: "bg-green-100 border-green-500 text-green-800 shadow-lg",
      });
    }
    router.refresh();
  };
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs hover:bg-orange-100"
            disabled={request.status !== "pending"}
          >
            <Trash2 className="h-3 w-3 mr-1" /> Cancel
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this request ? This action cannot
              be undone.
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
            {request.status === "pending" && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs hover:bg-orange-100"
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </td>
  );
}
