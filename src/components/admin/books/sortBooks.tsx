"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SortBooks() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const [sortBy, setSort] = useState<string>("");

  const handleValueChange = (term: string) => {
    const params = new URLSearchParams(searchParams);
    setSort(term);
    params.set("page", "1");
    if (term && term !== "") {
      params.set("sort", term);
    } else {
      params.delete("sort");
    }
    replace(`${pathName}?${params.toString()}`);
  };
  return (
    <Select value={sortBy} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="title">Title</SelectItem>
        <SelectItem value="author">Author</SelectItem>
        <SelectItem value="availability">Availability</SelectItem>
      </SelectContent>
    </Select>
  );
}
