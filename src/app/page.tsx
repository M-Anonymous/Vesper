import Link from "next/link";
import { InkRule } from "@/components/ink-rule";
import { PostList } from "@/components/post-list";
import { Seal } from "@/components/seal";
import { SignalStaff } from "@/components/signal-staff";
import { categories, getCategory } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import { getPostsByCategory, getPublishedPosts } from "@/lib/posts";
import { sheet, site } from "@/lib/site";

export default function HomePage() {
  const posts = getPublishedPosts();
  const [featured, ...rest] = posts;
  const featuredCategory = featured ? getCategory(featured.category) : null;

  return (
    <div className={`${sheet} pb-24 pt-12 md:pt-16`}>
      <header className="rise">
        <p className="kicker flex items-center gap-2">
          <span className="pulse" aria-hidden />
          Evening notes
        </p>
        <h1 className="mt-6 font-display text-6xl leading-none text-foreground md:text-8xl">
          <span className="block italic">{site.latin}</span>
          <span className="mt-4 block font-serif text-4xl font-normal tracking-[0.22em] md:text-5xl">
            {site.name}
          </span>
        </h1>
        <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed md:text-xl md:leading-relaxed">
          把想法放慢一点。这里只放我自己写下的东西，路过的人可以坐下来读。
        </p>
        <SignalStaff />
        <InkRule />
      </header>

      {featured ? (
        <article className="rise mt-14" style={{ animationDelay: "120ms" }}>
          <Link
            href={`/categories/${featured.category}`}
            className="group inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground"
          >
            <Seal char={featuredCategory?.seal ?? "笺"} />
            <span>{featuredCategory?.name}</span>
          </Link>
          <h2 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
            <Link
              href={`/posts/${featured.slug}`}
              className="transition-colors hover:text-seal"
            >
              {featured.title}
            </Link>
          </h2>
          <p className="mt-5 font-serif text-lg leading-loose text-muted-foreground">
            {featured.summary}
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            <time dateTime={featured.date}>{formatDate(featured.date)}</time>
            <span> · 约 {featured.minutes} 分钟</span>
          </p>
          <Link
            href={`/posts/${featured.slug}`}
            className="mt-6 inline-flex items-center gap-2 font-serif text-lg text-foreground underline decoration-signal/50 underline-offset-8 transition-colors hover:text-seal"
          >
            读下去
          </Link>
        </article>
      ) : (
        <p className="mt-16 font-serif text-lg leading-relaxed">
          本子还是空的。想写下第一篇时，直接告诉我标题、分类和正文。
        </p>
      )}

      {rest.length > 0 ? (
        <section className="mt-16">
          <h2 className="kicker">其余</h2>
          <PostList posts={rest} />
        </section>
      ) : null}

      <section className="mt-16">
        <h2 className="kicker">主题</h2>
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {categories.map((category) => {
            const count = getPostsByCategory(category.slug).length;
            return (
              <li key={category.slug}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="group flex items-center gap-4 py-4"
                >
                  <Seal char={category.seal} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-serif text-xl transition-colors group-hover:text-seal">
                        {category.name}
                      </span>
                      <span className="text-sm text-muted-foreground">{count} 篇</span>
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {category.description}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
