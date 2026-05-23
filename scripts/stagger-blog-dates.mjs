/**
 * Stagger blog post publication dates across the past ~5 months.
 *
 * Run with: node scripts/stagger-blog-dates.mjs
 *
 * This spreads all published posts across a realistic editorial calendar
 * (2-3 posts/week, working backwards from today) so they don't all show
 * the same timestamp — which signals bulk AI generation to search engines.
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "../.env");
const envContent = readFileSync(envPath, "utf8");
envContent.split("\n").forEach((line) => {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim().replace(/^"|"$/g, "");
});

const { PrismaClient } = await import("@prisma/client");
const prisma = new PrismaClient();

async function staggerDates() {
  const posts = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "asc" },
    select: { id: true, title: true, createdAt: true },
  });

  if (posts.length === 0) {
    console.log("No published posts found.");
    await prisma.$disconnect();
    return;
  }

  console.log(`Found ${posts.length} published posts. Staggering dates...\n`);

  // Spread posts across the past ~20 weeks (Mon/Wed/Fri schedule, ~3/week)
  // Working backwards from 7 days ago so nothing is "future-dated"
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 7);

  const postsPerWeek = 3;
  const daysBetween = 7 / postsPerWeek; // ~2.33 days

  for (let i = 0; i < posts.length; i++) {
    const daysBack = Math.round((posts.length - 1 - i) * daysBetween);
    const postDate = new Date(endDate);
    postDate.setDate(postDate.getDate() - daysBack);

    // Vary the hour (9am–5pm PKT range, stored as UTC = subtract 5h)
    const hour = 4 + (i % 8); // UTC 4–11 = PKT 9am–4pm
    postDate.setHours(hour, (i * 7) % 60, 0, 0);

    await prisma.blog.update({
      where: { id: posts[i].id },
      data: {
        createdAt: postDate,
        updatedAt: postDate,
      },
    });

    console.log(`✓ ${posts[i].title.slice(0, 55)}... → ${postDate.toISOString().split("T")[0]}`);
  }

  console.log(`\nDone. ${posts.length} posts now have staggered publication dates.`);
  await prisma.$disconnect();
}

staggerDates().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
