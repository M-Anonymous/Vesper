import Link from "next/link";
import { Seal } from "@/components/seal";
import { getCategory } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/posts";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ol className="mt-4 border-t border-border">
      {posts.map((post, index) => {
        const category = getCategory(post.category);
        return (
          <li
            key={post.slug}
            className="rise border-b border-border"
            style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
          >
            <Link
              href={`/posts/${post.slug}`}
              className="group flex gap-4 py-5"
            >
              <Seal char={category?.seal ?? "笺"} />
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="font-serif text-xl leading-snug text-foreground transition-colors group-hover:text-seal">
                    {post.title}
                  </span>
                  <time
                    dateTime={post.date}
                    className="shrink-0 text-sm text-muted-foreground"
                  >
                    {formatDate(post.date)}
                  </time>
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">
                  {category?.name} · {post.summary}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
