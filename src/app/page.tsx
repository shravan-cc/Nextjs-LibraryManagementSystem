import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fee7d6]">
      <header className="bg-[#ffd1b0] p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#F25019]">ShravanReads</h1>
          <nav>
            <Button
              variant="ghost"
              className="text-[#F25019] hover:text-[#F25019]/80"
            >
              About
            </Button>
            <Button
              variant="ghost"
              className="text-[#F25019] hover:text-[#F25019]/80"
            >
              Services
            </Button>
            <Button
              variant="ghost"
              className="text-[#F25019] hover:text-[#F25019]/80"
            >
              Contact
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-8 px-4">
        <section className="text-center py-12">
          <h2 className="text-4xl font-bold text-[#F25019] mb-4">
            Welcome to ShravanReads
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Your gateway to a world of knowledge and imagination
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <Button className="bg-[#F25019] hover:bg-[#F25019]/90 text-white">
                Sign Up
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="border-[#F25019] text-[#F25019] hover:bg-[#F25019]/10"
              >
                Login
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 my-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#F25019] mb-2">
              Vast Collection
            </h3>
            <p className="text-gray-600">
              Access thousands of books, e-books, and audiobooks from our
              extensive library.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#F25019] mb-2">
              Easy Management
            </h3>
            <p className="text-gray-600">
              Keep track of your borrowed items, due dates, and reading history
              effortlessly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#F25019] mb-2">
              Community Events
            </h3>
            <p className="text-gray-600">
              Join book clubs, author talks, and workshops to connect with
              fellow readers.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-[#F25019] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">LibraryConnect</h3>
              <p>Empowering readers since 2023</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <ul>
                <li>
                  <a href="#" className="hover:underline">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Connect With Us</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-[#ffd1b0]">
                  Facebook
                </a>
                <a href="#" className="hover:text-[#ffd1b0]">
                  Twitter
                </a>
                <a href="#" className="hover:text-[#ffd1b0]">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            © 2023 LibraryConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
