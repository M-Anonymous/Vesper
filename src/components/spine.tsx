import { site } from "@/lib/site";

export function Spine() {
  return (
    <p
      aria-hidden
      className="pointer-events-none fixed bottom-10 left-6 top-24 z-0 hidden text-sm tracking-[0.45em] text-foreground/35 xl:block"
      style={{ writingMode: "vertical-rl" }}
    >
      {site.latin} · {site.name} · 私人笔记
    </p>
  );
}
