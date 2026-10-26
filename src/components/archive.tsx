import { CategoryNav } from "@/components/category-nav";
import { PostList } from "@/components/post-list";
import { groupByYear, type Post } from "@/lib/posts";
import { sheet } from "@/lib/site";

export function Archive({
  kicker,
  title,
  lede,
  posts,
  active,
}: {
  kicker: string;
  title: string;
  lede: string;
  posts: Post[];
  active: string;
}) {
  const groups = groupByYear(posts);

  return (
    <div className={`${sheet} pb-24 pt-12 md:pt-16`}>
      <p className="kicker">{kicker}</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-muted-foreground">
        {lede}
      </p>
      <CategoryNav active={active} />
      {posts.length === 0 ? (
        <p className="mt-16 font-serif text-lg leading-relaxed">这一栏还空着。</p>
      ) : (
        groups.map(([year, items]) => (
          <section key={year} className="mt-12">
            <h2 className="font-display text-sm tracking-[0.22em] text-muted-foreground">
              {year}
            </h2>
            <PostList posts={items} />
          </section>
        ))
      )}
    </div>
  );
}
