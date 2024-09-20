"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar({ type }: { type: string }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathName}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder={`Search ${type}...`}
          className="bg-orange-50 border-orange-200 hover:outline-none focus:border-CustomOrange focus:outline-none focus:ring-2 focus:ring-CustomOrange transition-all duration-300 pl-10"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-400" />
      </div>
      <Button
        type="submit"
        className="bg-CustomOrange hover:bg-CustomDarkOrange text-white transition-colors duration-300"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}
