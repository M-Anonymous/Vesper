export const site = {
  name: "晚笺",
  latin: "Vesper",
  description: "一个人的晚间笔记。写给自己看，也留给路过的人慢慢读。",
  /**
   * 填上你的名字后，会显示在每篇文章末尾。留空则不署名。
   */
  author: "",
  locale: "zh-CN",
} as const;

export const sheet = "mx-auto w-full max-w-[42rem] px-5 md:px-8";

export function withBasePath(path: string) {
  if (!path.startsWith("/")) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
