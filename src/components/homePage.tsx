"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
      <Input type="text" placeholder="Search books..." className="bg-white" />
      <Button
        type="submit"
        className="bg-CustomOrange hover:bg-CustomDarkOrange text-white"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}
