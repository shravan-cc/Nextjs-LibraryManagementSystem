"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  LayoutDashboard,
  BookIcon,
  UsersIcon,
  FileText,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function UserNavigation() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const NavItem = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }) => (
    <Link href={`/user/${value}`}>
      <Button
        variant={activeTab === value ? "default" : "ghost"}
        className={`w-full justify-start ${
          activeTab === value
            ? "bg-orange-500 text-white hover:bg-CustomOrange"
            : "hover:bg-CustomPeach"
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
