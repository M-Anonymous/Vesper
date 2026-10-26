"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { sheet } from "@/lib/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={`${sheet} pb-24 pt-20`}>
      <p className="kicker">读到一半</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight">这一页没有展开</h1>
      <p className="mt-5 font-serif text-lg leading-relaxed text-muted-foreground">
        页面在渲染时停住了。可以再试一次，或回到目录。
      </p>
      <div className="mt-8">
        <Button type="button" onClick={reset} className="rounded-full px-4">
          再试一次
        </Button>
      </div>
    </div>
  );
}
