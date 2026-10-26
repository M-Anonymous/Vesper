import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const categories = JSON.parse(
  fs.readFileSync(path.join(root, "content", "categories.json"), "utf8"),
);
const categorySlugs = new Set();
const errors = [];

if (!Array.isArray(categories) || categories.length === 0) {
  errors.push("content/categories.json must list at least one category");
}

for (const category of categories) {
  if (!category.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(category.slug)) {
    errors.push(`category slug is invalid: ${category.slug}`);
  }
  if (categorySlugs.has(category.slug)) {
    errors.push(`duplicate category: ${category.slug}`);
  }
  categorySlugs.add(category.slug);
  for (const field of ["name", "seal", "description"]) {
    if (typeof category[field] !== "string" || !category[field].trim()) {
      errors.push(`category ${category.slug || "?"} missing ${field}`);
    }
  }
}

const postsDir = path.join(root, "content", "posts");
const files = fs.existsSync(postsDir)
  ? fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"))
  : [];
const seen = new Set();

for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
  const { data, content } = matter(raw);
  const problems = [];

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    problems.push("filename must be a lowercase latin slug");
  }
  if (seen.has(slug)) problems.push("duplicate slug");
  seen.add(slug);
  if (typeof data.title !== "string" || !data.title.trim()) {
    problems.push("missing title");
  }
  if (typeof data.summary !== "string" || !data.summary.trim()) {
    problems.push("missing summary");
  }
  const date =
    data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date;
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    problems.push("date must be YYYY-MM-DD");
  }
  if (!categorySlugs.has(data.category)) {
    problems.push(`unknown category ${data.category}`);
  }
  if (data.draft != null && typeof data.draft !== "boolean") {
    problems.push("draft must be true or false");
  }
  if (data.tags != null && !Array.isArray(data.tags)) {
    problems.push("tags must be a list");
  }
  if (!content.trim()) problems.push("empty body");

  for (const problem of problems) errors.push(`${file}: ${problem}`);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`ok ${files.length} posts, ${categories.length} categories`);
