import Link from "next/link";
import { Nav } from "@/components/nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { sheet, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-foreground focus:px-3 focus:py-1 focus:text-background"
      >
        跳到正文
      </a>
      <div className={`${sheet} flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3`}>
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl italic leading-none">
            {site.latin}
          </span>
          <span className="font-serif text-sm tracking-[0.22em]">{site.name}</span>
        </Link>
        <div className="flex items-center gap-1">
          <Nav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
