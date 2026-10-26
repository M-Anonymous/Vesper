import type { Metadata } from "next";
import { Archive } from "@/components/archive";
import { getPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "目录",
  description: "晚笺里的全部文章，按写下的时间排列。",
};

export default function PostsPage() {
  return (
    <Archive
      kicker="目录"
      title="全部文章"
      lede="按写下的时间排着，也可以按主题抽一叠。"
      posts={getPublishedPosts()}
      active="all"
    />
  );
}
