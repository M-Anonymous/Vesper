import { sheet, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border/80">
      <div className={`${sheet} flex flex-col gap-2 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between`}>
        <p>
          {site.latin} · {site.name}
        </p>
        <p>原稿只此一份。路过的人只读。</p>
      </div>
    </footer>
  );
}
