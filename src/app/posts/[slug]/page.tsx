import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article-body";
import { ReadingProgress } from "@/components/reading-progress";
import { Seal } from "@/components/seal";
import { getCategory } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import { getPost, getPublishedPosts } from "@/lib/posts";
import { sheet, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "找不到这篇" };
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const category = getCategory(post.category);

  return (
    <>
      <ReadingProgress />
      <article className={`${sheet} pb-24 pt-12 md:pt-16`}>
        <p className="text-sm text-muted-foreground">
          <Link href="/posts" className="hover:text-foreground">
            目录
          </Link>
          <span aria-hidden> / </span>
          <Link
            href={`/categories/${post.category}`}
            className="hover:text-foreground"
          >
            {category?.name}
          </Link>
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Seal char={category?.seal ?? "笺"} />
          <p className="text-sm tracking-[0.14em] text-muted-foreground">
            {category?.name}
          </p>
        </div>
        <h1 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-sm text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span> · 约 {post.minutes} 分钟</span>
        </p>
        <p className="mt-8 font-serif text-xl leading-loose text-foreground/80">
          {post.summary}
        </p>
        <div className="mt-10">
          <ArticleBody content={post.content} />
        </div>
        {post.tags.length > 0 ? (
          <ul className="mt-12 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="mt-12 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
          写于 {formatDate(post.date)} · {category?.name}
          {site.author ? ` · ${site.author}` : ""}
        </p>
      </article>
    </>
  );
}
