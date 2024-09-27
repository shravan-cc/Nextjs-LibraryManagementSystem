"use client";

import { Button } from "@/components/ui/button";
import { updateStatus } from "@/lib/action";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RefreshProfessor({
  professorEmail,
}: {
  professorEmail: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleRefresh = async (e: React.MouseEvent) => {
    setIsLoading(true);
    try {
      console.log("Refreshing...");
      await updateStatus(professorEmail);
      router.refresh();
    } catch (error) {
      console.error("Error refreshing professor status:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant="outline"
      className="flex-1 min-w-[calc(50%-0.25rem)]"
      onClick={handleRefresh}
    >
      {isLoading ? (
        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <RefreshCw className="mr-2 h-4 w-4" />
      )}
      {isLoading ? "Refreshing..." : "Refresh"}
    </Button>
  );
}
