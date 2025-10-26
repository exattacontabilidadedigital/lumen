"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FileText, Video, BookOpen, LayoutDashboard, Users, MessageSquare } from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Artigos",
    href: "/admin/articles",
    icon: FileText,
  },
  {
    title: "Webinars",
    href: "/admin/webinars",
    icon: Video,
  },
  {
    title: "Guias",
    href: "/admin/guides",
    icon: BookOpen,
  },
  {
    title: "Inscrições",
    href: "/admin/inscricoes",
    icon: Users,
  },
  {
    title: "Contatos",
    href: "/admin/contatos",
    icon: MessageSquare,
  },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
