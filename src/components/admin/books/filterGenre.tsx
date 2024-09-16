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

  const [genreValue, setGenreValue] = useState<string>("All");

  const handleValueChange = (term: string) => {
    const params = new URLSearchParams(searchParams);
    setGenreValue(term);
    params.set("page", "1");
    if (term && term !== "All") {
      params.set("genre", term);
    } else {
      params.delete("genre");
    }
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <Select value={genreValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Filter by genre" />
      </SelectTrigger>
      <SelectContent>
        {genres.map((genre) => (
          <SelectItem key={genre} value={genre}>
            {genre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
