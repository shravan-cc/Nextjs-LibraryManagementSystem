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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-CustomPeach to-orange-100">
      <header className="sticky top-0 z-10 px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white bg-opacity-90 backdrop-blur-md shadow-md transition-all duration-300">
        <div className="flex items-center">
          <Sheet>
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
                <UserNavigation />
              </nav>
            </SheetContent>
          </Sheet>
          <h1 className="font-bold text-2xl md:text-3xl text-CustomOrange ml-2 md:ml-0">
            Library Management System
          </h1>
        </div>
        <Profile />
      </header>
      <div className="flex-1 flex overflow-hidden">
        <nav className="w-64 bg-gradient-to-br from-orange-50 to-orange-100 border-r hidden md:block fixed h-[calc(100vh-4rem)] top-16 transition-all duration-300">
          <div className="p-4 space-y-2">
            <UserNavigation />
          </div>
        </nav>
        <main className="flex-1 overflow-y-auto p-6 md:ml-64 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
