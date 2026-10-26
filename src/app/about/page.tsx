import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { sheet, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于",
  description: "晚笺是一本只由主人书写、对访客只读的笔记。",
};

export default function AboutPage() {
  return (
    <div className={`${sheet} pb-24 pt-12 md:pt-16`}>
      <p className="kicker">关于</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
        一盏留给自己的灯
      </h1>
      <div className="vesper-prose mt-8">
        <p>
          {site.name}是一本私人笔记。文章只有我来写，打开网站的人只能阅读。没有评论，没有投稿，也没有一个公开的编辑框。
        </p>
        <p>
          页面故意做得慢：纸色、印章、一点点会自己连上的光点。那是晚上的桌灯，不是一块催你点击的仪表盘。字要大，行距要松，读长文的时候眼睛可以停住。
        </p>
        <p>现在有三个主题。以后想加，说一声就行。</p>
      </div>
      <ul className="mt-6 space-y-3">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/categories/${category.slug}`}
              className="font-serif text-lg hover:text-seal"
            >
              {category.seal} {category.name}
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {category.description}
            </p>
          </li>
        ))}
      </ul>
      <section className="mt-14 rounded-2xl border border-border bg-card/70 p-6 md:p-8">
        <h2 className="font-serif text-2xl">想发一篇新的</h2>
        <div className="mt-4 space-y-3 font-serif text-lg leading-loose">
          <p>在 Cursor 里直接对我说。例如：</p>
          <p className="border-l-2 border-seal pl-4 text-muted-foreground">
            帮我发一篇文章。标题是……，放进「信号」，正文是……
          </p>
          <p>
            我会把它写成 Markdown，放进仓库，推上去。访客看到的仍然只是阅读页。
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            署名现在空着。想在文末写上名字，告诉我，或改{" "}
            <code>src/lib/site.ts</code> 里的 author。
            {site.author ? ` 当前署名是${site.author}。` : ""}
          </p>
        </div>
      </section>
    </div>
  );
}
