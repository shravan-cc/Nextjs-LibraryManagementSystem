"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
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

export default function AdminNavigation() {
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
    <Link href={`/home/${value}`}>
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
        label="Members"
        value="members"
      />
      <NavItem
        icon={<FileText className="h-5 w-5" />}
        label="Transactions"
        value="transactions"
      />
      {/* <NavItem
        icon={<ClipboardList className="h-5 w-5" />}
        label="Transaction Requests"
        value="requests"
      /> */}
    </>
  );
}
