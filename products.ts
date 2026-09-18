import { db } from "@/db";
import { products, reviews } from "@/db/schema";
import { and, desc, eq, gte, lte, or, ilike, sql, type SQL } from "drizzle-orm";

export type ProductFilters = {
  q?: string;
  minAge?: number;
  maxAge?: number;
  skill?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  sort?: string;
};

export async function getProducts(filters: ProductFilters = {}) {
  const conds: SQL[] = [];
  if (filters.q) {
    const like = `%${filters.q}%`;
    conds.push(
      or(
        ilike(products.name, like),
        ilike(products.description, like),
        ilike(products.category, like)
      )!
    );
  }
  if (filters.minAge !== undefined) conds.push(gte(products.maxAge, filters.minAge));
  if (filters.maxAge !== undefined) conds.push(lte(products.minAge, filters.maxAge));
  if (filters.category) conds.push(eq(products.category, filters.category));
  if (filters.skill)
    conds.push(sql`${products.skills} ? ${filters.skill}`);
  if (filters.featured) conds.push(eq(products.featured, true));
  if (filters.bestSeller) conds.push(eq(products.bestSeller, true));
  if (filters.newArrival) conds.push(eq(products.newArrival, true));

  const effPrice = sql`COALESCE(${products.discountPrice}, ${products.price})`;
  if (filters.minPrice !== undefined)
    conds.push(gte(effPrice, filters.minPrice) as SQL);
  if (filters.maxPrice !== undefined)
    conds.push(lte(effPrice, filters.maxPrice) as SQL);

  let order;
  switch (filters.sort) {
    case "price_asc":
      order = sql`${effPrice} ASC`;
      break;
    case "price_desc":
      order = sql`${effPrice} DESC`;
      break;
    case "rating":
      order = desc(products.rating);
      break;
    default:
      order = desc(products.createdAt);
  }

  const rows = await db
    .select()
    .from(products)
    .where(conds.length ? and(...conds) : undefined)
    .orderBy(order);
  return rows;
}

export async function getProductBySlug(slug: string) {
  const rows = await db.select().from(products).where(eq(products.slug, slug));
  return rows[0] ?? null;
}

export async function getProductReviews(productId: number) {
  return db
    .select()
    .from(reviews)
    .where(and(eq(reviews.productId, productId), eq(reviews.approved, true)))
    .orderBy(desc(reviews.createdAt));
}

export async function getRelated(category: string, excludeId: number) {
  return db
    .select()
    .from(products)
    .where(and(eq(products.category, category)))
    .orderBy(desc(products.rating))
    .limit(5)
    .then((r) => r.filter((p) => p.id !== excludeId).slice(0, 4));
}
