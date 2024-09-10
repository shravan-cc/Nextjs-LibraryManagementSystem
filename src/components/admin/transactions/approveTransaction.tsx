"use client";

import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { approveTransaction } from "@/lib/action";
import { ITransaction } from "@/models/transaction.model";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ApproveTransaction({
  transaction,
}: {
  transaction: ITransaction;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const handleApprove = async () => {
    const result = await approveTransaction(transaction.id);
    if (result) {
      toast({
        title: "Success",
        description: `Transaction ${transaction.id} successfully approved.`,
        duration: 1500,
        className: "bg-green-100 border-green-500 text-green-800 shadow-lg",
      });
    }
    router.refresh();
  };
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-xs hover:bg-green-100 text-green-600"
      disabled={transaction.status !== "pending"}
      onClick={handleApprove}
    >
      <CheckCircle className="h-4 w-4 mr-1" /> Approve
    </Button>
  );
}
