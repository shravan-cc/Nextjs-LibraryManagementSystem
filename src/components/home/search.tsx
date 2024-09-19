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
    <div className="flex w-full max-w-sm items-center space-x-2 ">
      <Input
        type="text"
        placeholder={`Search ${type}...`}
        className="bg-white"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <Button
        type="submit"
        className="bg-CustomOrange hover:bg-CustomDarkOrange text-white"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}
