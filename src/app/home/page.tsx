import Home from "@/components/homePage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { fetchBooks } from "@/lib/action";
import { IBook } from "@/models/book.model";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookCopy,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  User,
  Users,
} from "lucide-react";
import SignOut from "../../components/auth/signout";

export default async function HomePage() {
  const books: IBook[] | undefined = await fetchBooks();
  return (
    <>
      {/* <Home books={books}>
        <SignOut></SignOut>
      </Home> */}
      <div className="min-h-screen flex flex-col bg-CustomPeach">
        <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white shadow-md">
          <h1 className="font-bold text-2xl md:text-3xl text-CustomOrange">
            Library Management System
          </h1>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/user.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Name</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      mail@gmail.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 text-sm">
                  <div className="flex items-center mb-2">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                    <span className="flex-1">
                      123 Library Street, Booktown, BK 12345, United States
                    </span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                <form>
                  <Button type="submit">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Button>
                </form>
              </DropdownMenuItem> */}
                <SignOut />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto py-6">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-6">
              <Home />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {books?.map((book) => (
                <Card
                  key={book.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white"
                >
                  <div className="bg-CustomOrange h-1 w-full"></div>
                  <CardHeader className="p-4 pb-2">
                    <h3 className="font-bold text-sm line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {book.author}
                    </p>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 pb-0">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {book.genre}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {book.pages} pages
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      <span className="font-semibold">Publisher:</span>{" "}
                      {book.publisher}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <BookCopy className="h-3 w-3 mr-1" />
                        <span>
                          {book.availableCopies}/{book.totalCopies}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>
                          {book.totalCopies - book.availableCopies} borrowed
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-2 bg-orange-50 flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs hover:bg-orange-100"
                    >
                      Issue
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs hover:bg-orange-100"
                    >
                      Return
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-8 space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-white hover:bg-orange-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white hover:bg-orange-100"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
