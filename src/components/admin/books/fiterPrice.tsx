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

export default function FilterBookByPrice() {
  const priceValues = [
    "Price",
    "₹0 - ₹149",
    "₹150 - ₹299",
    "₹300 - ₹449",
    "Above ₹450",
  ];
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const [price, setPrice] = useState<string>(
    searchParams.get("price") || "Price"
  );

  const handleValueChange = (term: string) => {
    const params = new URLSearchParams(searchParams);
    setPrice(term);
    params.set("page", "1");
    if (term && term !== "Price") {
      params.set("price", term);
    } else {
      params.delete("price");
    }
    replace(`${pathName}?${params.toString()}`);
  };
  return (
    <Select value={price} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Filter by genre" />
      </SelectTrigger>
      <SelectContent>
        {priceValues.map((price) => (
          <SelectItem key={price} value={price}>
            {price}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
