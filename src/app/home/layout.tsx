import AdminMobileBar from "@/components/admin/mobileNaav";
import AdminNavigation from "@/components/admin/nav";
import Profile from "@/components/profile/profile";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-CustomPeach">
      <header className="sticky top-0 z-10 px-4 lg:px-6 h-16 flex items-center border-b bg-white shadow-md">
        <AdminMobileBar />
        <h1 className="font-bold text-2xl md:text-3xl text-CustomOrange">
          Library Management System
        </h1>
        <Profile />
      </header>
      <div className="flex-1 flex overflow-hidden">
        <nav className="w-64 bg-orange-50 border-r hidden md:block fixed h-[calc(100vh-4rem)] top-16">
          <div className="p-4 space-y-2">
            <AdminNavigation />
          </div>
        </nav>
        <main className="flex-1 overflow-y-auto p-6 md:ml-64">{children}</main>
      </div>
    </div>
  );
}
