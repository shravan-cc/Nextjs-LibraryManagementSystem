import LocaleSwitcher from "@/components/LocaleSwitcher";
import { Button } from "@/components/ui/button";
// import Link from "next/link";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("Home");
  return (
    <div className="min-h-screen bg-[#fee7d6]">
      <header className="bg-[#ffd1b0] p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#F25019]">
            {t("ShravanReads")}
          </h1>
          <LocaleSwitcher />
          <nav>
            <Button
              variant="ghost"
              className="text-[#F25019] hover:text-[#F25019]/80"
            >
              {t("About")}
            </Button>
            <Button
              variant="ghost"
              className="text-[#F25019] hover:text-[#F25019]/80"
            >
              {t("Services")}
            </Button>
            <Button
              variant="ghost"
              className="text-[#F25019] hover:text-[#F25019]/80"
            >
              {t("Contact")}
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-8 px-4">
        <section className="text-center py-12">
          <h2 className="text-4xl font-bold text-[#F25019] mb-4">
            {t("Welcome")}
          </h2>
          <p className="text-xl text-gray-700 mb-8">{t("Welcome Message")}</p>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <Button className="bg-[#F25019] hover:bg-[#F25019]/90 text-white">
                {t("SignUp")}
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="border-[#F25019] text-[#F25019] hover:bg-[#F25019]/10"
              >
                {t("Login")}
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 my-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#F25019] mb-2">
              {t("Home-Page.Vast Collection")}
            </h3>
            <p className="text-gray-600">
              {t("Home-Page.Vast Collection Description")}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#F25019] mb-2">
              {t("Home-Page.Easy Management")}
            </h3>
            <p className="text-gray-600">
              {t("Home-Page.Easy Management Description")}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#F25019] mb-2">
              {t("Home-Page.Community Events")}
            </h3>
            <p className="text-gray-600">
              {t("Home-Page.Community Events Description")}
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-[#F25019] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {t("ShravanReads")}
              </h3>
              <p>{t("Home-Page.Empowering readers since 2023")}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                {t("Home-Page.Quick Links")}
              </h4>
              <ul>
                <li>
                  <a href="#" className="hover:underline">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {t("Home-Page.Privacy Policy")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {t("Home-Page.Terms of Service")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                {t("Home-Page.Connect With Us")}
              </h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-[#ffd1b0]">
                  {t("Home-Page.Facebook")}
                </a>
                <a href="#" className="hover:text-[#ffd1b0]">
                  {t("Home-Page.Twitter")}
                </a>
                <a href="#" className="hover:text-[#ffd1b0]">
                  {t("Home-Page.Instagram")}
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
