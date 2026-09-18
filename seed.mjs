import "dotenv/config";
import pg from "pg";
import bcrypt from "bcryptjs";

const { Pool } = pg;
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@127.0.0.1:5432/app_db",
});

const products = [
  {
    name: "Rainbow Wooden Building Blocks (100 pcs)",
    slug: "rainbow-wooden-building-blocks",
    shortDescription: "A classic 100-piece wooden block set that builds creativity and fine motor skills.",
    description: "Our Rainbow Wooden Building Blocks are made from smooth, non-toxic beech wood and painted with water-based colors. This 100-piece set encourages open-ended play, helping children build towers, bridges, and imaginary worlds while developing spatial reasoning and balance.",
    price: 1500, discountPrice: 1250, sku: "TOY-BLK-100", stock: 40,
    category: "Building Toys", minAge: 3, maxAge: 8,
    skills: ["Creativity", "Problem Solving", "Fine Motor Skills"],
    material: "Beech Wood", image: "/products/wooden-blocks.jpg",
    gallery: ["/products/wooden-blocks.jpg"],
    whatsIncluded: ["100 × Wooden Blocks", "1 × Storage Bag", "1 × Idea Booklet"],
    howToPlay: ["Empty the blocks onto a flat surface", "Sort blocks by shape and color", "Build towers and structures", "Follow the idea booklet for challenges"],
    learningBenefits: ["Problem Solving", "Creativity", "Fine Motor Skills", "Spatial Awareness"],
    safetyInfo: "Non-toxic water-based paint. Contains small parts — adult supervision recommended.",
    rating: 4.8, reviewCount: 3, featured: true, bestSeller: true, newArrival: false,
  },
  {
    name: "Wooden Math Learning Board",
    slug: "wooden-math-learning-board",
    shortDescription: "Hands-on math board with number tiles and counting beads.",
    description: "Make numbers fun! This wooden math board helps children learn counting, addition, and subtraction with movable number tiles and colorful beads. A perfect Montessori-inspired tool for early math confidence.",
    price: 1200, discountPrice: null, sku: "TOY-MATH-01", stock: 25,
    category: "Learning Kits", minAge: 4, maxAge: 8,
    skills: ["Math & Numbers", "Cognitive Skills", "Problem Solving"],
    material: "Pine Wood", image: "/products/math-board.jpg",
    gallery: ["/products/math-board.jpg"],
    whatsIncluded: ["1 × Math Board", "20 × Number Tiles", "50 × Counting Beads", "1 × Guide"],
    howToPlay: ["Open the box", "Arrange the number tiles", "Use beads to count and solve", "Follow the challenge cards"],
    learningBenefits: ["Basic Math", "Problem Solving", "Number Recognition", "Concentration"],
    safetyInfo: "Recommended Age 4+. Small parts included. Adult supervision recommended.",
    rating: 4.6, reviewCount: 2, featured: true, bestSeller: false, newArrival: true,
  },
  {
    name: "Animal Friends Jigsaw Puzzle",
    slug: "animal-friends-jigsaw-puzzle",
    shortDescription: "Chunky wooden animal puzzle for little hands.",
    description: "A colorful chunky-piece jigsaw featuring friendly animals. The large easy-grip pieces are perfect for toddlers learning to match shapes and recognize animals.",
    price: 650, discountPrice: 550, sku: "TOY-PZL-AN", stock: 60,
    category: "Puzzles", minAge: 2, maxAge: 5,
    skills: ["Cognitive Skills", "Fine Motor Skills", "Problem Solving"],
    material: "Plywood", image: "/products/puzzle.jpg",
    gallery: ["/products/puzzle.jpg"],
    whatsIncluded: ["1 × Puzzle Board", "12 × Chunky Pieces"],
    howToPlay: ["Spread out the pieces", "Match each animal to its spot", "Name the animals as you go"],
    learningBenefits: ["Shape Matching", "Animal Recognition", "Fine Motor Skills"],
    safetyInfo: "Rounded edges. Recommended Age 2+.",
    rating: 4.7, reviewCount: 1, featured: true, bestSeller: true, newArrival: false,
  },
  {
    name: "Junior STEM Robot Building Kit",
    slug: "junior-stem-robot-building-kit",
    shortDescription: "Build your first robot and learn engineering basics.",
    description: "Introduce your child to engineering and robotics with this beginner-friendly STEM kit. Snap together gears, wheels, and parts to build multiple robot models — no tools needed.",
    price: 2400, discountPrice: 1990, sku: "TOY-STEM-RB", stock: 18,
    category: "STEM Toys", minAge: 6, maxAge: 12,
    skills: ["STEM & Science", "Problem Solving", "Cognitive Skills"],
    material: "ABS Plastic", image: "/products/stem-robot.jpg",
    gallery: ["/products/stem-robot.jpg"],
    whatsIncluded: ["120 × Building Parts", "1 × Motor", "1 × Instruction Manual"],
    howToPlay: ["Choose a robot model", "Follow the step-by-step manual", "Attach the motor", "Watch your robot move!"],
    learningBenefits: ["Engineering Basics", "Problem Solving", "Logical Thinking", "STEM Skills"],
    safetyInfo: "Contains small parts and a motor. Recommended Age 6+. Adult supervision advised.",
    rating: 4.9, reviewCount: 4, featured: true, bestSeller: true, newArrival: true,
  },
  {
    name: "Creative Art & Craft Kit",
    slug: "creative-art-and-craft-kit",
    shortDescription: "Everything your little artist needs to create.",
    description: "A complete art and craft kit packed with crayons, colored paper, safety scissors, glue, and craft accessories. Endless creative projects to spark imagination.",
    price: 900, discountPrice: null, sku: "TOY-ART-01", stock: 35,
    category: "Art & Craft", minAge: 4, maxAge: 10,
    skills: ["Creativity", "Fine Motor Skills"],
    material: "Mixed", image: "/products/art-kit.jpg",
    gallery: ["/products/art-kit.jpg"],
    whatsIncluded: ["24 × Crayons", "50 × Colored Papers", "1 × Safety Scissors", "1 × Glue Stick", "Craft Accessories"],
    howToPlay: ["Pick a craft idea", "Gather your materials", "Cut, color, and glue", "Show off your creation!"],
    learningBenefits: ["Creativity", "Color Recognition", "Fine Motor Skills", "Self-Expression"],
    safetyInfo: "Safety scissors with rounded tips. Non-toxic materials. Age 4+.",
    rating: 4.5, reviewCount: 2, featured: false, bestSeller: true, newArrival: true,
  },
  {
    name: "Baby Shape Sorter Cube",
    slug: "baby-shape-sorter-cube",
    shortDescription: "First shapes and colors for curious babies.",
    description: "A bright shape sorter cube that helps babies learn shapes, colors, and problem-solving. Each side has different cut-outs to match the chunky shape blocks.",
    price: 700, discountPrice: 599, sku: "TOY-SORT-01", stock: 50,
    category: "Learning Kits", minAge: 0, maxAge: 2,
    skills: ["Cognitive Skills", "Fine Motor Skills", "Problem Solving"],
    material: "BPA-free Plastic", image: "/products/shape-sorter.jpg",
    gallery: ["/products/shape-sorter.jpg"],
    whatsIncluded: ["1 × Sorter Cube", "8 × Shape Blocks"],
    howToPlay: ["Show baby a shape", "Find the matching hole", "Drop it in!", "Open the lid to start again"],
    learningBenefits: ["Shape Recognition", "Hand-Eye Coordination", "Problem Solving"],
    safetyInfo: "BPA-free. Blocks sized for safety. Age 0+ with supervision.",
    rating: 4.4, reviewCount: 1, featured: false, bestSeller: false, newArrival: true,
  },
  {
    name: "Wooden Alphabet Learning Set",
    slug: "wooden-alphabet-learning-set",
    shortDescription: "Learn letters and build early reading skills.",
    description: "Colorful wooden alphabet blocks that make learning letters and words fun. Great for building vocabulary and early literacy through play.",
    price: 1100, discountPrice: 950, sku: "TOY-ABC-01", stock: 30,
    category: "Learning Kits", minAge: 3, maxAge: 7,
    skills: ["Language & Reading", "Cognitive Skills", "Fine Motor Skills"],
    material: "Beech Wood", image: "/products/alphabet.jpg",
    gallery: ["/products/alphabet.jpg"],
    whatsIncluded: ["26 × Letter Blocks", "1 × Wooden Tray", "1 × Word Card Set"],
    howToPlay: ["Lay out the letters", "Say each letter aloud", "Spell simple words", "Use word cards for practice"],
    learningBenefits: ["Letter Recognition", "Early Reading", "Vocabulary", "Spelling"],
    safetyInfo: "Non-toxic paint. Small parts. Age 3+.",
    rating: 4.7, reviewCount: 2, featured: true, bestSeller: false, newArrival: false,
  },
  {
    name: "Little Chef Pretend Kitchen",
    slug: "little-chef-pretend-kitchen",
    shortDescription: "Role-play kitchen for imaginative cooking fun.",
    description: "Spark imagination with this adorable pretend kitchen set. Includes play food, utensils, and accessories for hours of role-play that builds social and language skills.",
    price: 2800, discountPrice: 2500, sku: "TOY-KIT-01", stock: 12,
    category: "Pretend Play", minAge: 3, maxAge: 8,
    skills: ["Social Skills", "Creativity", "Language & Reading"],
    material: "Plastic & Wood", image: "/products/pretend-kitchen.jpg",
    gallery: ["/products/pretend-kitchen.jpg"],
    whatsIncluded: ["1 × Kitchen Playset", "12 × Play Food", "6 × Utensils"],
    howToPlay: ["Set up your kitchen", "Pretend to cook a meal", "Serve your family or friends", "Role-play a restaurant"],
    learningBenefits: ["Social Skills", "Imagination", "Language Development", "Role-Play"],
    safetyInfo: "Sturdy build. Small accessories. Age 3+.",
    rating: 4.8, reviewCount: 3, featured: false, bestSeller: true, newArrival: false,
  },
];

