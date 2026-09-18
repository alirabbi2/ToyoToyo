# 🧸 ToyoToyo — Deploy করার সহজ গাইড (বাংলা)

এই ফাইলটা দেখে দেখে ধাপে ধাপে করলেই আপনার website স্থায়ীভাবে (24/7) live হয়ে যাবে।

---

## 🔑 লগইন তথ্য (seed করার পর)
- **Admin:** admin@toyotoyo.com / admin123
- **Customer (demo):** parent@example.com / demo123

---

## ধাপ ১ — ফ্রি Database (Neon)
1. যান 👉 https://neon.tech → **Sign Up** (Google দিয়ে সহজ)
2. **Create Project** → নাম দিন `toyotoyo`
3. তৈরি হলে **Connection String** copy করুন। দেখতে এমন:
   ```
   postgresql://user:pass@ep-xxxx.neon.tech/neondb?sslmode=require
   ```
4. এটা কোথাও রেখে দিন — পরে লাগবে।

---

## ধাপ ২ — GitHub-এ কোড পাঠান
- আপনার editor/platform-এ থাকা **"Push to GitHub"** বাটন চাপুন।
- Repository নাম দিন `toyotoyo` → Create/Push।

---

## ধাপ ৩ — Vercel-এ Deploy
1. যান 👉 https://vercel.com → **Sign Up with GitHub**
2. **Add New → Project** → `toyotoyo` repo → **Import**
3. **Environment Variables** অংশে দিন:

   | Name           | Value                                              |
   |----------------|----------------------------------------------------|
   | `DATABASE_URL` | (ধাপ ১-এর Neon connection string)                  |
   | `AUTH_SECRET`  | `toyotoyo-secret-2026-change-this-random-987654`   |

4. **Deploy** চাপুন → ২ মিনিট অপেক্ষা করুন।
5. 🎉 আপনি পাবেন: `https://toyotoyo.vercel.app` — সবসময় চালু!

---

## ধাপ ৪ — Database তৈরি + Products ঢোকানো (একবার)
আপনার নিজের কম্পিউটারে terminal খুলে (কোড folder-এর ভেতর):

```bash
# ১) .env ফাইল বানান, ভেতরে Neon-এর DATABASE_URL বসান
#    উদাহরণ: DATABASE_URL="postgresql://...neon.tech/neondb?sslmode=require"

npm install                 # প্যাকেজ ইনস্টল
npx drizzle-kit push        # database টেবিল তৈরি
node scripts/seed.mjs       # admin + ৮টা sample product ঢোকানো
```

হয়ে গেলে website-এ গিয়ে admin@toyotoyo.com / admin123 দিয়ে লগইন করে
`/admin` থেকে নতুন product যোগ/এডিট করতে পারবেন।

---

## ❓ আটকে গেলে
যে ধাপে সমস্যা, সেটার screenshot বা কী লেখা দেখাচ্ছে — সেটা জানালেই সমাধান করে দেওয়া হবে। 💪
