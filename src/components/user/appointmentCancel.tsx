"use client";

import { cancelAppointments } from "@/lib/action";
import { Button } from "../ui/button";
import { useToast } from "../hooks/use-toast";
import { useRouter } from "next/navigation";

export default function CancelAppointment({
  eventUuid,
}: {
  eventUuid: string;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const handleCancel = async (e: React.MouseEvent) => {
    const data = await cancelAppointments(eventUuid);
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
    <Button
      variant="outline"
      className="text-red-600 border-red-600 hover:bg-red-100"
      onClick={handleCancel}
    >
      Cancel
    </Button>
  );
}
