"use client";

import { cancelAppointments } from "@/lib/action";
import { Button } from "../ui/button";
import { useToast } from "../hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function CancelAppointment({
  eventUuid,
  profName,
}: {
  eventUuid: string;
  profName: string;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleCancel = async (e: React.MouseEvent) => {
    const data = await cancelAppointments(eventUuid);
    setIsOpen(false);
    if (data) {
      toast({
        title: "Success",
        description: "Appointment cancelled successfully from the library.",
        duration: 1500,
        className: "bg-green-100 border-green-500 text-green-800 shadow-lg",
      });
    }
    router.refresh();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-red-600 border-red-600 hover:bg-red-100"
        >
          Cancel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel the appointment with{" "}
            <span className="font-bold">{profName}</span>? This action cannot be
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

          <Button type="submit" variant="destructive" onClick={handleCancel}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
