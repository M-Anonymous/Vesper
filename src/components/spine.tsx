import { site } from "@/lib/site";

export function Spine() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-0 z-0 hidden w-14 items-center justify-center xl:flex"
    >
      <p
        className="text-[0.8rem] tracking-[0.42em] text-foreground/30"
        style={{ writingMode: "vertical-rl" }}
      >
        {site.name} · 私人笔记
      </p>
    </div>
  );
}
