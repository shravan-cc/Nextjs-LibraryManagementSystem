"use client";
import {
  BookIcon,
  Calendar,
  FileText,
  GraduationCap,
  LayoutDashboard,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function AdminNavigation() {
  const pathName = usePathname();
  console.log(pathName);
  const [activeTab, setActiveTab] = useState("dashboard");
  useEffect(() => {
    if (pathName === "/home") {
      setActiveTab("dashboard");
    } else if (pathName.startsWith("/home/books")) {
      setActiveTab("books");
    } else if (pathName.startsWith("/home/members")) {
      setActiveTab("members");
    } else if (pathName.startsWith("/home/transactions")) {
      setActiveTab("transactions");
    } else if (pathName.startsWith("/home/professors")) {
      setActiveTab("professors");
    } else if (pathName.startsWith("/home/appointments")) {
      setActiveTab("appointments");
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
    const path = value === "dashboard" ? "/home" : `/home/${value}`;
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
        label="Members"
        value="members"
      />
      <NavItem
        icon={<FileText className="h-5 w-5" />}
        label="Transactions"
        value="transactions"
      />
      <NavItem
        icon={<GraduationCap className="h-5 w-5" />}
        label="Professors"
        value="professors"
      />
      <NavItem
        icon={<Calendar className="h-5 w-5" />}
        label="Appointments"
        value="appointments"
      />
    </>
  );
}
