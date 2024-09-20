"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CheckDueToday() {
  const today = new Date();
  const dueDate = today.toISOString().slice(0, 10);
  const status = ["All", "approved", "pending", "rejected", "Returned"];
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const [isDueToday, setIsDueToday] = useState<boolean>(
    searchParams.get("duedate") === dueDate
  );

  const handleDueToday = (term: boolean) => {
    const params = new URLSearchParams(searchParams);
    setIsDueToday(term);
    params.set("page", "1");
    if (term) {
      params.set("duedate", dueDate);
    } else {
      params.delete("duedate");
    }
    replace(`${pathName}?${params.toString()}`);
  };
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="due-today"
        checked={isDueToday}
        onCheckedChange={handleDueToday}
      />
      <label htmlFor="due-today" className="text-sm font-medium text-gray-700">
        Due Today
      </label>
    </div>
  );
}
