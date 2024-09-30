"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import UserNavigation from "../user-nav";
import { useState } from "react";

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-CustomOrange hover:bg-orange-100 transition-colors duration-200"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-64 bg-gradient-to-br from-orange-50 to-orange-100"
      >
        <nav className="flex flex-col space-y-2 mt-8">
          <UserNavigation closeSheet={closeSheet} />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
