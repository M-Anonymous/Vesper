import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Archive } from "@/components/archive";
import { categories, getCategory } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "没有这个主题" };
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <Archive
      kicker="主题"
      title={category.name}
      lede={category.description}
      posts={getPostsByCategory(category.slug)}
      active={category.slug}
    />
  );
}
