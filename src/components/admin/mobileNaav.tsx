"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import UserNavigation from "../user-nav";
import { useState } from "react";
import AdminNavigation from "./nav";

export default function AdminMobileBar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-orange-50">
        <nav className="flex flex-col space-y-2">
          <AdminNavigation />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
