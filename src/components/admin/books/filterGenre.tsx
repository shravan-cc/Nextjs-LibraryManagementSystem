"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterGenreProps } from "@/lib/definition";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterGenre({ genres }: filterGenreProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const [genreValue, setGenreValue] = useState<string>(
    searchParams.get("genre") || "All Genres"
  );

  const handleValueChange = (term: string) => {
    const params = new URLSearchParams(searchParams);
    setGenreValue(term);
    params.set("page", "1");
    if (term && term !== "All Genres") {
      params.set("genre", term);
    } else {
      params.delete("genre");
    }
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <Select value={genreValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px] bg-orange-50 border-orange-200 focus:border-CustomOrange focus:ring-CustomOrange transition-all duration-300">
        <SelectValue placeholder="Filter by genre" />
      </SelectTrigger>
      <SelectContent className="bg-orange-50 border-orange-200">
        {genres.map((genre) => (
          <SelectItem
            key={genre}
            value={genre}
            className="hover:bg-orange-100 transition-colors duration-200"
          >
            {genre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
