import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getOrderByCode(code: string) {
  const rows = await db.select().from(orders).where(eq(orders.orderCode, code));
  return rows[0] ?? null;
}

export async function getOrdersByUser(userId: number) {
  return db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
}

export async function getAllOrders() {
  return db.select().from(orders).orderBy(desc(orders.createdAt));
}
