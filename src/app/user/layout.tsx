import Profile from "@/components/profile/profile";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UserNavigation from "@/components/user-nav";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-CustomPeach">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white shadow-md">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-orange-50">
            <nav className="flex flex-col space-y-2">
              <UserNavigation />
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="font-bold text-2xl md:text-3xl text-CustomOrange">
          Library Management System
        </h1>
        <Profile />
      </header>
      <div className="flex-1 flex">
        <nav className="w-64 bg-orange-50 border-r hidden md:block">
          <div className="p-4 space-y-2">
            <UserNavigation />
          </div>
        </nav>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
