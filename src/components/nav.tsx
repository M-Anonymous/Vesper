"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "今夜" },
  { href: "/posts", label: "目录" },
  { href: "/about", label: "关于" },
];

function normalize(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

function isActive(href: string, pathname: string) {
  const path = normalize(pathname);
  if (href === "/") return path === "/";
  if (href === "/posts") {
    return (
      path === "/posts" ||
      path.startsWith("/posts/") ||
      path.startsWith("/categories")
    );
  }
  return path === href;
}

export function Nav() {
  const pathname = usePathname();

  return (
    <nav aria-label="页内" className="flex items-center gap-0.5">
      {links.map((link) => {
        const active = isActive(link.href, pathname);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
              active && "bg-foreground/8 text-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
