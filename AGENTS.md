<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 晚笺：怎么发布文章

这是主人的私人博客，访客只能阅读。不要添加登录、评论、公开编辑器或数据库。

当主人要求发布、修改或删除文章时：

1. 文章放在 `content/posts/<slug>.md`。`slug` 只用小写英文、数字和连字符。
2. 文首必须包含 `title`、`summary`、`category`、`date`。`date` 用带引号的 `YYYY-MM-DD`。`category` 必须是 `content/categories.json` 里的 `slug`（目前是 `notes` 随笔、`signal` 信号、`days` 日常）。
3. 可选 `tags`（字符串列表）和 `draft: true`。草稿不会出现在页面上。
4. 正文用 Markdown。图片放到 `public/`，在文中使用以 `/` 开头的路径。
5. 新主题写进 `content/categories.json`，字段是 `slug`、`name`、`seal`（一个汉字）、`description`。
6. 署名在 `src/lib/site.ts` 的 `author`。空字符串表示不署名。
7. 改完运行 `npm run check:posts`。它会在 `npm run build` 里再跑一次。
8. 用中文和主人确认文章标题与分类，除非主人已经把正文给全了。样稿可以删。

