"use client";

import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/toottip";
import { rejectTransaction } from "@/lib/action";
import { ITransaction } from "@/models/transaction.model";
import { XCircle } from "lucide-react";
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="bg-red-50 border-red-200 hover:bg-red-100 hover:text-red-600 transition-all duration-200 ease-in-out transform hover:scale-105"
            disabled={transaction.status !== "pending"}
            onClick={handleReject}
          >
            <XCircle className="h-4 w-4 text-red-500" />
            <span className="sr-only">Reject</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Reject</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
