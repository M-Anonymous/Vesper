import data from "../../content/categories.json";

export type Category = {
  slug: string;
  name: string;
  seal: string;
  description: string;
};

export const categories = data as Category[];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug) ?? null;
}
