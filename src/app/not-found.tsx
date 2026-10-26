import Link from "next/link";
import { sheet } from "@/lib/site";

export default function NotFound() {
  return (
    <div className={`${sheet} pb-24 pt-20`}>
      <p className="kicker">404</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
        这页纸是空白的
      </h1>
      <p className="mt-5 max-w-md font-serif text-lg leading-relaxed text-muted-foreground">
        也许文章还没写下，也许地址抄错了。
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex font-serif text-lg underline decoration-signal/50 underline-offset-8 hover:text-seal"
      >
        回到今夜
      </Link>
    </div>
  );
}
