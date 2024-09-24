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

export default function FilterBookByPrice() {
  const t = useTranslations("UserBooks");
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
  const [price, setPrice] = useState<string>(searchParams.get("price") || "");

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
      <SelectTrigger className="w-[180px] bg-orange-50 border-orange-200 focus:border-CustomOrange focus:ring-CustomOrange transition-all duration-300">
        <SelectValue placeholder={t("Filter by price")} />
      </SelectTrigger>
      <SelectContent className="bg-orange-50 border-orange-200">
        {priceValues.map((price) => (
          <SelectItem
            key={price}
            value={price}
            className="hover:bg-orange-100 transition-colors duration-200"
          >
            {price}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
