import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.blog.findMany({
    select: { slug: true, title: true }
  });
  console.log(`Total posts in DB: ${posts.length}`);
  posts.forEach(p => console.log(`- ${p.slug}: ${p.title}`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