async function main() {
  const client = await pool.connect();
  try {
    // Admin user
    const adminEmail = "admin@toyotoyo.com";
    const adminHash = await bcrypt.hash("admin123", 10);
    await client.query(
      `INSERT INTO users (name, email, phone, password_hash, role)
       VALUES ($1,$2,$3,$4,'admin')
       ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, role='admin'`,
      ["ToyoToyo Admin", adminEmail, "01700000000", adminHash]
    );

    // Demo customer
    const custHash = await bcrypt.hash("demo123", 10);
    await client.query(
      `INSERT INTO users (name, email, phone, password_hash, role)
       VALUES ($1,$2,$3,$4,'customer')
       ON CONFLICT (email) DO NOTHING`,
      ["Demo Parent", "parent@example.com", "01800000000", custHash]
    );

    for (const p of products) {
      await client.query(
        `INSERT INTO products
          (name, slug, short_description, description, price, discount_price, sku, stock,
           category, min_age, max_age, skills, material, image, gallery, whats_included,
           how_to_play, learning_benefits, safety_info, rating, review_count, featured, best_seller, new_arrival)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24)
         ON CONFLICT (slug) DO UPDATE SET
           price=EXCLUDED.price, discount_price=EXCLUDED.discount_price, stock=EXCLUDED.stock,
           image=EXCLUDED.image, featured=EXCLUDED.featured, best_seller=EXCLUDED.best_seller,
           new_arrival=EXCLUDED.new_arrival`,
        [
          p.name, p.slug, p.shortDescription, p.description, p.price, p.discountPrice, p.sku, p.stock,
          p.category, p.minAge, p.maxAge, JSON.stringify(p.skills), p.material, p.image,
          JSON.stringify(p.gallery), JSON.stringify(p.whatsIncluded), JSON.stringify(p.howToPlay),
          JSON.stringify(p.learningBenefits), p.safetyInfo, p.rating, p.reviewCount,
          p.featured, p.bestSeller, p.newArrival,
        ]
      );
    }

    // Sample reviews for first product
    const { rows } = await client.query(`SELECT id FROM products WHERE slug='rainbow-wooden-building-blocks'`);
    if (rows[0]) {
      const pid = rows[0].id;
      const { rows: existing } = await client.query(`SELECT COUNT(*) c FROM reviews WHERE product_id=$1`, [pid]);
      if (Number(existing[0].c) === 0) {
        await client.query(
          `INSERT INTO reviews (product_id, author_name, rating, comment, approved) VALUES
           ($1,'Nusrat A.',5,'My daughter loves building with these! Great quality.',true),
           ($1,'Rakib H.',5,'Sturdy and colorful. Highly recommend.',true),
           ($1,'Tania R.',4,'Good set, keeps my son busy for hours.',true)`,
          [pid]
        );
      }
    }

    console.log("✅ Seed complete. Admin: admin@toyotoyo.com / admin123");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
