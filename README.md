# 晚笺 Vesper

一本只给自己写、给别人读的个人博客。纸色桌灯，文章按主题分成随笔、信号、日常。访客没有后台，也没有评论。

## 本地看

```bash
npm install
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

检查文章格式：

```bash
npm run check:posts
```

生成可部署的静态站：

```bash
npm run build
```

产物在 `out/`。

## 发布一篇文章

在 Cursor 里直接说，例如：

> 帮我发一篇文章。标题是「灯下」，放进「日常」，正文是……

助手会新增 `content/posts/你的英文短链.md`，写好文首信息，然后提交。站点重新构建后就能读到。

文首长这样：

```yaml
---
title: 灯下
summary: 一两句能在目录里读完的导语。
category: days
date: "2026-10-26"
tags:
  - 晚间
draft: false
---
```

正文用 Markdown，接在文首下面。

- 文件名是网址，只用小写英文和连字符，例如 `lamp-still-on.md`。
- `category` 只能是 `content/categories.json` 里已有的 `slug`。
- `date` 写成带引号的 `YYYY-MM-DD`。
- `draft: true` 的文章不会出现在网站上。
- 图片放进 `public/`，正文里写成 `![](/images/desk.jpg)`。

现有主题：

| 名称 | slug | 放什么 |
| --- | --- | --- |
| 随笔 | `notes` | 没有目的地的想法 |
| 信号 | `signal` | 和模型、工具相处的记录 |
| 日常 | `days` | 日子本身 |

想加一个主题，就在 `content/categories.json` 加一项：`slug`、`name`、`seal`（一个字）、`description`。

想在文末署名，改 `src/lib/site.ts` 里的 `author`。

仓库里那几篇是开站时留下的样稿，不需要可以让助手删掉。

## 部署到 GitHub Pages

推送到 GitHub 的 `main` 分支后，打开仓库的 **Settings → Pages → Build and deployment**，Source 选 **GitHub Actions**。

`.github/workflows/pages.yml` 会安装依赖、构建，并把 `out/` 发布出去。

- 仓库名是 `你的用户名.github.io` 时，站点在根路径。
- 其他仓库名会自动挂到 `https://你的用户名.github.io/仓库名/`。

## 给以后来改站点的助手

发布规则写在 `AGENTS.md`。不要加公开的写作后台，不要加评论。这本子保持只读。
