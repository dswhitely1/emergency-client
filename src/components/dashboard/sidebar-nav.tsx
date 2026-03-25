// src/components/dashboard/sidebar-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/dashboard", label: "Application", icon: FileText, exact: true },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/employment", label: "Employment", icon: Briefcase },
  { href: "/dashboard/education", label: "Education", icon: GraduationCap },
  { href: "/dashboard/references", label: "References", icon: Users },
];

export function SidebarNav() {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <nav className="flex flex-col gap-1 p-4 w-64 shrink-0 border-r min-h-[calc(100vh-4rem)]">
      <h2 className="px-3 mb-2 text-lg font-semibold tracking-tight">
        My Application
      </h2>
      <Separator className="mb-2" />
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant={isActive(item.href, item.exact) ? "secondary" : "ghost"}
          className={cn("justify-start gap-2")}
          asChild
        >
          <Link href={item.href}>
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
