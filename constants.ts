export const AGE_GROUPS = [
  { label: "0–2 Years", min: 0, max: 2, emoji: "🍼" },
  { label: "2–4 Years", min: 2, max: 4, emoji: "🧸" },
  { label: "4–6 Years", min: 4, max: 6, emoji: "🎨" },
  { label: "6–8 Years", min: 6, max: 8, emoji: "🧩" },
  { label: "8–12 Years", min: 8, max: 12, emoji: "🔬" },
];

export const SKILLS = [
  { label: "Cognitive Skills", emoji: "🧠" },
  { label: "Math & Numbers", emoji: "🔢" },
  { label: "Language & Reading", emoji: "🔤" },
  { label: "Creativity", emoji: "🎨" },
  { label: "Problem Solving", emoji: "🧩" },
  { label: "Social Skills", emoji: "🤝" },
  { label: "Fine Motor Skills", emoji: "✋" },
  { label: "STEM & Science", emoji: "🔬" },
];

export const CATEGORIES = [
  "Puzzles",
  "Building Toys",
  "Art & Craft",
  "STEM Toys",
  "Board Games",
  "Learning Kits",
  "Pretend Play",
  "Outdoor Toys",
];

export const PRICE_RANGES = [
  { label: "৳0 – ৳500", min: 0, max: 500 },
  { label: "৳500 – ৳1000", min: 500, max: 1000 },
  { label: "৳1000 – ৳2000", min: 1000, max: 2000 },
  { label: "৳2000+", min: 2000, max: 1000000 },
];

export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
  "returned",
];

export const TRACKING_STEPS = [
  { key: "pending", label: "Order Placed" },
  { key: "confirmed", label: "Order Confirmed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

export function formatTk(n: number) {
  return "৳" + n.toLocaleString("en-BD");
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const SKILL_EMOJI: Record<string, string> = Object.fromEntries(
  SKILLS.map((s) => [s.label, s.emoji])
);
