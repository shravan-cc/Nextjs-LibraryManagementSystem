"use client";

import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/toottip";
import { approveTransaction } from "@/lib/action";
import { ITransaction } from "@/models/transaction.model";
import { CheckCircle2 } from "lucide-react";
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="bg-green-50 border-green-200 hover:bg-green-100 hover:text-green-600 transition-all duration-200 ease-in-out transform hover:scale-105"
            disabled={transaction.status !== "pending"}
            onClick={handleApprove}
          >
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span className="sr-only">Approve</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Approve</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
