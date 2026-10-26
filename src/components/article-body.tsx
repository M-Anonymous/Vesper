import ReactMarkdown, { type Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { withBasePath } from "@/lib/site";

const components: Components = {
  a: ({ href = "", children }) => {
    const external = /^https?:\/\//.test(href);
    const url = external ? href : withBasePath(href);
    return (
      <a
        href={url}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => {
    const url = typeof src === "string" ? withBasePath(src) : undefined;
    // Markdown images have no known dimensions, so they stay native.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt={alt ?? ""} />;
  },
};

export function ArticleBody({ content }: { content: string }) {
  return (
    <div className="vesper-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeHighlight, { detect: false }]]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
