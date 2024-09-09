"use client";

import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { approveTransaction, rejectTransaction } from "@/lib/action";
import { ITransaction } from "@/models/transaction.model";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RejectTransaction({
  transaction,
}: {
  transaction: ITransaction;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const handleReject = async () => {
    await rejectTransaction(transaction.id);
    toast({
      title: "Success",
      description: `Transaction ${transaction.id} successfully rejected.`,
      duration: 1500,
      className: "bg-green-100 border-green-500 text-green-800 shadow-lg",
    });
    router.refresh();
  };
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-xs hover:bg-red-100 text-red-600"
      disabled={transaction.status !== "pending"}
      onClick={handleReject}
    >
      <XCircle className="h-4 w-4 mr-1" /> Reject
    </Button>
  );
}
