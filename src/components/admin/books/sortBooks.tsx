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
import { useTranslations } from "next-intl";

export default function SortBooks() {
  const t = useTranslations("UserBooks");
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
      <SelectTrigger className="w-[180px] bg-orange-50 border-orange-200 focus:border-CustomOrange focus:ring-CustomOrange transition-all duration-300">
        <SelectValue placeholder={t("Sort by")} />
      </SelectTrigger>
      <SelectContent className="bg-orange-50 border-orange-200">
        <SelectItem
          value="title"
          className="hover:bg-orange-100 transition-colors duration-200"
        >
          Title
        </SelectItem>
        <SelectItem
          value="author"
          className="hover:bg-orange-100 transition-colors duration-200"
        >
          Author
        </SelectItem>
        <SelectItem
          value="availableCopies"
          className="hover:bg-orange-100 transition-colors duration-200"
        >
          Availability
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
