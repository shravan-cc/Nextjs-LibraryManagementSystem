"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterTransactionByStatus() {
  const status = ["All", "approved", "pending", "rejected", "Returned"];
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const [statusValue, setStatusValue] = useState<string>("All");

  const handleValueChange = (term: string) => {
    const params = new URLSearchParams(searchParams);
    setStatusValue(term);
    params.set("page", "1");
    if (term && term !== "All") {
      params.set("status", term);
    } else {
      params.delete("status");
    }
    replace(`${pathName}?${params.toString()}`);
  };
  return (
    <Select value={statusValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Filter by genre" />
      </SelectTrigger>
      <SelectContent>
        {status.map((statusValue) => (
          <SelectItem key={statusValue} value={statusValue}>
            {statusValue}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
