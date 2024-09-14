"use client";
import { BookIcon, FileText, LayoutDashboard, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function UserNavigation() {
  const pathName = usePathname();
  const [activeTab, setActiveTab] = useState("dashboard");
  useEffect(() => {
    if (pathName === "/user") {
      setActiveTab("dashboard");
    } else if (pathName.startsWith("/user/books")) {
      setActiveTab("books");
    } else if (pathName.startsWith("/user/MyBooks")) {
      setActiveTab("MyBooks");
    } else if (pathName.startsWith("/user/requests")) {
      setActiveTab("requests");
    }
  }, [pathName]);
  const NavItem = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }) => {
    const path = value === "dashboard" ? "/user" : `/user/${value}`;
    const isActive =
      value === "dashboard"
        ? activeTab === value && pathName === path
        : activeTab === value && pathName.startsWith(path);

    return (
      <Link href={path}>
        <Button
          variant={activeTab === value ? "default" : "ghost"}
          className={`w-full justify-start ${
            isActive
              ? "bg-orange-500 text-white hover:bg-CustomOrange"
              : "hover:bg-CustomPeach bg-orange-50 text-black"
          }`}
          onClick={() => {
            setActiveTab(value);
          }}
        >
          {icon}
          <span className="ml-2">{label}</span>
        </Button>
      </Link>
    );
  };
  return (
    <>
      <NavItem
        icon={<LayoutDashboard className="h-5 w-5" />}
        label="Dashboard"
        value="dashboard"
      />
      <NavItem
        icon={<BookIcon className="h-5 w-5" />}
        label="Books"
        value="books"
      />
      <NavItem
        icon={<UsersIcon className="h-5 w-5" />}
        label="My Books"
        value="MyBooks"
      />
      <NavItem
        icon={<FileText className="h-5 w-5" />}
        label="Requests"
        value="requests"
      />
    </>
  );
}
