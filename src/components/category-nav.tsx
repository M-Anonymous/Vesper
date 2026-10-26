import Link from "next/link";
import { categories } from "@/lib/categories";
import { getPublishedPosts } from "@/lib/posts";
import { cn } from "@/lib/utils";

export function CategoryNav({ active }: { active: string }) {
  const posts = getPublishedPosts();
  const chips = [
    { href: "/posts", slug: "all", label: "全部", count: posts.length },
    ...categories.map((category) => ({
      href: `/categories/${category.slug}`,
      slug: category.slug,
      label: category.name,
      count: posts.filter((post) => post.category === category.slug).length,
    })),
  ];

  return (
    <div className="mt-8 flex flex-wrap gap-2" aria-label="按主题">
      {chips.map((chip) => {
        const selected = chip.slug === active;
        return (
          <Link
            key={chip.slug}
            href={chip.href}
            aria-current={selected ? "page" : undefined}
            className={cn(
              "rounded-full border px-3 py-1 text-sm transition-colors",
              selected
                ? "border-transparent bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
            )}
          >
            {chip.label}
            <span className={cn("ml-1.5 text-xs", selected ? "opacity-75" : "opacity-60")}>
              {chip.count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
